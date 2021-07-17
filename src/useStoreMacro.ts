import { addNamed as addImportDeclaration } from "@babel/helper-module-imports";
import { MacroError, MacroHandler } from "babel-plugin-macros";

type MacroConfig = {
  importName: string,
  importSource: string,
}

const useStoreMacro: MacroHandler = ({ references, state, babel, config }) => {
  const defaultImport = references.default || [];
  const t = babel.types;

  if (!config)
    throw new MacroError("Macro config must be provided in package.json");

  const macroConfig: MacroConfig = config.useStore;

  defaultImport.forEach(referencePath => {
    const functionCallPath = referencePath.parentPath;

    if (functionCallPath?.type !== "CallExpression")
      throw new MacroError("useStoreMacro only supports function calls.")

    addImportDeclaration(
      referencePath,
      macroConfig.importName,
      macroConfig.importSource,
      {
        nameHint: `_${macroConfig.importName}`
      });

    const idPath = functionCallPath.parentPath?.get("id");

    if (!t.isObjectPattern(idPath))
      throw new MacroError("useStoreMacro only supports object destructuring.");

    const deconstructedProps = (idPath as any).node
      .properties
      .map((x: any) => x.value.name);

    const useStoreParameters = deconstructedProps
      .map((x: any) => `${x}: s.${x}`)
      .join(",");

    const useShallowStoreNode = babel.template.expression.ast(`
      _${macroConfig.importName}((s) => ({
        ${useStoreParameters}
      }))
    `);

    functionCallPath?.replaceWith(useShallowStoreNode);
  });
}

export default useStoreMacro;
