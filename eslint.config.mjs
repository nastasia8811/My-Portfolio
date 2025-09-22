import path from "node:path";
import { fileURLToPath } from "node:url";

import js from "@eslint/js";
import globals from "globals";

// typescript-eslint flat helper (parser + plugin + готові пресети)
import tseslint from "typescript-eslint";

import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import prettierPlugin from "eslint-plugin-prettier";
import nextPlugin from "@next/eslint-plugin-next";

// Для legacy-пресетів Next (поки вони не всі flat) підхопимо через FlatCompat
import { FlatCompat } from "@eslint/eslintrc";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({ baseDirectory: __dirname });

export default [
    {
        ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts",  "eslint.config.{js,cjs,mjs}"  ],
    },

    js.configs.recommended,

    ...tseslint.configs.recommendedTypeChecked.map(cfg => ({
        ...cfg,
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            ...(cfg.languageOptions ?? {}),
            parserOptions: {
                ...(cfg.languageOptions?.parserOptions ?? {}),
                projectService: true,
                tsconfigRootDir: __dirname,
            },
        },
    })),

    {
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            // Увімкнути сервіс проєкту для правил з типами
            parserOptions: {
                projectService: true,
                tsconfigRootDir: __dirname,
            },
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
    },
    // React + Hooks
    {
        files: ["**/*.{jsx,tsx}"],
        plugins: {
            react: reactPlugin,
            "react-hooks": reactHooksPlugin,
        },
        settings: {
            react: { version: "detect" },
        },
        rules: {
            "react-hooks/rules-of-hooks": "warn",
            "react/no-unescaped-entities": "off",
        },
    },

    // Next.js: тягнемо core-web-vitals через compat поки це найстабільніше
    ...compat.extends("next/core-web-vitals", "next"),

    {
        plugins: { prettier: prettierPlugin },
        rules: {
            "prettier/prettier": "warn",
        },
    },
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        rules: {
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": [
                "warn",
                { argsIgnorePattern: "^_", destructuredArrayIgnorePattern: "^_", varsIgnorePattern: "^_" },
            ],

            "@typescript-eslint/no-inferrable-types": "warn",
            "no-shadow": "off",
            "@typescript-eslint/no-shadow": "warn",
            "prefer-const": "error",
            "func-style": ["error", "expression"],
            "prefer-arrow/prefer-arrow-functions": ["warn", { disallowPrototype: true, singleReturnOnly: false }],
            "no-console": ["warn", { allow: ["warn", "error", "info"] }],
        },
        plugins: {
            // Примітка: цей плагін не має готових flat-пресетів, але як plugin працює
            "prefer-arrow": (await import("eslint-plugin-prefer-arrow")).default,
            "@typescript-eslint": tseslint.plugin,
        },
    },
];
