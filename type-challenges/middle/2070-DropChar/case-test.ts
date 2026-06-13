import type { Equal, Expect } from "@type-challenges/utils";

// 使用模版字符串匹配 F 和 R
// 然后返回新结果，判断 F 是否和 V 是相同字符
// 是：将其变成返回空字符
// 否：继续返回 F
// 后续的字符串进行递归调用
type DropChar<
  T extends string,
  V extends string,
> = T extends `${infer F}${infer R}`
  ? `${F extends V ? "" : F}${DropChar<R, V>}`
  : T;

type cases = [
  // @ts-expect-error
  Expect<Equal<DropChar<"butter fly!", "">, "butterfly!">>,
  Expect<Equal<DropChar<"butter fly!", " ">, "butterfly!">>,
  Expect<Equal<DropChar<"butter fly!", "!">, "butter fly">>,
  Expect<Equal<DropChar<"    butter fly!        ", " ">, "butterfly!">>,
  Expect<Equal<DropChar<" b u t t e r f l y ! ", " ">, "butterfly!">>,
  Expect<Equal<DropChar<" b u t t e r f l y ! ", "b">, "  u t t e r f l y ! ">>,
  Expect<Equal<DropChar<" b u t t e r f l y ! ", "t">, " b u   e r f l y ! ">>,
];
