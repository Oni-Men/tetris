import TetriminoQueue from "./tetrimino_queue";
import Field from "./field";
import GameInfo from "./game_info";
import Tetrimino from "./tetrimino";
import renderTetrimino from "../render/tetrimino";
import renderField from "../render/field";
import renderGhost from "../render/ghost";
import { fontManager, initTetris } from "../main";

class Tetris {
  //次のテトリミノを待機させておく為のキュー（待機列）
  public queue: TetriminoQueue;
  public field: Field;

  //まだ着地していない、操作中のテトリミノ
  public current: Tetrimino;

  public gameInfo: GameInfo;

  public lastTick = Date.now();

  //一時停止しているかどうか
  public paused = false;

  constructor() {
    this.queue = new TetriminoQueue();
    this.field = new Field(this);
    this.gameInfo = new GameInfo();
    this.current = this.nextTetrimino();
  }

  public update(): void {
    const now = Date.now();

    if (this.gameInfo.over || this.paused) return;

    if (now - this.lastTick >= 1000) {
      this.lastTick = now;
      this.current.tick(this.field);
    }

    if (this.current.onGround(this.field)) {
      if (!this.field.stack(this.current)) {
        this.gameInfo.over = true;
      } else {
        this.nextTetrimino();
      }
    }
    this.field.clearCompletedLines();
  }

  public render(g: CanvasRenderingContext2D): void {
    g.translate(-150, -300);

    fontManager.weight("bold").size("24px").center().alphabetic().set();
    g.fillStyle = "#666";
    g.fillText("Tetris", 150, 0);

    g.save();
    g.translate(275, 25);
    g.scale(0.5, 0.5);

    for (let i = this.queue.length - 1; i >= 0; i--) {
      const tetrimino = this.queue.get(i);
      g.translate(-(tetrimino.shape.width + 1) * 25, 0);
      g.save();
      g.translate(-tetrimino.globalX * 25, -tetrimino.globalY * 25);
      renderTetrimino(g, tetrimino);
      g.lineWidth = 10.0;
      g.strokeStyle = "#fff";
      g.fillStyle = "#666";
      fontManager.middle().set();
      g.strokeText(`${i + 1}`, 0, 0);
      g.fillText(`${i + 1}`, 0, 0);
      g.restore();
    }

    g.restore();
    g.save();
    g.translate(25, 54);

    g.strokeStyle = "#666";
    g.lineWidth = 1.5;
    g.strokeRect(0, 0, 250, 500);

    if (this.current && !this.paused && !this.gameInfo.over) {
      renderField(g, this.field);
      g.save();
      g.beginPath();
      g.rect(0, 0, 250, 500);
      g.clip();
      renderGhost(g, this.field, this.current);
      renderTetrimino(g, this.current);
      g.restore();
    }

    g.restore();
    g.globalAlpha = 1.0;

    g.fillStyle = "#666";
    fontManager.weight("bold").size("16px").center().middle().set();
    g.fillText(`${this.gameInfo.lines} Lines`, 150, 600 - 24);

    if (this.gameInfo.over || this.paused) {
      g.fillStyle = "#fff8";
      g.fillRect(25, 54, 250, 500);

      g.fillStyle = "#666";

      fontManager.center().middle();

      if (this.gameInfo.over) {
        fontManager.size("24px").set();
        g.fillText("GAME OVER", 150, 300 - 24);
        fontManager.size("16px").set();
        g.fillText(`${this.gameInfo.lines} Lines`, 150, 300);
        g.fillText("Press ENTER to retry", 150, 300 + 24);
      } else if (this.paused) {
        fontManager.size("24px").set();
        g.fillText("Pause", 150, 300 - 12);
        fontManager.size("16px").set();
        g.fillText("Press Esc again to continue", 150, 300 + 12);
      }
    }
  }

  public nextTetrimino(): Tetrimino {
    const next = this.queue.next();
    this.current = next;
    this.current.x = Math.floor(
      (this.field.width - this.current.shape.width) / 2
    );
    this.current.y = -this.current.shape.height;
    return next;
  }

  //現在のテトリミノを即座に着地させる
  public landQuickly(): void {
    this.current?.landQuickly(this.field);
  }

  public move(mx: number, my: number): void {
    this.current?.move(this.field, mx, my);
  }

  public rotate(): void {
    this.current?.rotate(this.field);
  }

  public pause(): void {
    this.paused = !this.paused;
  }

  public onKeyDown(event: KeyboardEvent): void {
    switch (event.code) {
      case "ArrowUp":
        this.rotate();
        break;
      case "ArrowDown":
        this.move(0, 1);
        break;
      case "ArrowLeft":
        this.move(-1, 0);
        break;
      case "ArrowRight":
        this.move(1, 0);
        break;
      case "Enter":
        if (this.gameInfo.over) {
          initTetris();
        }
        break;
      case "Space":
        if (!event.repeat) {
          this.landQuickly();
        }
        break;
      case "Escape":
        this.pause();
        break;
    }
  }
}

export default Tetris;
