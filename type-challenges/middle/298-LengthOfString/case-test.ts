import type { Equal, Expect } from "@type-challenges/utils";

// 直接使用字符串匹配是没办法做到计数的，一般计算都是使用数组，然后使用 length 来获取数量
// 因此可以增加一个 arr 类型存储，然后每一次匹配一个字符，剩余的字符递归调用的时候传递，并且在递归的时候把一个数据添加到 arr 中
type LengthOfString<
  T,
  arr extends any[] = [],
> = T extends `${infer F}${infer R}`
  ? LengthOfString<R, [...arr, F]>
  : arr["length"];

type cases = [
  Expect<Equal<LengthOfString<"">, 0>>,
  Expect<Equal<LengthOfString<"kumiko">, 6>>,
  Expect<Equal<LengthOfString<"reina">, 5>>,
  Expect<Equal<LengthOfString<"Sound! Euphonium">, 16>>,
];
