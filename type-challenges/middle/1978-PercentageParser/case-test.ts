import type { Equal, Expect } from "@type-challenges/utils";

type Case0 = ["", "", ""];
type Case1 = ["+", "", ""];
type Case2 = ["+", "1", ""];
type Case3 = ["+", "100", ""];
type Case4 = ["+", "100", "%"];
type Case5 = ["", "100", "%"];
type Case6 = ["-", "100", "%"];
type Case7 = ["-", "100", ""];
type Case8 = ["-", "1", ""];
type Case9 = ["", "", "%"];
type Case10 = ["", "1", ""];
type Case11 = ["", "100", ""];

// 要匹配新的内容进行返回，就需要新增泛型来保存
// 递归方法
// S 保存传进来的值，V 保存匹配到的 "+" | "-"，T 保存匹配到的 "%"
// 1. 首先匹配后缀 %，把前面的剩余字符都匹配到 F 中，匹配到了就继续递归调用然后匹配剩余的字符，把匹配到的字符和剩余字符传递给 PercentageParser => PercentageParser<F, V, "%">
// 2. 如果没有匹配到 %，那么接着匹配 "+" | "-"，可以使用 infer extends 来约束首字符一定优先匹配这两者，并把内容推导到 O 中，剩余字符推导到 R 中，如果能匹配到就接着递归调用，把匹配到的字符和剩余字符传递给 PercentageParser => PercentageParser<R, O, T>
// 3. 最后递归匹配前缀和后缀了，直接返回最后的结果 [V, S, T]
// type PercentageParser<
//   S extends string,
//   V extends "+" | "-" | "" = "",
//   T extends "%" | "" = "",
// > = S extends `${infer F}%`
//   ? PercentageParser<F, V, "%">
//   : S extends `${infer O extends "+" | "-"}${infer R}`
//     ? PercentageParser<R, O, T>
//     : [V, S, T];

type T1 = PercentageParser<"+100%">;

// 另一种写法，分别写三个类型来匹配
// 匹配前缀
type PatchPrefix<S extends string> =
  S extends `${infer F extends "+" | "-"}${infer _}` ? F : "";
// 匹配后缀，一定要 S extends `${infer _}%` 来匹配到后缀
type PatchSuffix<S extends string> = S extends `${infer _}%` ? "%" : "";
// 把前缀和后缀都匹配上，然后剩余的字符推导到 R 中
type PatchMiddle<S extends string> =
  S extends `${PatchPrefix<S>}${infer R}${PatchSuffix<S>}` ? R : "";
// 直接匹配三个类型即可
type PercentageParser<S extends string> = [
  PatchPrefix<S>,
  PatchMiddle<S>,
  PatchSuffix<S>,
];

type T2 = PercentageParser<"+100%">;

type cases = [
  Expect<Equal<PercentageParser<"">, Case0>>,
  Expect<Equal<PercentageParser<"+">, Case1>>,
  Expect<Equal<PercentageParser<"+1">, Case2>>,
  Expect<Equal<PercentageParser<"+100">, Case3>>,
  Expect<Equal<PercentageParser<"+100%">, Case4>>,
  Expect<Equal<PercentageParser<"100%">, Case5>>,
  Expect<Equal<PercentageParser<"-100%">, Case6>>,
  Expect<Equal<PercentageParser<"-100">, Case7>>,
  Expect<Equal<PercentageParser<"-1">, Case8>>,
  Expect<Equal<PercentageParser<"%">, Case9>>,
  Expect<Equal<PercentageParser<"1">, Case10>>,
  Expect<Equal<PercentageParser<"100">, Case11>>,
];
