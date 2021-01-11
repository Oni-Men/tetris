import Tetrimino from "./tetrimino";
import { randomTetrimino } from "../util/tetrimino_util";

class TetriminoQueue {
  private capacity: number;
  private queue: Tetrimino[];

  constructor(capacity = 3) {
    this.capacity = capacity;
    this.queue = [];
  }

  get length(): number {
    return this.queue.length;
  }

  public get(i: number): Tetrimino {
    return this.queue[i];
  }

  public next(): Tetrimino {
    const shift = this.queue.shift();
    if (shift === undefined) {
      this.fill();
      return randomTetrimino();
    } else {
      this.fill();
    }
    const first = shift;
    return first;
  }

  public fill(): void {
    for (let i = this.length; i < this.capacity; i++) {
      let random: Tetrimino;
      while (true) {
        random = randomTetrimino();
        if (this.queue.every((t) => t.type !== random.type)) {
          break;
        }
      }
      this.queue.push(random);
    }
  }
}

export default TetriminoQueue;
