import Block from "./block";

class BlockMatrix {
  private _width: number;
  private _height: number;

  private data: Block[][];

  constructor(width: number, height: number) {
    this._width = width;
    this._height = height;

    this.data = Array(this.height);
    for (let y = 0; y < this.height; y++) {
      this.data[y] = Array(this.width)
        .fill(null)
        .map(() => new Block());
    }
  }

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }

  public blockAt(x: number, y: number): Block | null {
    if (x < 0 || y < 0) return null;
    if (x >= this.width || y >= this.height) return null;
    return this.data[y][x];
  }

  public set(x: number, y: number, block: Block | null): boolean {
    if (x < 0 || y < 0) return false;
    if (x >= this.width || y >= this.height) return false;
    if (block !== null) {
      this.data[y][x] = block;
    }
    return true;
  }

  public scanAll(
    callback: (x: number, y: number, block: Block | null) => void
  ): void {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        callback(x, y, this.blockAt(x, y));
      }
    }
  }

  public scanLines(callback: (y: number, line: Block[]) => void): void {
    for (let y = 0; y < this.height; y++) {
      callback(y, this.data[y]);
    }
  }

  public union(other: BlockMatrix, tx: number, ty: number): boolean {
    let fail = 0;
    other.scanAll((x, y, block) => {
      if (block !== null && !block.isEmpty()) {
        if (!this.set(tx + x, ty + y, other.blockAt(x, y))) {
          fail++;
        }
      }
    });
    return fail === 0;
  }

  public clearLine(i: number): void {
    if (i < 0 || i >= this.data.length) return;

    const next = Array(this.width)
      .fill(null)
      .map(() => new Block());
    this.data.splice(i, 1);
    this.data.unshift(next);
  }

  public clone(): BlockMatrix {
    const cloned = new BlockMatrix(this.width, this.height);

    this.scanAll((x, y, block) => {
      const clonedBlock = cloned.blockAt(x, y);
      if (block !== null && clonedBlock != null) {
        clonedBlock.color = block.color;
      }
    });

    return cloned;
  }
}

export default BlockMatrix;
