module.exports = {
  env: {
    node: true,
    "vue/setup-compiler-macros": true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-essential",
    "plugin:vue/vue3-recommended",
  ],
  rules: {
    "indent": ["error", 4],
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    //"vue/attributes-order": "off",
    //"vue/html-closing-bracket-newline": "off",
    "vue/html-indent": ["error", 4,  { alignAttributesVertically: true }],
    "vue/html-self-closing": "off",
    //"vue/max-attributes-per-line": "off",
    "vue/multiline-html-element-content-newline": "error",
    "vue/multi-word-component-names": "off",
    "vue/mustache-interpolation-spacing": "error",
    //"vue/singleline-html-element-content-newline": "off",
  },
};
