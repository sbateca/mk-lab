export default {
    preset: "ts-jest",
    testEnvironment: "jest-environment-jsdom",
    transform: {
      "^.+\\.tsx?$": "ts-jest"
    },
    moduleNameMapper: {
      "\\.(gif|ttf|eot|svg|png)$": "jest-transform-stub"
    },
    setupFilesAfterEnv: ["@testing-library/jest-dom"]
  };
  