export type FontData = {
  style: string;
  weight: string;
  size: string;
  family: string;
  textAlign: CanvasTextAlign;
  textBaseline: CanvasTextBaseline;
};

export default class FontManager {
  private g: CanvasRenderingContext2D | null;
  private saveData: FontData[] = [];
  private fontData: FontData = {
    style: "normal",
    weight: "normal",
    size: "12px",
    family: "sans",
    textAlign: "center",
    textBaseline: "middle",
  };

  constructor(g: CanvasRenderingContext2D | null) {
    this.g = g;
  }

  get data(): FontData {
    return this.fontData;
  }

  public size(s: string): FontManager {
    this.fontData.size = s;
    return this;
  }

  public family(s: string): FontManager {
    this.fontData.family = s;
    return this;
  }

  public weight(s: string): FontManager {
    this.fontData.weight = s;
    return this;
  }

  public style(s: string): FontManager {
    this.fontData.style = s;
    return this;
  }

  public left(): FontManager {
    return this.textAlign("start");
  }

  public center(): FontManager {
    return this.textAlign("center");
  }

  public right(): FontManager {
    return this.textAlign("end");
  }

  private textAlign(s: CanvasTextAlign): FontManager {
    this.fontData.textAlign = s;
    return this;
  }

  public top(): FontManager {
    return this.textBaseline("top");
  }

  public middle(): FontManager {
    return this.textBaseline("middle");
  }

  public bottom(): FontManager {
    return this.textBaseline("bottom");
  }

  public alphabetic(): FontManager {
    return this.textBaseline("alphabetic");
  }

  private textBaseline(s: CanvasTextBaseline): FontManager {
    this.fontData.textBaseline = s;
    return this;
  }

  public set(): void {
    if (this.g !== null) {
      this.g.font = `${this.fontData.style} ${this.fontData.weight} ${this.fontData.size} ${this.fontData.family}`;
      this.g.textAlign = this.fontData.textAlign;
      this.g.textBaseline = this.fontData.textBaseline;
    }
  }

  public save(): void {
    this.saveData.push({ ...this.fontData });
  }

  public restore(): void {
    const pop = this.saveData.pop();
    if (pop !== undefined) {
      this.fontData = pop;
    }
  }
}
