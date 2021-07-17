declare module "@babel/helper-module-imports" {
  export function addNamed(path: any, importName: string, importSource: string, options?: {
    nameHint: string;
  });
}
