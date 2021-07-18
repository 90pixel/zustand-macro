import pluginTester from "babel-plugin-tester";
import babelPluginMacros from "babel-plugin-macros";

pluginTester({
  plugin: babelPluginMacros,
  pluginName: "useStoreMacro",
  babelOptions: { filename: __filename },
  tests: {
    "generate actual shallow store implementation": {
      code: `
        import useStoreMacro from "../src/index.macro";

        const {
          count,
          decrementCount,
          incrementCount,
        } = useStoreMacro();
      `,
      snapshot: true,
    },
    "should fail if not a function call": {
      code: `
        import useStoreMacro from "../src/index.macro";

        const {
          count,
          decrementCount,
          incrementCount,
        } = useStoreMacro;
      `,
      error: "useStoreMacro only supports function calls.",
      snapshot: true,
    },
    "should support object destructuring assignment": {
      code: `
        import useStoreMacro from "../src/index.macro";

        const {
          count,
          decrementCount: decrement,
          incrementCount: increment,
        } = useStoreMacro();
      `,
      snapshot: true,
    },
  }
})
