import type { Equal, Expect } from "@type-challenges/utils";

// 对于 union 联合类型，T extends any 这样就会触发遍历，会将每一个值都去匹配，然后最终的值进行 union 联合
type MyExclude<T, U> = T extends U ? never : T;

type Test = MyExclude<"a" | "b" | "c", "a">
type T1 = Exclude<"a" | "b" | "c", "a">

type cases = [
  Expect<Equal<MyExclude<"a" | "b" | "c", "a">, Exclude<"a" | "b" | "c", "a">>>,
  Expect<
    Equal<
      MyExclude<"a" | "b" | "c", "a" | "b">,
      Exclude<"a" | "b" | "c", "a" | "b">
    >
  >,
  Expect<
    Equal<
      MyExclude<string | number | (() => void), Function>,
      Exclude<string | number | (() => void), Function>
    >
  >
];

type a = Exclude<"a" | "b", "a">;
