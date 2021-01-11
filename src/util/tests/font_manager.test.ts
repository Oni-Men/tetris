import FontManager from "../font_manager";

test("Test save and restore of FontManager", () => {
  const fontManager = new FontManager(null);
  fontManager.family("Comfortaa");
  expect(fontManager.data.family).toBe("Comfortaa");
  fontManager.save();
  fontManager.family("Noto Sans");
  expect(fontManager.data.family).toBe("Noto Sans");
  fontManager.restore();
  expect(fontManager.data.family).toBe("Comfortaa");
});
