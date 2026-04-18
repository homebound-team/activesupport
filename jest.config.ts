import { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  cacheDirectory: "<rootDir>/.jest-cache",
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
  },
  reporters: [
    "default",
    [
      "jest-junit",
      {
        outputDirectory: "./junit-reports",
        addFileAttribute: "true", // required for CircleCI to split by test timing
      },
    ],
  ],
};

export default config;
