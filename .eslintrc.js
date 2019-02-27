module.exports = {
  "parser": "babel-eslint",
  "extends": [
    "airbnb-base",
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "plugins": [
    "react",
    "import",
    "jsx-a11y"
  ],
  "env": {
    "es6": true,
    "node": true,
    "jest": true,
    "browser": true
  },
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "rules": {
    "max-len": 0,
    "func-names": 0,
    "no-console": 1,
    "global-require": 0,
    "no-throw-literal": 0,
    "object-shorthand": 0,
    "no-confusing-arrow": 1,
    "react/jsx-uses-react": 1,
    "import/no-unresolved": 0,
    "no-unused-expressions": 0,
    "import/no-named-as-default": 0,
    "import/prefer-default-export": 0,
    "import/no-extraneous-dependencies": 0,
  }
};
