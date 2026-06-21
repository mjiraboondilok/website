import js from "@eslint/js";
import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";
import prettier from "eslint-config-prettier";

export default [
  // Global ignores (build output, generated files, deps).
  {
    ignores: ["dist/", ".astro/", "node_modules/"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  // Disable formatting rules that conflict with Prettier. Keep last.
  prettier,
];
