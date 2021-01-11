import BlockColor from "../../model/block/block_color";
import {
  defaultTetriminoList,
  generateTetrimino,
  rotateShape,
} from "../tetrimino_util";

test("Test rotate shape", () => {
  const expected = generateTetrimino(
    "S",
    [
      [1, 0],
      [1, 1],
      [0, 1],
    ],
    BlockColor.Green
  ).shape;
  const rotated = rotateShape(defaultTetriminoList[2].shape);

  expect(rotated.width).toEqual(expected.width);
  expect(rotated.height).toEqual(expected.height);

  rotated.scanAll((x, y, b) => {
    const e = expected.blockAt(x, y);
    if (e === null) {
      return;
    }
    expect(b).not.toBeNull();
    expect(b?.color).toBe(e.color);
  });
});
