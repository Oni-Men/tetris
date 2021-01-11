import Tetris from "./model/tetris";
import FontManager from "./util/font_manager";

export let canvas: HTMLCanvasElement;
let tetris: Tetris;
export let fontManager: FontManager;

initHandler();
start();

function maximize(): void {
  if (canvas !== null && canvas instanceof HTMLCanvasElement) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
}

export function initTetris(): void {
  tetris = new Tetris();
}

function start(): void {
  const element = document.querySelector("#view");
  if (element instanceof HTMLCanvasElement) {
    canvas = element;
    maximize();
    const g = canvas.getContext("2d");
    if (g !== null) {
      fontManager = new FontManager(g);
      fontManager.family("Comfortaa");
      initTetris();
      loop(g);
    }
  }
}

function loop(g: CanvasRenderingContext2D): void {
  if (tetris !== null) {
    tetris.update();
    g.fillStyle = "white";
    g.fillRect(0, 0, canvas.width, canvas.height);
    g.translate(canvas?.clientWidth / 2, canvas?.clientHeight / 2);
    tetris.render(g);
    g.resetTransform();
    window.requestAnimationFrame(() => {
      loop(g);
    });
  }
}

function initHandler(): void {
  window.addEventListener("keydown", (event) => {
    if (tetris) {
      tetris.onKeyDown(event);
    }
  });
  window.addEventListener("resize", () => {
    maximize();
  });
}
