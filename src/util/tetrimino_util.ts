import BlockColor from "../model/block/block_color";
import BlockMatrix from "../model/block/block_matrix";
import Tetrimino from "../model/tetrimino";

let randomTetriminoCounter = 0;

export function rotateShape(shape: BlockMatrix): BlockMatrix {
  const rotated = new BlockMatrix(shape.height, shape.width);

  for (let y = 0; y < shape.height; y++) {
    for (let x = 0; x < shape.width; x++) {
      const tx = shape.height - y - 1;
      const ty = x;
      rotated.set(tx, ty, shape.blockAt(x, y));
    }
  }
  return rotated;
}

export function randomTetrimino(): Tetrimino {
  const index =
    randomTetriminoCounter +
    Math.floor(Math.random() * defaultTetriminoList.length);
  randomTetriminoCounter++;
  return defaultTetriminoList[
    (index * 31) % defaultTetriminoList.length
  ].copy();
}

export function checkOverlap(
  a: BlockMatrix,
  b: BlockMatrix,
  tx: number,
  ty: number
): boolean {
  let overlap = 0;
  a.scanAll((x, y, c) => {
    const t = b.blockAt(x - tx, y - ty);
    if (c === null || t === null) return;
    if (!c.isEmpty() && !t.isEmpty()) {
      overlap++;
    }
  });
  return overlap !== 0;
}

export function generateTetrimino(
  id: string,
  data: number[][],
  color: BlockColor
): Tetrimino {
  const width = data.reduce((previous, d) => Math.max(previous, d.length), 0);
  const height = data.length;
  const shape = new BlockMatrix(width, height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const block = shape.blockAt(x, y);
      if (block !== null) {
        block.color = data[y][x] === 0 ? BlockColor.Empty : color;
      }
    }
  }
  return new Tetrimino(id, shape);
}

export function getGlobalPosition(
  tetrimino: Tetrimino,
  x: number,
  y: number
): [number, number] {
  if (!tetrimino) return [0, 0];

  const globalX = tetrimino.x + x - Math.floor(tetrimino.shape.width / 2);
  const globalY = tetrimino.y + y - Math.floor(tetrimino.shape.height / 2);

  return [globalX, globalY];
}

export const defaultTetriminoList = [
  generateTetrimino("I", [[1, 1, 1, 1]], BlockColor.LightBlue),
  generateTetrimino(
    "O",
    [
      [1, 1],
      [1, 1],
    ],
    BlockColor.Yellow
  ),
  generateTetrimino(
    "S",
    [
      [0, 1, 1],
      [1, 1, 0],
    ],
    BlockColor.Green
  ),
  generateTetrimino(
    "Z",
    [
      [1, 1, 0],
      [0, 1, 1],
    ],
    BlockColor.Red
  ),
  generateTetrimino(
    "J",
    [
      [1, 0, 0],
      [1, 1, 1],
    ],
    BlockColor.Blue
  ),
  generateTetrimino(
    "L",
    [
      [0, 0, 1],
      [1, 1, 1],
    ],
    BlockColor.Orange
  ),
  generateTetrimino(
    "T",
    [
      [0, 1, 0],
      [1, 1, 1],
    ],
    BlockColor.Purple
  ),
];
