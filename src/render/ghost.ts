import BlockColor from "../model/block/block_color";
import Field from "../model/field";
import Tetrimino from "../model/tetrimino";
import renderTetrimino from "./tetrimino";

export default function renderGhost(
  g: CanvasRenderingContext2D,
  field: Field,
  tetrimino: Tetrimino
): void {
  const ghost = tetrimino.copy();

  ghost.shape.scanAll((_x, _y, block) => {
    if (block !== null && !block.isEmpty()) {
      block.color = BlockColor.Ghost;
    }
  });
  ghost.landQuickly(field);
  renderTetrimino(g, ghost);
}
