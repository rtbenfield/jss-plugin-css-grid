import { parseGridAreas } from "../../src/utils/parseGridAreas";

it("parses 1x1 with one area", () => {
  const actual = parseGridAreas(`"area1"`);
  expect(actual).toEqual({
    area1: {
      column: 1,
      columnSpan: 1,
      row: 1,
      rowSpan: 1,
    },
  });
});

it("parses 1x2 with two areas", () => {
  const actual = parseGridAreas(`"area1 area2"`);
  expect(actual).toEqual({
    area1: {
      column: 1,
      columnSpan: 1,
      row: 1,
      rowSpan: 1,
    },
    area2: {
      column: 2,
      columnSpan: 1,
      row: 1,
      rowSpan: 1,
    },
  });
});

it("parses 2x2 with four areas", () => {
  const actual = parseGridAreas(`"area1 area2" "area3 area4"`);
  expect(actual).toEqual({
    area1: {
      column: 1,
      columnSpan: 1,
      row: 1,
      rowSpan: 1,
    },
    area2: {
      column: 2,
      columnSpan: 1,
      row: 1,
      rowSpan: 1,
    },
    area3: {
      column: 1,
      columnSpan: 1,
      row: 2,
      rowSpan: 1,
    },
    area4: {
      column: 2,
      columnSpan: 1,
      row: 2,
      rowSpan: 1,
    },
  });
});

it("parses 2x2 with 3 areas - vertical span", () => {
  const actual = parseGridAreas(`"area1 area2" "area1 area3"`);
  expect(actual).toEqual({
    area1: {
      column: 1,
      columnSpan: 1,
      row: 1,
      rowSpan: 2,
    },
    area2: {
      column: 2,
      columnSpan: 1,
      row: 1,
      rowSpan: 1,
    },
    area3: {
      column: 2,
      columnSpan: 1,
      row: 2,
      rowSpan: 1,
    },
  });
});

it("parses 2x2 with 3 areas - horizontal span", () => {
  const actual = parseGridAreas(`"area1 area1" "area2 area3"`);
  expect(actual).toEqual({
    area1: {
      column: 1,
      columnSpan: 2,
      row: 1,
      rowSpan: 1,
    },
    area2: {
      column: 1,
      columnSpan: 1,
      row: 2,
      rowSpan: 1,
    },
    area3: {
      column: 2,
      columnSpan: 1,
      row: 2,
      rowSpan: 1,
    },
  });
});

it("parses 2x2 with 1 area", () => {
  const actual = parseGridAreas(`"area1 area1" "area1 area1"`);
  expect(actual).toEqual({
    area1: {
      column: 1,
      columnSpan: 2,
      row: 1,
      rowSpan: 2,
    },
  });
});

it("parses 3x3 with 2x2 area", () => {
  const actual = parseGridAreas(`
    "area1 area2 area3"
    "area4 area5 area5"
    "area6 area5 area5"
  `);
  expect(actual).toEqual({
    area1: {
      column: 1,
      columnSpan: 1,
      row: 1,
      rowSpan: 1,
    },
    area2: {
      column: 2,
      columnSpan: 1,
      row: 1,
      rowSpan: 1,
    },
    area3: {
      column: 3,
      columnSpan: 1,
      row: 1,
      rowSpan: 1,
    },
    area4: {
      column: 1,
      columnSpan: 1,
      row: 2,
      rowSpan: 1,
    },
    area5: {
      column: 2,
      columnSpan: 2,
      row: 2,
      rowSpan: 2,
    },
    area6: {
      column: 1,
      columnSpan: 1,
      row: 3,
      rowSpan: 1,
    },
  });
});
