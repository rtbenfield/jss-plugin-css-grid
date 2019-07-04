import { Style } from "jss";

export interface GridGap {
  column?: string;
  row?: string;
}

export function parseGridGap(style: Style): GridGap {
  const gap: GridGap = {};
  Object.keys(style)
    .filter(prop => /^(grid-)?((row|column)-)?gap$/.test(prop))
    .filter(prop => typeof style[prop] === "string")
    .forEach(prop => {
      const value: string = style[prop];
      if (/^(grid-)?gap$/.test(prop)) {
        // TODO: Improve parser
        const values = value.split(" ");
        if (values.length > 2) {
          console.warn(`Invalid ${prop} value "${value}"`);
        } else if (values.length === 2) {
          gap.row = values[0];
          gap.column = values[1];
        } else {
          gap.row = gap.column = values[0];
        }
      } else if (/^(grid-)?row-gap$/.test(prop)) {
        gap.row = value;
      } else if (/^(grid-)?column-gap$/.test(prop)) {
        gap.column = value;
      }
    });

  return gap;
}
