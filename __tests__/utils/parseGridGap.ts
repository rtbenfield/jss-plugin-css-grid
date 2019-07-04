import { GridGap, parseGridGap } from "../../src/utils/parseGridGap";

// Spy on console warnings to test validation
const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => null);

beforeEach(() => {
  warnSpy.mockClear();
});

it("returns no values when no gap props exist", () => {
  const actual = parseGridGap({ display: "grid" });
  expect(actual).toEqual({});
});

describe.each<string>(["gap", "grid-gap"])("%s prop tests", prop => {
  it("parses single value", () => {
    const actual = parseGridGap({ [prop]: "10px" });
    expect(actual).toEqual({
      column: "10px",
      row: "10px",
    });
  });

  it("parses double value", () => {
    const actual = parseGridGap({ [prop]: "10px 20px" });
    expect(actual).toEqual({
      column: "20px",
      row: "10px",
    });
  });

  it("warns on invalid value", () => {
    const actual = parseGridGap({ [prop]: "10px 20px 30px" });
    expect(actual).toEqual({});
    expect(warnSpy).toHaveBeenCalledWith(
      `Invalid ${prop} value "10px 20px 30px"`,
    );
  });
});

describe.each<[string, keyof GridGap]>([
  ["column-gap", "column"],
  ["grid-column-gap", "column"],
  ["row-gap", "row"],
  ["grid-row-gap", "row"],
])("%s prop tests", (prop, expectedField) => {
  it("parses single value", () => {
    const actual = parseGridGap({ [prop]: "10px" });
    expect(actual).toEqual({
      column: undefined,
      row: undefined,
      [expectedField]: "10px",
    });
  });
});
