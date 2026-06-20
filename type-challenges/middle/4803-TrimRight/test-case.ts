import type { Equal, Expect } from "@type-challenges/utils";

// 使用字符串匹配，将右边的空字符都删除
type TrimRight<T extends string> = T extends `${infer R}${" " | "\n" | "\t"}`
  ? TrimRight<R>
  : T;

type cases = [
  Expect<Equal<TrimRight<"str">, "str">>,
  Expect<Equal<TrimRight<"str ">, "str">>,
  Expect<Equal<TrimRight<"str     ">, "str">>,
  Expect<Equal<TrimRight<"     str     ">, "     str">>,
  Expect<Equal<TrimRight<"   foo bar  \n\t ">, "   foo bar">>,
  Expect<Equal<TrimRight<"">, "">>,
  Expect<Equal<TrimRight<"\n\t ">, "">>,
];
