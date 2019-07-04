import * as cssVendor from "css-vendor";
import { Plugin } from "jss";
import gridGap from "./grid-gap";
import gridRowColumn from "./grid-row-column";
import gridRowsColumns from "./grid-rows-columns";
import gridTemplateAreas from "./grid-template-areas";

export default function cssGrid(): Plugin {
  return {
    onProcessStyle: (style, rule, sheet) => {
      if (cssVendor.prefix.css !== "-ms-") return style;

      if (style["display"] === "grid") {
        style["display"] = "-ms-grid";
      }

      style = gridRowColumn(style, rule, sheet);
      style = gridTemplateAreas(style, rule, sheet);
      style = gridRowsColumns(style, rule, sheet);
      style = gridGap(style, rule, sheet);

      return style;
    },
  };
}
