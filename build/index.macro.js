"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var babel_plugin_macros_1 = require("babel-plugin-macros");
var useStoreMacro_1 = __importDefault(require("./useStoreMacro"));
var useStoreMacro = babel_plugin_macros_1.createMacro(useStoreMacro_1.default, {
    configName: "zustandMacro"
});
exports.default = useStoreMacro;
