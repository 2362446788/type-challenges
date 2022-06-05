type MyParameters<T extends (...args: any[]) => any> = T extends (
  ...args: infer Parameters
) => any
  ? Parameters
  : never;
