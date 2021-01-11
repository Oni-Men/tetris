import Field from "../model/field";

export default function renderField(
  g: CanvasRenderingContext2D,
  field: Field
): void {
  if (!field) return;

  g.save();
  for (let y = 0; y < field.height; y++) {
    for (let x = 0; x < field.width; x++) {
      const block = field.blockAt(x, y);
      if (block !== null) {
        if (block.isEmpty()) {
          g.fillStyle = (x + y) % 2 == 0 ? "white" : "whitesmoke";
        } else {
          g.fillStyle = block.color;
        }
      }
      g.fillRect(x * 25 + 2, y * 25 + 2, 21, 21);
    }
  }
  g.restore();
}
