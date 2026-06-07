import type { Equal, Expect } from "@type-challenges/utils";

// 类型 TrimLeft 的方法去匹配对应的字符串
type Trim<T> = T extends `${" " | "\n" | "\t"}${infer R}`
  ? Trim<R>
  : T extends `${infer F}${" " | "\n" | "\t"}`
    ? Trim<F>
    : T;

// 简化版
// 分别写 TrimLeft 和 TrimRight，Trim 直接调用即可
// type TrimLeft<T> = T extends `${" " | "\n" | "\t"}${infer R}` ? TrimLeft<R> : T;
// type TrimRight<T> = T extends `${infer F}${" " | "\n" | "\t"}`
//   ? TrimRight<F>
//   : T;
// type Trim<T> = TrimLeft<TrimRight<T>>;

type cases = [
  Expect<Equal<Trim<"str">, "str">>,
  Expect<Equal<Trim<" str">, "str">>,
  Expect<Equal<Trim<"     str">, "str">>,
  Expect<Equal<Trim<"str   ">, "str">>,
  Expect<Equal<Trim<"     str     ">, "str">>,
  Expect<Equal<Trim<"   \n\t foo bar \t">, "foo bar">>,
  Expect<Equal<Trim<"">, "">>,
  Expect<Equal<Trim<" \n\t ">, "">>,
];
