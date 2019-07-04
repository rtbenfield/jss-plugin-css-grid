import { Rule, Style, StyleSheet } from "jss";
import { parseGridGap } from "./utils/parseGridGap";

function padTemplateWithGap(
  value: string | undefined,
  gap: string | undefined,
): string | undefined {
  if (!value || !gap) {
    return value;
  }

  // Need to split values, but minmax(1px, 1px) can have space separator
  const regex = /([^\s]+?\(.+?\)|[^\s]+)/g;
  const matches = [];
  let match = regex.exec(value);
  while (match) {
    matches.push(match[1]);
    match = regex.exec(value);
  }
  return matches.join(` ${gap} `);
}

function updateStyleWithGap(style: Style, prop: string) {
  if (prop in style) {
    const original = Number(style[prop]);
    if (original > 1) {
      style[prop] = original * 2 - 1;
    }
  }
}

export default function gridTemplateAreas(
  style: Style,
  rule: Rule,
  sheet: StyleSheet | undefined,
): Style {
  const gapValue = style["grid-gap"] || style["gap"];
  if (!gapValue || !sheet) return style;

  const gridGap = parseGridGap(style);

  // Loop through other rules in this StyleSheet and pad grid row/column for gap rows
  sheet.rules.index
    .filter(r => r.type === "style")
    .map(r => r.style)
    .forEach(s => {
      updateStyleWithGap(s, "-ms-grid-column");
      updateStyleWithGap(s, "grid-column");
      updateStyleWithGap(s, "-ms-grid-column-span");
      updateStyleWithGap(s, "grid-row");
      updateStyleWithGap(s, "-ms-grid-row");
      updateStyleWithGap(s, "-ms-grid-row-span");
    });

  style["-ms-grid-columns"] = padTemplateWithGap(
    style["-ms-grid-columns"],
    gridGap.column,
  );
  style["-ms-grid-rows"] = padTemplateWithGap(
    style["-ms-grid-rows"],
    gridGap.row,
  );
  delete style["gap"];
  delete style["grid-gap"];

  return style;
}
