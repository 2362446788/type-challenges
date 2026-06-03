import type { Equal, Expect } from "@type-challenges/utils";

// 使用条件类型判断就可以做到
type If<C extends boolean, T, F> = C extends true ? T : F;

type cases = [
  Expect<Equal<If<true, "a", "b">, "a">>,
  Expect<Equal<If<false, "a", 2>, 2>>
];

// @ts-expect-error
type error = If<null, "a", "b">;
