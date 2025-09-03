// eslint.config.js (ESM)
import { FlatCompat } from "@eslint/eslintrc";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import prettierPlugin from "eslint-plugin-prettier";
import preferArrowPlugin from "eslint-plugin-prefer-arrow";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

export default [
  ...compat.extends("next/core-web-vitals", "next", "plugin:@typescript-eslint/recommended"),

  {
    ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts"],
  },

  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: tsParser,
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      prettier: prettierPlugin,
      "prefer-arrow": preferArrowPlugin,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
    },
    rules: {
      "react-hooks/rules-of-hooks": "warn",
      "react/no-unescaped-entities": "off",

      "@typescript-eslint/no-inferrable-types": "warn",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", destructuredArrayIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],

      "prefer-const": "error",
      "func-style": ["error", "expression"],
      "prefer-arrow/prefer-arrow-functions": ["warn", { disallowPrototype: true, singleReturnOnly: false }],

      "no-shadow": "off",
      "@typescript-eslint/no-shadow": "warn",

      "prettier/prettier": "warn",
      "no-console": ["warn", { allow: ["warn", "error", "info"] }],
    },
  },
];
