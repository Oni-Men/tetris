import BlockColor from "./block_color";

class Block {
  public color: BlockColor;

  constructor(color = BlockColor.Empty) {
    this.color = color;
  }

  public isEmpty(): boolean {
    return this.color === BlockColor.Empty;
  }
}

export default Block;
