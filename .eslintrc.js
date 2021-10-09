module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "jest": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      "no-unused-vars": [
        "warn",
        {
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_"
        }
      ],
      "react/react-in-jsx-scope": "off",
      "no-debugger": "warn"
    },
};
