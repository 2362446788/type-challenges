import type { Equal, Expect } from "@type-challenges/utils";

type Foo = {
  a: number;
  b: string;
};
type Bar = {
  b: number;
  c: boolean;
};

// 优先获取 T 和 U 的联合类型，然后遍历这个联合类型
// 如果 K 满足 keyof U 的话返回 U 的类型
// 如果 K 满足 keyof T 的话返回 T 的类型
// 都不满足返回 never
type Merge<T, U> = {
  [K in keyof T | keyof U]: K extends keyof U
    ? U[K]
    : K extends keyof T
      ? T[K]
      : never;
};

type cases = [
  Expect<
    Equal<
      Merge<Foo, Bar>,
      {
        a: number;
        b: number;
        c: boolean;
      }
    >
  >,
];
