// type MyReturnType<T extends Function> = T extends (
//   ...args: any[]
// ) => infer ReturnType
//   ? ReturnType
//   : never;

// type MyReturnType<T extends (...args: any) => any> = T extends (...args: any[]) => infer R ? R : never;
// type MyReturnType<T extends (...args: any) => any> = T extends (...args: any[]) => infer R ? R : never;
type MyReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : never;
