import Block from "../block";
import BlockColor from "../block_color";

test("Test isEmpty", (): void => {
  const emptyBlock = new Block(BlockColor.Empty);
  const blueBlock = new Block(BlockColor.Blue);

  expect(emptyBlock.isEmpty()).toBe(true);
  expect(blueBlock.isEmpty()).toBe(false);
});
