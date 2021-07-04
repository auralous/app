import { ArrayElement } from "./types";

const sizeUnitValues = [
  0, 1, 2, 3, 4, 6, 8, 10, 12, 14, 16, 20, 24, 32, 36, 40, 44, 48,
] as const; // x4

function buildSizes() {
  const values = {} as Record<ArrayElement<typeof sizeUnitValues>, number>;
  for (const sizeUnitValue of sizeUnitValues)
    values[sizeUnitValue] = sizeUnitValue * 4;
  return values;
}

export const Size = buildSizes();
