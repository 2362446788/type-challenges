import type { Equal, Expect } from "@type-challenges/utils";

// 采用三个字符串匹配的方式，前面的字符串匹配推导为 F，然后匹配上要修改的字符，后面的匹配推导为 R
// 结果将 From 改成 To 即可
type Replace<
  S extends string,
  From extends string,
  To extends string,
> = From extends ""
  ? S
  : S extends `${infer F}${From}${infer R}`
    ? `${F}${To}${R}`
    : S;

type cases = [
  Expect<Equal<Replace<"foobar", "bar", "foo">, "foofoo">>,
  Expect<Equal<Replace<"foobarbar", "bar", "foo">, "foofoobar">>,
  Expect<Equal<Replace<"foobarbar", "", "foo">, "foobarbar">>,
  Expect<Equal<Replace<"foobarbar", "bar", "">, "foobar">>,
  Expect<Equal<Replace<"foobarbar", "bra", "foo">, "foobarbar">>,
  Expect<Equal<Replace<"", "", "">, "">>,
];
