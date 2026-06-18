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
      //trae las reglas de tipo estricto y de estilo de @typescript-eslint
      ...ts.configs["strict-type-checked"].rules,
      ...ts.configs["stylistic-type-checked"].rules,
      //restringe el uso de 'any' , pero no en tests
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unsafe-assignment": "error",
      "@typescript-eslint/no-unsafe-call": "error",
      "@typescript-eslint/no-unsafe-member-access": "error",
      "@typescript-eslint/no-unsafe-return": "error",
      "@typescript-eslint/no-unsafe-argument": "error",
      //restringe las promesas no manejadas y el mal uso de promesas. 
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": [
        "error",
        //Permite funciones async en elementos jsx, seria un falso positivo.
        { checksVoidReturn: { attributes: false } },
      ],
      //restringe el uso de 'await' en valores que no son promesas y obliga a marcar las funciones que retornan promesas como 'async'.
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/require-await": "error",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
      //restringe las exportaciones de tipos inconsistentes y las importaciones con efectos secundarios.
      "@typescript-eslint/consistent-type-exports": "error",
      "@typescript-eslint/no-import-type-side-effects": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          // Permite variables, argumentos y errores no usados que comiencen con '_', para indicar intencionalmente que no se usaran.
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      //Establece convenciones 
      "@typescript-eslint/naming-convention": [
        "error",
        // Interfaces sin prefijo "I"
        {
          selector: "interface",
          format: ["PascalCase"],
          custom: { regex: "^I[A-Z]", match: false },
        },
        // Tipos de alias en PascalCase
        { selector: "typeAlias", format: ["PascalCase"] },
        // Clases en PascalCase
        { selector: "class", format: ["PascalCase"] },
        // Enum en PascalCase
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
      //obliga a usar ?? en vez de ||. Ya que daria bugs si se usan con valores falsy como '' o 0.
      "@typescript-eslint/prefer-nullish-coalescing": "error",
      //obliga a usar el encadenamiento opcional ?. en lugar de null o undefined
      "@typescript-eslint/prefer-optional-chain": "error",
      //evita las condicionales inncesarias.
      "@typescript-eslint/no-unnecessary-condition": "error",
      //cubre todas las posibilidades en switch 
      "@typescript-eslint/switch-exhaustiveness-check": "error",
      //restringe el uso del operador no nulo !
      "@typescript-eslint/no-non-null-assertion": "error",
      //asegura que los operadores de comparacion sean combertibles a boolean.
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
      //restringe el uso de comentarios de supresión de errores de TypeScript, pero permite ts-ignore y ts-nocheck con una descripción adecuada.
      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          "ts-expect-error": "allow-with-description",
          "ts-ignore": true,
          "ts-nocheck": true,
          minimumDescriptionLength: 10,
        },
      ],
      //restringe las importaciones relativas que suben directorios, para fomentar el uso de alias de rutas absolutas.
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

      // ── REACT --> buscamos optimizar el rendereo, mejorar la legibilidad y evitar errores comunes en componentes React
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,

      "react/prop-types": "off", // TypeScript lo cubre
      // Evita componentes sin nombre
      "react/display-name": "error",
      // Evita usar índices como keys en listas
      "react/no-array-index-key": "error",
      // Evita componentes anidados dentro de otros componentes, lo que puede causar problemas de rendimiento y legibilidad
      "react/no-unstable-nested-components": ["error", { allowAsProps: false }],
      // Evita fragmentos vacíos o innecesarios, pero permite fragmentos para expresiones JSX
      "react/jsx-no-useless-fragment": ["error", { allowExpressions: true }],
      // Evita el uso de llaves innecesarias en jsx
      "react/jsx-curly-brace-presence": [
        "error",
        { props: "never", children: "never" },
      ],
      // Obliga a usar componentes autocerrados cuando no tienen hijos
      "react/self-closing-comp": "error",
      // Evita el uso de funciones dentro del JSX, lo que puede causar re-renderizados innecesarios
      "react/hook-use-state": "error",
      // Evita el uso de booleanos explícitos en props, lo que mejora la legibilidad
      "react/jsx-boolean-value": ["error", "never"],
      // Evita el uso de variables no utilizadas en JSX
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

      // ── SonarJS (complejidad y code smells) 
      //analiza estaticamente la arquitecura del codigo 
      ...sonarjs.configs.recommended.rules,
      // Limita la complejidad cognitiva de las funciones para mejorar la legibilidad y mantenibilidad
      "sonarjs/cognitive-complexity": ["error", 15],
      // Evita cadenas de texto duplicadas. deben ser extraidas a constantes 
      "sonarjs/no-duplicate-string": ["error", { threshold: 3 }],
      // Evita funciones identicas 
      "sonarjs/no-identical-functions": "error",
      // Evita condiciones anidadas 
      "sonarjs/no-collapsible-if": "error",
      // Evita variables que se asignan un valor y luego se reasignan, lo que puede causar confusión.
      "sonarjs/prefer-immediate-return": "error",

      // ── Unicorn (mejores prácticas modernas) ──────────────────────────────

      "unicorn/prefer-module": "error",
      // Obliga a usar el protocolo 'node:' para importar módulos nativos de node
      "unicorn/prefer-node-protocol": "error",
      //evita el uso del forEach
      "unicorn/no-array-for-each": "error",
      //evita el uso de push para agregar elementos a un array
      "unicorn/no-array-push-push": "error",
      //evita el uso de bucles for tradicionales, promoviendo métodos de array más modernos y legibles como map, filter, reduce, etc
      "unicorn/no-for-loop": "error",
      // Obliga a usar métodos de array más específicos y legibles en lugar de map + flatten o filter + map
      "unicorn/prefer-array-flat-map": "error",
      "unicorn/prefer-array-some": "error",
      "unicorn/prefer-includes": "error",
      "unicorn/prefer-string-slice": "error",
      // Obliga a usar expresiones ternarias en lugar de asignaciones condicionales 
      "unicorn/prefer-ternary": "error",
      "unicorn/prefer-nullish-coalescing": "off", // Cubierto por TS
      // Evita el uso de 'undefined' como valor, promoviendo el uso de 'null' o la ausencia de valor
      "unicorn/no-useless-undefined": "error",
      // Evita el uso de variables que solo se usan dentro de un bloque
      "unicorn/consistent-function-scoping": "error",
      // Evita el uso de expresiones ternarias anidadas
      "unicorn/no-nested-ternary": "error",
      // Obliga a usar nombres de archivo en kebab-case o PascalCase, pero ignora archivos de test y mocks que suelen tener guiones bajos.
      "unicorn/filename-case": [
        "error",
        {
          cases: { kebabCase: true, pascalCase: true },
          ignore: [/^__/, /^[A-Z][a-zA-Z]+\.(tsx|ts)$/],  // /^__/ ignora __tests__, __mocks__, etc.
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