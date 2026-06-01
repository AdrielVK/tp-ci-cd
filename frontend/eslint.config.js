import js from "@eslint/js";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import jsxA11y from "eslint-plugin-jsx-a11y";
import importPlugin from "eslint-plugin-import";
import vitestPlugin from "@vitest/eslint-plugin";
import sonarjs from "eslint-plugin-sonarjs";
import unicorn from "eslint-plugin-unicorn";
import noRelativeImportPaths from "eslint-plugin-no-relative-import-paths";
import prettier from "eslint-config-prettier";


// Shared parser options

const jsBrowserGlobals = {
  document: "readonly",
  window: "readonly",
  navigator: "readonly",
  location: "readonly",
  history: "readonly",
  URL: "readonly",
};

const vitestGlobals = {
  describe: "readonly",
  it: "readonly",
  test: "readonly",
  expect: "readonly",
  vi: "readonly",
  beforeEach: "readonly",
  afterEach: "readonly",
  beforeAll: "readonly",
  afterAll: "readonly",
};

const tsParserOptions = {
  languageOptions: {
    globals: jsBrowserGlobals,
    parser: tsParser,
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      project: ["./tsconfig.app.json", "./tsconfig.node.json"],
      ecmaFeatures: { jsx: true },
    },
  },
};

const tsParserNoProjectOptions = {
  languageOptions: {
    globals: jsBrowserGlobals,
    parser: tsParser,
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      ecmaFeatures: { jsx: true },
    },
  },
};

// Files
const SOURCE_FILES = ["src/**/*.{ts,tsx}"];
const TEST_FILES = [
  "src/**/*.{test,spec}.{ts,tsx}",
  "src/**/__tests__/**/*.{ts,tsx}",
  "src/test-utils/**/*.{ts,tsx}",
  "src/test/**/*.{ts,tsx}",
];
const CONFIG_FILES = [
  "*.config.{js,ts,mjs,cjs}",
  "*.setup.{js,ts}",
  "vite.config.*",
  "vitest.config.*",
  "vitest.setup.*",
];


// Export

export default [
  // ── Global ignores ────────────────────────────────────────────────────────
  {
    ignores: [
      "dist/**",
      "build/**",
      "coverage/**",
      "node_modules/**",
      ".docker/**",
      "**/*.d.ts",
      "**/*.min.js",
      "public/**",
    ],
  },

 
  js.configs.recommended,


  {
    files: SOURCE_FILES,
    ...tsParserOptions,
    plugins: {
      "@typescript-eslint": ts,
      react: reactPlugin,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "jsx-a11y": jsxA11y,
      import: importPlugin,
      sonarjs,
      unicorn,
      "no-relative-import-paths": noRelativeImportPaths,
    },
    settings: {
      react: { version: "detect" },
      "import/resolver": {
        typescript: { alwaysTryTypes: true, project: "./tsconfig.json" },
      },
    },
    rules: {
      
      ...ts.configs["strict-type-checked"].rules,
      ...ts.configs["stylistic-type-checked"].rules,

      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unsafe-assignment": "error",
      "@typescript-eslint/no-unsafe-call": "error",
      "@typescript-eslint/no-unsafe-member-access": "error",
      "@typescript-eslint/no-unsafe-return": "error",
      "@typescript-eslint/no-unsafe-argument": "error",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": [
        "error",
        { checksVoidReturn: { attributes: false } },
      ],
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/require-await": "error",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
      "@typescript-eslint/consistent-type-exports": "error",
      "@typescript-eslint/no-import-type-side-effects": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/naming-convention": [
        "error",
        // Interfaces sin prefijo "I"
        {
          selector: "interface",
          format: ["PascalCase"],
          custom: { regex: "^I[A-Z]", match: false },
        },
        // Type aliases en PascalCase
        { selector: "typeAlias", format: ["PascalCase"] },
        // Enums en PascalCase
        { selector: "enum", format: ["PascalCase"] },
        // Enum members en UPPER_CASE
        { selector: "enumMember", format: ["UPPER_CASE"] },
        // Variables/funciones/parámetros en camelCase o UPPER_CASE (constantes)
        {
          selector: "variable",
          format: ["camelCase", "UPPER_CASE", "PascalCase"],
        },
        // Funciones en camelCase o PascalCase (componentes)
        { selector: "function", format: ["camelCase", "PascalCase"] },
        // Propiedades de clases/objetos en camelCase
        { selector: "classProperty", format: ["camelCase"] },
      ],
      "@typescript-eslint/prefer-nullish-coalescing": "error",
      "@typescript-eslint/prefer-optional-chain": "error",
      "@typescript-eslint/no-unnecessary-condition": "error",
      "@typescript-eslint/switch-exhaustiveness-check": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/strict-boolean-expressions": [
        "error",
        {
          allowString: false,
          allowNumber: false,
          allowNullableObject: true,
          allowNullableBoolean: false,
          allowNullableString: false,
          allowNullableNumber: false,
          allowAny: false,
        },
      ],
      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          "ts-expect-error": "allow-with-description",
          "ts-ignore": true,
          "ts-nocheck": true,
          minimumDescriptionLength: 10,
        },
      ],
      "@typescript-eslint/no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["../*", "./../*"],
              message:
                "Use absolute imports with '@/' alias instead of relative paths going up directories.",
            },
          ],
        },
      ],

      // ── React ─────────────────────────────────────────────────────────────
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,

      "react/prop-types": "off", // TypeScript lo cubre
      "react/display-name": "error",
      "react/no-array-index-key": "error",
      "react/no-unstable-nested-components": ["error", { allowAsProps: false }],
      "react/jsx-no-useless-fragment": ["error", { allowExpressions: true }],
      "react/jsx-curly-brace-presence": [
        "error",
        { props: "never", children: "never" },
      ],
      "react/self-closing-comp": "error",
      "react/hook-use-state": "error",
      "react/jsx-boolean-value": ["error", "never"],
      "react/jsx-no-leaked-render": [
        "error",
        { validStrategies: ["ternary", "coerce"] },
      ],
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // ── Accesibilidad (a11y) ───────────────────────────────────────────────
      ...jsxA11y.configs.recommended.rules,
      "jsx-a11y/anchor-is-valid": "error",
      "jsx-a11y/no-autofocus": "warn",

      // ── Imports ───────────────────────────────────────────────────────────
      "import/no-duplicates": ["error", { "prefer-inline": true }],
      "import/no-cycle": ["error", { maxDepth: 5, ignoreExternal: true }],
      "import/no-self-import": "error",
      "import/no-useless-path-segments": "error",
      "import/no-extraneous-dependencies": [
        "error",
        { devDependencies: [...TEST_FILES, ...CONFIG_FILES] },
      ],
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "type",
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
          pathGroups: [
            { pattern: "react", group: "external", position: "before" },
            { pattern: "@/**", group: "internal", position: "before" },
          ],
          pathGroupsExcludedImportTypes: ["react", "type"],
        },
      ],
      "no-relative-import-paths/no-relative-import-paths": [
        "error",
        { allowSameFolder: true, rootDir: "src", prefix: "@" },
      ],

      // ── SonarJS (complejidad y code smells) ───────────────────────────────
      ...sonarjs.configs.recommended.rules,
      "sonarjs/cognitive-complexity": ["error", 15],
      "sonarjs/no-duplicate-string": ["error", { threshold: 3 }],
      "sonarjs/no-identical-functions": "error",
      "sonarjs/no-collapsible-if": "error",
      "sonarjs/prefer-immediate-return": "error",

      // ── Unicorn (mejores prácticas modernas) ──────────────────────────────
      "unicorn/prefer-module": "error",
      "unicorn/prefer-node-protocol": "error",
      "unicorn/no-array-for-each": "error",
      "unicorn/no-array-push-push": "error",
      "unicorn/no-for-loop": "error",
      "unicorn/prefer-array-flat-map": "error",
      "unicorn/prefer-array-some": "error",
      "unicorn/prefer-includes": "error",
      "unicorn/prefer-string-slice": "error",
      "unicorn/prefer-ternary": "error",
      "unicorn/prefer-nullish-coalescing": "off", // Cubierto por TS
      "unicorn/no-useless-undefined": "error",
      "unicorn/consistent-function-scoping": "error",
      "unicorn/no-nested-ternary": "error",
      "unicorn/filename-case": [
        "error",
        {
          cases: { kebabCase: true, pascalCase: true },
          ignore: [/^[A-Z][a-zA-Z]+\.(tsx|ts)$/],
        },
      ],

      // ── Buenas prácticas generales ────────────────────────────────────────
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "error",
      "no-alert": "error",
      eqeqeq: ["error", "always"],
      "prefer-const": "error",
      "no-var": "error",
      "object-shorthand": "error",
      "prefer-arrow-callback": "error",
      "prefer-destructuring": [
        "error",
        { array: false, object: true },
        { enforceForRenamedProperties: false },
      ],
      "prefer-template": "error",
      "no-param-reassign": ["error", { props: false }],
      curly: ["error", "all"],
      "no-shadow": "off",
      "@typescript-eslint/no-shadow": "error",
      complexity: ["error", 10],
      "max-depth": ["error", 4],
      "max-lines-per-function": [
        "warn",
        { max: 80, skipBlankLines: true, skipComments: true },
      ],
      "max-lines": [
        "warn",
        { max: 300, skipBlankLines: true, skipComments: true },
      ],
    },
  },

  // ── Archivos de test (Vitest) ─────────────────────────────────────────────
  {
    files: TEST_FILES,
    ...tsParserOptions,
    languageOptions: {
      ...tsParserOptions.languageOptions,
      globals: {
        ...tsParserOptions.languageOptions.globals,
        ...vitestGlobals,
      },
    },
    plugins: {
      "@typescript-eslint": ts,
      vitest: vitestPlugin,
    },
    rules: {
      // Activa todas las reglas recomendadas de Vitest
      ...vitestPlugin.configs.recommended.rules,

      // Vitest específicas
      "vitest/consistent-test-it": ["error", { fn: "it" }],
      "vitest/no-disabled-tests": "warn",
      "vitest/no-focused-tests": "error",
      "vitest/no-identical-title": "error",
      "vitest/no-standalone-expect": "error",
      "vitest/prefer-each": "error",
      "vitest/prefer-hooks-in-order": "error",
      "vitest/prefer-lowercase-title": ["error", { ignore: ["describe"] }],
      "vitest/prefer-mock-promise-shorthand": "error",
      "vitest/prefer-spy-on": "error",
      "vitest/prefer-to-be": "error",
      "vitest/prefer-to-have-length": "error",
      "vitest/require-hook": [
        "error",
        { allowedFunctionCalls: ["vi.mock", "vi.hoisted"] },
      ],
      "vitest/valid-describe-callback": "error",
      "vitest/valid-expect": "error",

      // Relajamos algunas reglas estrictas en tests
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "max-lines-per-function": "off",
      "max-lines": "off",
      "sonarjs/no-duplicate-string": "off",
    },
  },

  // ── Archivos de configuración ─────────────────────────────────────────────
  {
    files: CONFIG_FILES,
    ...tsParserNoProjectOptions,
    plugins: { "@typescript-eslint": ts },
    rules: {
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "import/no-extraneous-dependencies": "off",
      "unicorn/prefer-module": "off",
      "no-console": "off",
    },
  },

  // ── Deshabilita reglas que conflictúan con Prettier (SIEMPRE al final) ────
  prettier,
];