module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react', "react-refresh"],
  rules: {
    //typescript
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/dot-notation": "off",
    //prettier
    "prettier/prettier": 0, // turn off prettier rules 
    //General rules
    "arrow-parens": "off",
    "object-curly-newline": "off",
    "no-mixed-operators": "off",
    "arrow-body-style": "off",
    "function-paren-newline": "off",
    "no-unused-vars": "warn",
    "no-plusplus": "off",
    // "no-extranous-dependencies": "off",
    "max-lines-per-function": 0,
    "space-before-function-paren": "off",
    "max-classes-per-file": 0,
    "lines-between-class-members": "off",
    "max-len": [
      "error",
      130,
      2,
      {
        "ignoreUrls": true,
        "ignoreRegExpLiterals": true,
        "ignoreTemplateLiterals": true
      }
    ],
    "no-console": "warn",
    "no-alert": "error",
    "no-param-reassign": "off",
    "radix": 1,
    "prefer-destructuring": "off",
    "prefer-const": [
      "error",
      {
        "destructuring": "all",
        "ignoreReadBeforeAssign": false
      }
    ],
    "no-useless-concat": "error",
    "no-negated-condition": 0,
    "quotes": [
      "error",
      "double",
      {
        "avoidEscape": true
      }
    ],
    "no-shadow": 0,
    "no-multi-spaces": 2,
    "no-multiple-empty-lines": [
      "error",
      {
        "max": 1,
        "maxEOF": 1
      }
    ],
    "no-irregular-whitespace": 2,
    "no-var": 1,
    "prefer-arrow-callback": 1,
    "prefer-spread": 1,
    "prefer-template": 1,
    "no-trailing-spaces": [
      2,
      {
        "skipBlankLines": true
      }
    ],
    "babel/new-cap": 0,
    //React rules
    "react/react-in-jsx-scope": "off",
    "react/jsx-props-no-spreading": "off",
    "react/require-default-props": "off",
    "react/forbid-prop-types": "off",
    "react/no-did-mount-set-state": "off",
    "react/no-unused-prop-types": "off",
    "react/tsx-curly-spacing": "off",
    "react/prop-types": 0,
    "react/function-component-definition": [
      1,
      {
        "namedComponents": "function-declaration",
        "unnamedComponents": "arrow-function"
      }
    ],
    "react/destructuring-assignment": [
      1,
      "always",
      {
        "ignoreClassFields": true
      }
    ],
    "react/no-array-index-key": 0,
    "react/display-name": 0,
    //Import rules
    "import/prefer-default-export": 0,
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
