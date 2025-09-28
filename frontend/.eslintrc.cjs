module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  plugins: ["react-refresh"],
  rules: {
    // Ignorar reglas molestas en todo el proyecto
    "react-refresh/only-export-components": "off",
    "no-unused-vars": "warn", // en lugar de error, solo avisa
  },
};
