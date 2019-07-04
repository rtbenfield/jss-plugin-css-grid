module.exports = {
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  rootDir: ".",
  testEnvironment: "node",
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.ts$",
  transform: {
    "\\.ts$": "ts-jest",
  },
}
