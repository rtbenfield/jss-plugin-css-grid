import { create, Jss, JssOptions } from "jss";
import cssGrid from "../src";

let jss: Jss;
beforeEach(() => {
  const settings: Partial<JssOptions> = {
    createGenerateId: () => rule => rule.key,
  };
  jss = create(settings).use(cssGrid());
});

it("should generate correct CSS - 1x1 with one area", () => {
  const sheet = jss.createStyleSheet({
    container: {
      display: "grid",
      "grid-template-areas": `"area1"`,
      "grid-template-columns": "1fr",
      "grid-template-rows": "2fr",
    },
    child1: {
      "grid-area": "area1",
    },
  });

  expect(sheet.toString()).toBe(
    `.container {
  display: -ms-grid;
  -ms-grid-columns: 1fr;
  -ms-grid-rows: 2fr;
}
.child1 {
  -ms-grid-column: 1;
  -ms-grid-row: 1;
}`,
  );
});

it("should generate correct CSS - 1x2 with two areas", () => {
  const sheet = jss.createStyleSheet({
    container: {
      display: "grid",
      "grid-template-areas": `"area1 area2"`,
      "grid-template-columns": "1fr 2fr",
      "grid-template-rows": "3fr",
    },
    child1: {
      "grid-area": "area1",
    },
    child2: {
      "grid-area": "area2",
    },
  });

  expect(sheet.toString()).toBe(
    `.container {
  display: -ms-grid;
  -ms-grid-columns: 1fr 2fr;
  -ms-grid-rows: 3fr;
}
.child1 {
  -ms-grid-column: 1;
  -ms-grid-row: 1;
}
.child2 {
  -ms-grid-column: 2;
  -ms-grid-row: 1;
}`,
  );
});

it("should generate correct CSS - 2x2 with three areas vertical span", () => {
  const sheet = jss.createStyleSheet({
    container: {
      display: "grid",
      "grid-template-areas": `"area1 area2" "area1 area3"`,
      "grid-template-columns": "1fr 2fr",
      "grid-template-rows": "3fr 4fr",
    },
    child1: {
      "grid-area": "area1",
    },
    child2: {
      "grid-area": "area2",
    },
    child3: {
      "grid-area": "area3",
    },
  });

  expect(sheet.toString()).toBe(
    `.container {
  display: -ms-grid;
  -ms-grid-columns: 1fr 2fr;
  -ms-grid-rows: 3fr 4fr;
}
.child1 {
  -ms-grid-column: 1;
  -ms-grid-row: 1;
  -ms-grid-row-span: 2;
}
.child2 {
  -ms-grid-column: 2;
  -ms-grid-row: 1;
}
.child3 {
  -ms-grid-column: 2;
  -ms-grid-row: 2;
}`,
  );
});

it("should generate correct CSS - 2x2 with three areas horizontal span", () => {
  const sheet = jss.createStyleSheet({
    container: {
      display: "grid",
      "grid-template-areas": `"area1 area1" "area2 area3"`,
      "grid-template-columns": "1fr 2fr",
      "grid-template-rows": "3fr 4fr",
    },
    child1: {
      "grid-area": "area1",
    },
    child2: {
      "grid-area": "area2",
    },
    child3: {
      "grid-area": "area3",
    },
  });

  expect(sheet.toString()).toBe(
    `.container {
  display: -ms-grid;
  -ms-grid-columns: 1fr 2fr;
  -ms-grid-rows: 3fr 4fr;
}
.child1 {
  -ms-grid-column: 1;
  -ms-grid-column-span: 2;
  -ms-grid-row: 1;
}
.child2 {
  -ms-grid-column: 1;
  -ms-grid-row: 2;
}
.child3 {
  -ms-grid-column: 2;
  -ms-grid-row: 2;
}`,
  );
});

it("should generate correct CSS - 2x2 with one area", () => {
  const sheet = jss.createStyleSheet({
    container: {
      display: "grid",
      "grid-template-areas": `"area1 area1" "area1 area1"`,
      "grid-template-columns": "1fr 2fr",
      "grid-template-rows": "3fr 4fr",
    },
    child1: {
      "grid-area": "area1",
    },
  });

  expect(sheet.toString()).toBe(
    `.container {
  display: -ms-grid;
  -ms-grid-columns: 1fr 2fr;
  -ms-grid-rows: 3fr 4fr;
}
.child1 {
  -ms-grid-column: 1;
  -ms-grid-column-span: 2;
  -ms-grid-row: 1;
  -ms-grid-row-span: 2;
}`,
  );
});

it("should generate correct CSS - 3x3 with 2x2 area", () => {
  const sheet = jss.createStyleSheet({
    container: {
      display: "grid",
      "grid-template-areas": `
        "area1 area2 area3"
        "area4 area5 area5"
        "area6 area5 area5"
      `,
      "grid-template-columns": "1fr 2fr 3fr",
      "grid-template-rows": "4fr 5fr 6fr",
    },
    child1: {
      "grid-area": "area1",
    },
    child2: {
      "grid-area": "area2",
    },
    child3: {
      "grid-area": "area3",
    },
    child4: {
      "grid-area": "area4",
    },
    child5: {
      "grid-area": "area5",
    },
    child6: {
      "grid-area": "area6",
    },
  });

  expect(sheet.toString()).toBe(
    `.container {
  display: -ms-grid;
  -ms-grid-columns: 1fr 2fr 3fr;
  -ms-grid-rows: 4fr 5fr 6fr;
}
.child1 {
  -ms-grid-column: 1;
  -ms-grid-row: 1;
}
.child2 {
  -ms-grid-column: 2;
  -ms-grid-row: 1;
}
.child3 {
  -ms-grid-column: 3;
  -ms-grid-row: 1;
}
.child4 {
  -ms-grid-column: 1;
  -ms-grid-row: 2;
}
.child5 {
  -ms-grid-column: 2;
  -ms-grid-column-span: 2;
  -ms-grid-row: 2;
  -ms-grid-row-span: 2;
}
.child6 {
  -ms-grid-column: 1;
  -ms-grid-row: 3;
}`,
  );
});
