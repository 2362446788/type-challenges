import type { Equal, Expect } from "@type-challenges/utils";

// 使用字符串匹配的方式获取第一个字符，然后再把结果使用 union 去递归调用 R 的结果，最后因为 "" 需要返回 never，那么不满足字符串匹配的话就直接返回 never
type StringToUnion<S extends string> = S extends `${infer F}${infer R}`
  ? F | StringToUnion<R>
  : never;

type T1 = StringToUnion<'hello'>;

type cases = [
  Expect<Equal<StringToUnion<"">, never>>,
  Expect<Equal<StringToUnion<"t">, "t">>,
  Expect<Equal<StringToUnion<"hello">, "h" | "e" | "l" | "l" | "o">>,
  Expect<
    Equal<
      StringToUnion<"coronavirus">,
      "c" | "o" | "r" | "o" | "n" | "a" | "v" | "i" | "r" | "u" | "s"
    >
  >,
];
