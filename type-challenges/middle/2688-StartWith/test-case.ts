import type { Equal, Expect } from "@type-challenges/utils";

// 直接使用字符串的前缀匹配即可
type StartsWith<S extends string, F extends string> = S extends `${F}${string}` ? true : false;

type cases = [
  Expect<Equal<StartsWith<"abc", "ac">, false>>,
  Expect<Equal<StartsWith<"abc", "ab">, true>>,
  Expect<Equal<StartsWith<"abc", "abcd">, false>>,
  Expect<Equal<StartsWith<"abc", "">, true>>,
  Expect<Equal<StartsWith<"abc", " ">, false>>
];
