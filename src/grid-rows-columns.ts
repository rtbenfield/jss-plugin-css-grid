import { Rule, Style, StyleSheet } from "jss";

/**
 * Translate grid-template-rows / grid-template-columns to separate -ms- prefixed properties
 */
export default function gridRowsColumns(
  style: Style,
  rule: Rule,
  sheet: StyleSheet | undefined,
): Style {
  if (style["grid-template-columns"]) {
    style["-ms-grid-columns"] = style["grid-template-columns"];
    delete style["grid-template-columns"];
  }
  if (style["grid-template-rows"]) {
    style["-ms-grid-rows"] = style["grid-template-rows"];
    delete style["grid-template-rows"];
  }
  return style;
}
