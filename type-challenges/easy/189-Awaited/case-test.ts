import type { Equal, Expect } from "@type-challenges/utils";

// 通过 extends 和 infer 来约束推导泛型的值，然后再递归调用
type MyAwaited<T extends Promise<any>> =
  T extends Promise<infer R>
    ? R extends Promise<any>
      ? MyAwaited<R>
      : R
    : never;

type X = Promise<string>;
type Y = Promise<{ field: number }>;
type Z = Promise<Promise<string | number>>;

type cases = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>,
];

// @ts-expect-error
type error = MyAwaited<number>;
