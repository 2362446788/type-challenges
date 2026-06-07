import type { Equal, Expect } from "@type-challenges/utils";

// 直接使用模版字符串的匹配机制将左边的 ""、\n、\t 匹配上，剩余的推导到 R 中，然后继续递归调用，最后不满足了直接返回 T
type TrimLeft<T> = T extends `${" " | "\n" | "\t"}${infer R}` ? TrimLeft<R> : T;

type cases = [
  Expect<Equal<TrimLeft<"str">, "str">>,
  Expect<Equal<TrimLeft<" str">, "str">>,
  Expect<Equal<TrimLeft<"     str">, "str">>,
  Expect<Equal<TrimLeft<"     str     ">, "str     ">>,
  Expect<Equal<TrimLeft<"   \n\t foo bar ">, "foo bar ">>,
  Expect<Equal<TrimLeft<"">, "">>,
  Expect<Equal<TrimLeft<" \n\t">, "">>,
];
