import { createMacro } from "babel-plugin-macros";
import useStore from "./useStoreMacro";

const useStoreMacro: ReturnType<typeof Object> = createMacro(useStore, {
  configName: "zustandMacro"
});

export default useStoreMacro;
