import { Rule, Style, StyleSheet } from "jss";
import { parseGridAreas } from "./utils/parseGridAreas";
import { parseGridGap } from "./utils/parseGridGap";

function padWithGap(
  value: string | undefined,
  gap: string | undefined,
): string | undefined {
  if (!value || !gap) {
    return value;
  }

  return value.split(" ").join(` ${gap} `);
}

export default function gridTemplateAreas(
  style: Style,
  rule: Rule,
  sheet: StyleSheet | undefined,
): Style {
  if (!style["grid-template-areas"] || !sheet) return style;
  if (!style["grid-template-rows"]) {
    console.warn(
      "grid-template-rows is required for grid-template-area autofilling",
    );
    return style;
  }
  if (!style["grid-template-columns"]) {
    console.warn(
      "grid-template-columns is required for grid-template-area autofilling",
    );
    return style;
  }

  const gridAreas = parseGridAreas(style["grid-template-areas"]);
  if (!gridAreas) {
    console.warn(
      `Invalid grid-template-areas value ${style["grid-template-areas"]}`,
    );
    return style;
  }

  // Loop through other rules in this StyleSheet and swap grid-area with the column/row properties
  sheet.rules.index
    .filter(r => r.type === "style")
    .filter(r => "grid-area" in r.style)
    .map(r => r.style)
    .forEach(s => {
      const areaName = s["grid-area"];
      const areaValues = gridAreas[areaName];

      if (!areaValues) {
        console.log(`Encountered undefined grid-area ${areaName}`);
        return;
      }

      s["-ms-grid-column"] = areaValues.column;
      if (areaValues.columnSpan > 1) {
        s["-ms-grid-column-span"] = areaValues.columnSpan;
      }
      s["-ms-grid-row"] = areaValues.row;
      if (areaValues.rowSpan > 1) {
        s["-ms-grid-row-span"] = areaValues.rowSpan;
      }
      delete s["grid-area"];
    });

  style["-ms-grid-columns"] = style["grid-template-columns"];
  style["-ms-grid-rows"] = style["grid-template-rows"];
  delete style["grid-template-columns"];
  delete style["grid-template-rows"];
  delete style["grid-template-areas"];

  return style;
}
