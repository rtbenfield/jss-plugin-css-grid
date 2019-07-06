module.exports = {
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  reporters: ["default", "jest-junit"],
  rootDir: ".",
  testEnvironment: "node",
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.ts$",
  transform: {
    "\\.ts$": "ts-jest",
  },
};
