import type { Equal, Expect } from "@type-challenges/utils";

// 直接使用字符串的前缀匹配即可
type EndsWith<S extends string, E extends string> = S extends `${string}${E}` ? true : false;

type cases = [
  Expect<Equal<EndsWith<"abc", "bc">, true>>,
  Expect<Equal<EndsWith<"abc", "abc">, true>>,
  Expect<Equal<EndsWith<"abc", "d">, false>>
];
