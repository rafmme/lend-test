/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: [
    "./src/**/*.(t|j)s",
    "!./src/models/**",
    "!./src/db/**",
    "!./src/config/**",
    //"!./src/controllers/user.controller.ts",
    "!./src/server.ts"
  ],
  coveragePathIgnorePatterns: [
    ".exception.ts",
    ".model.ts",
  ],
};



