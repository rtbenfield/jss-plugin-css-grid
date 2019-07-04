import { create, Jss, JssOptions } from "jss";
import cssGrid from "../src";

let jss: Jss;
beforeEach(() => {
  const settings: Partial<JssOptions> = {
    createGenerateId: () => rule => `${rule.key}-id`,
  };
  jss = create(settings).use(cssGrid());
});

describe.each<string>(["grid-column", "grid-row"])("%s tests", prop => {
  it("should generate correct CSS without span", () => {
    const sheet = jss.createStyleSheet({
      container: {
        display: "grid",
        [prop]: "1",
      },
    });

    expect(sheet.toString()).toBe(
      `.container-id {
  display: -ms-grid;
  -ms-${prop}: 1;
}`,
    );
  });

  it("should generate correct CSS with span", () => {
    const sheet = jss.createStyleSheet({
      container: {
        display: "grid",
        [prop]: "span 2",
      },
    });

    expect(sheet.toString()).toBe(
      `.container-id {
  display: -ms-grid;
  -ms-${prop}-span: 2;
}`,
    );
  });

  it("should generate correct CSS with start and span", () => {
    const sheet = jss.createStyleSheet({
      container: {
        display: "grid",
        [prop]: "2 / 3",
      },
    });

    expect(sheet.toString()).toBe(
      `.container-id {
  display: -ms-grid;
  -ms-${prop}: 2;
  -ms-${prop}-span: 1;
}`,
    );
  });

  it("should generate correct CSS with span and end", () => {
    const sheet = jss.createStyleSheet({
      container: {
        display: "grid",
        [prop]: "span 2 / 3",
      },
    });

    expect(sheet.toString()).toBe(
      `.container-id {
  display: -ms-grid;
  -ms-${prop}: 1;
  -ms-${prop}-span: 2;
}`,
    );
  });

  it("should skip value when it is not supported", () => {
    const sheet = jss.createStyleSheet({
      container: {
        display: "grid",
        // Note that value is invalid
        [prop]: "1 / 2 / 3",
      },
    });

    expect(sheet.toString()).toBe(
      `.container-id {
  display: -ms-grid;
  ${prop}: 1 / 2 / 3;
}`,
    );
  });
});
