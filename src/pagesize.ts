export interface PageSize {
  width?: string;
  height?: string;
}

export const pageFormatSizeData: { [key: string]: [number, number, string] } = {
  Letter: [8.5, 11, "in"],
  Legal: [8.5, 14, "in"],
  Tabloid: [11, 17, "in"],
  Ledger: [17, 11, "in"],
  A0: [841, 1189, "mm"],
  A1: [594, 841, "mm"],
  A2: [420, 594, "mm"],
  A3: [297, 420, "mm"],
  A4: [210, 297, "mm"],
  A5: [148, 210, "mm"],
  A6: [105, 148, "mm"],
  A7: [74, 105, "mm"],
  A8: [52, 74, "mm"],
  A9: [37, 52, "mm"],
  A10: [26, 37, "mm"],
  B0: [1000, 1414, "mm"],
  B1: [707, 1000, "mm"],
  B2: [500, 707, "mm"],
  B3: [353, 500, "mm"],
  B4: [250, 353, "mm"],
  B5: [176, 250, "mm"],
  B6: [125, 176, "mm"],
  B7: [88, 125, "mm"],
  B8: [62, 88, "mm"],
  B9: [44, 62, "mm"],
  B10: [31, 44, "mm"],
  C0: [917, 1297, "mm"],
  C1: [648, 917, "mm"],
  C2: [458, 648, "mm"],
  C3: [324, 458, "mm"],
  C4: [229, 324, "mm"],
  C5: [162, 229, "mm"],
  C6: [114, 162, "mm"],
  C7: [81, 114, "mm"],
  C8: [57, 81, "mm"],
  DL: [110, 220, "mm"],
};

export function getSize<
  Format extends keyof typeof pageFormatSizeData,
  Scale extends number
>(size: `${Format}/${Scale}`): PageSize;
export function getSize<Format extends keyof typeof pageFormatSizeData>(
  size: Format
): PageSize;
export function getSize(size: string): PageSize {
  const [format, scaleStr] = size.split("/");
  const scale = +(scaleStr || 1);
  const [width, height, unit] =
    pageFormatSizeData[format as keyof typeof pageFormatSizeData];
  return {
    width: `${width / scale}${unit}`,
    height: `${height / scale}${unit}`,
  };
}
