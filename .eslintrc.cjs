module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    "@rocketseat/eslint-config/react",
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', "eslint-plugin-import-helpers"],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "import-helpers/order-imports": [
      "warn",
      {
        "newlinesBetween": "always",
        "groups": [
          "/^react$/",
          "module",
          "/^(@/)?utils/",
          "/^(@/)?components/",
          "/^@/modules/",
          "/^./schema//^./types/",
          ["parent", "sibling", "index"],
          "/^./styles/"
        ],
        "alphabetize": { "order": "asc", "ignoreCase": true }
      }
    ]
  },
}
