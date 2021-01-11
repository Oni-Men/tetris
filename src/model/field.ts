import { checkOverlap } from "../util/tetrimino_util";
import Block from "./block/block";
import BlockMatrix from "./block/block_matrix";
import Tetrimino from "./tetrimino";
import Tetris from "./tetris";

class Field {
  width: number;
  height: number;

  matrix: BlockMatrix;
  tetris: Tetris;

  constructor(tetris: Tetris, width = 10, height = 20) {
    this.width = width;
    this.height = height;
    this.matrix = new BlockMatrix(this.width, this.height);
    this.tetris = tetris;
  }

  public blockAt(x: number, y: number): Block | null {
    return this.matrix.blockAt(x, y);
  }

  public clearCompletedLines(): void {
    this.matrix.scanLines((y, line) => {
      if (line.every((b) => !b.isEmpty())) {
        this.matrix.clearLine(y);
        this.tetris.gameInfo.lines++;
      }
    });
  }

  public stack(tetrimino: Tetrimino): boolean {
    return this.matrix.union(
      tetrimino.shape,
      tetrimino.globalX,
      tetrimino.globalY
    );
  }

  public overlap(matrix: BlockMatrix, x: number, y: number): boolean {
    return checkOverlap(this.matrix, matrix, x, y);
  }
}

export default Field;
