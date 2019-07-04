import { create, Jss, JssOptions } from "jss";
import cssGrid from "../src";

let jss: Jss;
beforeEach(() => {
  const settings: Partial<JssOptions> = {
    createGenerateId: () => rule => rule.key,
  };
  jss = create(settings).use(cssGrid());
});

it("should generate correct CSS", () => {
  const sheet = jss.createStyleSheet({
    container: {
      display: "grid",
      "grid-template-columns": "1fr 2fr",
      "grid-template-rows": "3fr 4fr",
    },
  });

  expect(sheet.toString()).toBe(
    `.container {
  display: -ms-grid;
  -ms-grid-columns: 1fr 2fr;
  -ms-grid-rows: 3fr 4fr;
}`,
  );
});
