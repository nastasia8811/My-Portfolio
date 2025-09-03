import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import prettierPlugin from "eslint-plugin-prettier";
import preferArrowPlugin from "eslint-plugin-prefer-arrow";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Compatibility helper to consume legacy shareable configs
const compat = new FlatCompat({ baseDirectory: __dirname });

export default [
  // Extend Next.js core and TS recommendations
  ...compat.extends(
      "next/core-web-vitals",
      "next/typescript"
  ),
  {
    // Files / directories to ignore
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts"
    ],
    // Declare plugins as objects in flat config
    plugins: {
      "@typescript-eslint": tsPlugin,
      prettier: prettierPlugin,
      "prefer-arrow": preferArrowPlugin
    },
    // Enable rules and override defaults
    rules: {
      'react-hooks/rules-of-hooks': 'warn',
      'react/no-unescaped-entities': 'off',
      '@typescript-eslint/no-inferrable-types': 'warn',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ],
      'prefer-const': 'error',
      'func-style': ['error', 'expression'],
      'prefer-arrow/prefer-arrow-functions': [
        'warn',
        { disallowPrototype: true, singleReturnOnly: false }
      ],
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'warn',
      'prettier/prettier': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }]
    }
  }
];
