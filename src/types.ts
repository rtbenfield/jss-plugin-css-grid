import { Style } from "jss";

export interface GridJssStyle extends Style {
  display?: string;
  "grid-area"?: string;
  "grid-column-span"?: string;
  "grid-column-start"?: string;
  "grid-row-span"?: string;
  "grid-row-start"?: string;
  "grid-template-areas"?: string;
}
