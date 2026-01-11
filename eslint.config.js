import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier";

export default [
  {
    ignores: ["dist", "node_modules", ".env"],
  },

  ...tseslint.configs.recommended,

  {
    plugins: {
      prettier,
    },

    rules: {
      "prettier/prettier": "error",
      "@typescript-eslint/no-unused-vars": ["warn"],
    },

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: tseslint.parser,
    },
  },
];
