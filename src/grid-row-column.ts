import { Rule, Style, StyleSheet } from "jss";
import { parseGridPosition } from "./utils/parseGridPosition";

function replaceWithPrefix(
  style: Style,
  rule: Rule,
  sheet: StyleSheet | undefined,
  prop: "grid-column" | "grid-row",
) {
  if (!style[prop]) return style;

  const values = parseGridPosition(style[prop].toString());
  if (values) {
    if (values.value) {
      style[`-ms-${prop}`] = values.value;
    }
    if (values.span) {
      style[`-ms-${prop}-span`] = values.span;
    }
    delete style[prop];
  }

  return style;
}

/**
 * Translate grid-row / grid-column to separate -ms- prefixed properties
 */
export default function gridRowColumn(
  style: Style,
  rule: Rule,
  sheet: StyleSheet | undefined,
): Style {
  style = replaceWithPrefix(style, rule, sheet, "grid-column");
  style = replaceWithPrefix(style, rule, sheet, "grid-row");
  return style;
}
