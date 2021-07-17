import { createMacro } from "babel-plugin-macros";
import useStore from "./useStoreMacro";

export type UseStoreMacroType = () => void;

const useStoreMacro: UseStoreMacroType = createMacro(useStore, {
  configName: "zustandMacro"
});

export default useStoreMacro;
