import { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  cacheDirectory: "<rootDir>/.jest-cache",
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
