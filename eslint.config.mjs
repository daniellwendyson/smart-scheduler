import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-config-prettier";

export default [
  {
    ignores: ["node_modules/**", "coverage/**", "dist/**"],
  },
  js.configs.recommended,
  {
    files: ["backend/**/*.js", "tests/**/*.js", "*.config.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
  prettier,
];
