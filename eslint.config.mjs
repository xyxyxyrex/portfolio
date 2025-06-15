// eslint.config.js
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...compat.extends(
    "next",
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended"
  ),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "warn", // change from 'error' if you just want to see warnings
      "react/no-unescaped-entities": "warn",       // or 'off' if you don't care
      "@next/next/no-img-element": "warn",         // still follow recommendation, but don't fail build
    },
  },
];
