import { checkOverlap, rotateShape } from "../util/tetrimino_util";
import BlockMatrix from "./block/block_matrix";
import Field from "./field";

class Tetrimino {
  public shape: BlockMatrix;
  public x: number;
  public y: number;
  public type: string;

  constructor(type: string, shape: BlockMatrix, x = 0, y = 0) {
    this.type = type;
    this.shape = shape;
    this.x = x;
    this.y = y;
  }

  get globalX(): number {
    return this.x - Math.floor(this.shape.width / 2);
  }

  get globalY(): number {
    return this.y - Math.floor(this.shape.height / 2);
  }

  public tick(field: Field): boolean {
    return this.move(field, 0, 1);
  }

  public move(field: Field, mx: number, my: number): boolean {
    if (!field) return false;
    if (this.globalX + mx < 0) return false;
    if (this.globalX + mx + this.shape.width > field.width) return false;
    if (this.onGround(field)) return false;

    this.x += mx;
    this.y += my;
    return true;
  }

  public landQuickly(field: Field): void {
    while (this.move(field, 0, 1));
  }

  public rotate(field: Field): boolean {
    const rotated = rotateShape(this.shape);
    if (this.globalX < 0) return false;
    if (this.globalX + rotated.width > field.width) return false;
    if (this.globalY + rotated.height > field.height) return false;
    if (field.overlap(rotated, this.globalX, this.globalY)) return false;
    this.shape = rotated;
    return true;
  }

  public onGround(field: Field): boolean {
    if (this.globalY + 1 + this.shape.height > field.height) {
      return true;
    }
    if (
      checkOverlap(field.matrix, this.shape, this.globalX, this.globalY + 1)
    ) {
      return true;
    }
    return false;
  }

  public copy(): Tetrimino {
    return new Tetrimino(this.type, this.shape.clone(), this.x, this.y);
  }
}

export default Tetrimino;
