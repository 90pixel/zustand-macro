"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helper_module_imports_1 = require("@babel/helper-module-imports");
var babel_plugin_macros_1 = require("babel-plugin-macros");
var useStoreMacro = function (_a) {
    var references = _a.references, state = _a.state, babel = _a.babel, config = _a.config;
    var defaultImport = references.default || [];
    var t = babel.types;
    if (!config)
        throw new babel_plugin_macros_1.MacroError("Macro config must be provided in package.json");
    var macroConfig = config.useStore;
    defaultImport.forEach(function (referencePath) {
        var _a;
        var functionCallPath = referencePath.parentPath;
        if ((functionCallPath === null || functionCallPath === void 0 ? void 0 : functionCallPath.type) !== "CallExpression")
            throw new babel_plugin_macros_1.MacroError("useStoreMacro only supports function calls.");
        helper_module_imports_1.addNamed(referencePath, macroConfig.importName, macroConfig.importSource, {
            nameHint: "_" + macroConfig.importName
        });
        var idPath = (_a = functionCallPath.parentPath) === null || _a === void 0 ? void 0 : _a.get("id");
        if (!t.isObjectPattern(idPath))
            throw new babel_plugin_macros_1.MacroError("useStoreMacro only supports object destructuring.");
        var deconstructedProps = idPath.node
            .properties
            .map(function (x) { return x.value.name; });
        var useStoreParameters = deconstructedProps
            .map(function (x) { return x + ": s." + x; })
            .join(",");
        var useShallowStoreNode = babel.template.expression.ast("\n      _" + macroConfig.importName + "((s) => ({\n        " + useStoreParameters + "\n      }))\n    ");
        functionCallPath === null || functionCallPath === void 0 ? void 0 : functionCallPath.replaceWith(useShallowStoreNode);
    });
};
exports.default = useStoreMacro;
