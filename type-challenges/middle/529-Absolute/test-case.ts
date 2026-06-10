import type { Equal, Expect } from "@type-challenges/utils";

// Absolute 需要能接受任意合法的 number / bigint 类型，那么我们则要考虑到这些情况：

// 普通数字：123
// 分组数字：1_2345（等价于 12345）
// 十六进制：0xF123
// 八进制：0o123
// 科学计数法：1e10
// bigint：123n（末尾有 n）
// 看着很麻烦，需要考虑这么多种情况。不过在 TypeScript 中，通过模板字符串将数组转换为字符串时，编译器会自动进行转换：

// type NumToStr<
//   T extends number | bigint
// > = `${T}`

// type A = NumToStr<123> // "123"
// type B = NumToStr<1_2345> // "12345"
// type C = NumToStr<0xF123> // "61731"
// type D = NumToStr<0o123> // 83
// type E = NumToStr<1e5> // "100000"
// type F = NumToStr<123n> // 123
// 既然编译器已经帮我们做了最自动转换，那么我们仅仅需要考虑将负数转换为正数既可。

// ts中也能直接将number转成string，和js类似
// 直接把 T 放在字符串模版中，这样就自动解析了number转string
// 然后使用字符串匹配，- 匹配，剩余的字符串匹配到 R，把 R 转成字符串返回
// 如果没有匹配上返回 T 的字符串形式
type Absolute<T extends string | number | bigint> = `${T}` extends `-${infer R}`
  ? `${R}`
  : `${T}`;

type cases = [
  Expect<Equal<Absolute<0>, "0">>,
  Expect<Equal<Absolute<-0>, "0">>,
  Expect<Equal<Absolute<10>, "10">>,
  Expect<Equal<Absolute<-5>, "5">>,
  Expect<Equal<Absolute<"0">, "0">>,
  Expect<Equal<Absolute<"-0">, "0">>,
  Expect<Equal<Absolute<"10">, "10">>,
  Expect<Equal<Absolute<"-5">, "5">>,
  Expect<Equal<Absolute<-1_000_000n>, "1000000">>,
  Expect<Equal<Absolute<9_999n>, "9999">>,
];
