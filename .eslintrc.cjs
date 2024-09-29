import { fixupConfigRules } from "@eslint/compat"
import { FlatCompat } from "@eslint/eslintrc"
import eslint from "@eslint/js"
import vitestPlugin from "@vitest/eslint-plugin"
import prettierConfig from "eslint-config-prettier"
import * as importPlugin from "eslint-plugin-import"
import jestDomPlugin from "eslint-plugin-jest-dom"
import jsxA11yPlugin from "eslint-plugin-jsx-a11y"
import perfectionistPlugin from "eslint-plugin-perfectionist"
import reactPlugin from "eslint-plugin-react"
import spellcheckPlugin from "eslint-plugin-spellcheck"
import unusedImportsPlugin from "eslint-plugin-unused-imports"
import globals from "globals"
import tseslint from "typescript-eslint"

const flatCompat = new FlatCompat()

export default tseslint.config(
  {
    ignores: ["dist"],
  },
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat["jsx-runtime"],
  jsxA11yPlugin.flatConfigs.recommended,
  vitestPlugin.configs.recommended,
  jestDomPlugin.configs["flat/recommended"],
  ...flatCompat.extends("plugin:react-hooks/recommended"),
  ...fixupConfigRules(
    flatCompat.extends(
      "plugin:testing-library/react",
      "plugin:storybook/recommended"
    )
  ),
  {
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react/destructuring-assignment": "error",
      "react/function-component-definition": [
        "error",
        {
          namedComponents: "arrow-function",
          unnamedComponents: "arrow-function",
        },
      ],
      "react/hook-use-state": "error",
      "react/jsx-boolean-value": "error",
      "react/jsx-fragments": "error",
      "react/jsx-curly-brace-presence": "error",
      "react/jsx-no-useless-fragment": "error",
      "react/jsx-sort-props": "error",
      "react/self-closing-comp": "error",
      "react/jsx-pascal-case": "error",
      "react/no-danger": "error",
      "react/prop-types": "off",
    },
  },
  {
    rules: {
      "react-hooks/exhaustive-deps": "error",
    },
  },
  {
    plugins: { import: importPlugin },
    rules: {
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling"],
            "object",
            "type",
            "index",
          ],
          "newlines-between": "always",
          pathGroupsExcludedImportTypes: ["builtin"],
          alphabetize: { order: "asc", caseInsensitive: true },
          pathGroups: [
            {
              pattern: "react",
              group: "external",
              position: "before",
            },
          ],
        },
      ],
    },
  },
  {
    plugins: { "unused-imports": unusedImportsPlugin },
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    rules: {
      "vitest/consistent-test-it": ["error", { fn: "test" }],
    },
  },
  {
    plugins: { spellcheck: spellcheckPlugin },
    rules: {
      "spellcheck/spell-checker": [
        "error",
        {
          minLength: 5, // 5 文字以上の単語をチェック
          // チェックをスキップする単語の配列
          skipWords: [
            "noreferrer",
            "compat",
            "vitest",
            "tseslint",
            "globals",
            "fixup",
          ],
        },
      ],
    },
  },
  {
    // eslint-plugin-perfectionist の設定
    plugins: { perfectionist: perfectionistPlugin },
    rules: {
      "perfectionist/sort-interfaces": "warn", // interface のプロパティの並び順をアルファベット順に統一
      "perfectionist/sort-object-types": "warn", // Object 型のプロパティの並び順をアルファベット順に統一
    },
  },
  prettierConfig // フォーマット は Prettier で行うため、フォーマット関連のルールを無効化
)
