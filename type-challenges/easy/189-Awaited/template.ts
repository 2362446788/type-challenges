// type MyAwaited<T extends Promise<unknown>> = T extends Promise<infer X>
//   ? X extends Promise<unknown>
//     ? MyAwaited<X>
//     : X
//   : T;
// type MyAwaited<T extends Promise<unknown>> = T extends Promise<infer X>
//   ? X extends Promise<unknown>
//   ? MyAwaited<X>
//   : X
//   : T;
type MyAwaited<T extends Promise<unknown>> = T extends Promise<infer K>
  ? K extends Promise<unknown>
    ? MyAwaited<K>
    : K
  : never;
