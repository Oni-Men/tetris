import BlockMatrix from "../model/block/block_matrix";

export default function renderBlockMatrix(
  g: CanvasRenderingContext2D,
  matrix: BlockMatrix
): void {
  for (let y = 0; y < matrix.height; y++) {
    for (let x = 0; x < matrix.width; x++) {
      const block = matrix.blockAt(x, y);
      if (block === null) continue;
      if (block.isEmpty()) continue;
      g.fillStyle = block.color;
      g.fillRect(x * 25 + 2, y * 25 + 2, 21, 21);
    }
  }
}
