import Tetrimino from "../model/tetrimino";
import renderBlockMatrix from "./block_matrix";

export default function renderTetrimino(
  g: CanvasRenderingContext2D,
  tetrimino: Tetrimino
): void {
  if (!tetrimino) {
    return;
  }
  const shape = tetrimino.shape;

  g.save();
  g.translate(tetrimino.globalX * 25, tetrimino.globalY * 25);
  renderBlockMatrix(g, shape);
  g.restore();
}
