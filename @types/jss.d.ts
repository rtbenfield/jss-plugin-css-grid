import { Rule, RuleList, Style, StyleSheet } from "jss";

declare module "jss" {
  type StyleRule = Rule & { style: Style };

  interface RuleList {
    index: StyleRule[];
    map: { [key: string]: Rule };
  }

  interface StyleSheet {
    rules: RuleList;
  }
}
