type MyReturnType<T extends Function> = T extends (
  ...args: any[]
) => infer ReturnType
  ? ReturnType
  : never;
