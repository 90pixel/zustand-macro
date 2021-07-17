import { createMacro } from "babel-plugin-macros";
import useStore from "./useStoreMacro";
var useStoreMacro = createMacro(useStore, {
    configName: "zustandMacro"
});
export default useStoreMacro;
