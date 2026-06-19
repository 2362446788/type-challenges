import type { Equal, Expect } from "@type-challenges/utils";

// type StringToUnion<S extends string> = S extends `${infer F}${infer R}`
//   ? F | StringToUnion<R>
//   : S;

type StringToUnion<S extends string> = S extends `${infer F}${infer R}`
  ? F | StringToUnion<R>
  : S;
type T1 = StringToUnion<"">; // ""
type T2 = StringToUnion<"A">; // "" | "A"
type T3 = StringToUnion<"AB">; // "" | "A" | "B"

// 最新版：只是用一个 AllCombinations 处理
// 将需要进行 union 的数据使用泛型保存到 T 和 U
// 每次遍历将获取到的第一个字符和剩余字符递归执行的结果进行联合
// 但是需要注意⚠️：递归调用需要排除当前 T 的值
type AllCombinations<
  S extends string,
  T extends string = StringToUnion<S>,
  U extends string = T,
> = T extends any ? T | `${T}${AllCombinations<S, Exclude<U, T>>}` : never;

type T4 = AllCombinations<"ABC">;

// 题目输入是字符串，输出是 union，字符串是没办法做分布式条件的，所以需要将 string 转为 union
// 1. 实现 Combination 来处理，接受字符串 union 类型，F 用来触发分布式计算，U 用来保存 F 的值，触发分布式计算之后，返回 F ｜ `${F}${Exclude<U, F>}`
// type Combination<F extends string, U extends string = F> = F extends any
//   ? F | `${F}${Exclude<U, F>}`
//   : "";
// type C = Combination<"" | "A" | "B" | "C">; // "" | "A" | "AB" | "B" | "C" | "AC" | "BA" | "BC" | "CA" | "CB"
// 2. F ｜ `${F}${Exclude<U, F>}` 这种方式只有剩余项和 F 的联合，没有触发剩余项自己的联合，不满足，所以需要递归来调用
// type Combination<F extends string, U extends string = F> = F extends any
//   ? F | `${F}${Combination<Exclude<U, F>>}`
//   : "";
// type C = Combination<"" | "A" | "B" | "C">; // "" | "A" | "AB" | "B" | "C" | "BC" | "CB" | "AC" | "ABC" | "ACB" | "CA" | "BA" | "BAC" | "BCA" | "CAB" | "CBA"
// type AllCombinations<S extends string> = Combination<StringToUnion<S>>;

type cases = [
  Expect<Equal<AllCombinations<"">, "">>,
  Expect<Equal<AllCombinations<"A">, "" | "A">>,
  Expect<Equal<AllCombinations<"AB">, "" | "A" | "B" | "AB" | "BA">>,
  Expect<
    Equal<
      AllCombinations<"ABC">,
      | ""
      | "A"
      | "B"
      | "C"
      | "AB"
      | "AC"
      | "BA"
      | "BC"
      | "CA"
      | "CB"
      | "ABC"
      | "ACB"
      | "BAC"
      | "BCA"
      | "CAB"
      | "CBA"
    >
  >,
  Expect<
    Equal<
      AllCombinations<"ABCD">,
      | ""
      | "A"
      | "B"
      | "C"
      | "D"
      | "AB"
      | "AC"
      | "AD"
      | "BA"
      | "BC"
      | "BD"
      | "CA"
      | "CB"
      | "CD"
      | "DA"
      | "DB"
      | "DC"
      | "ABC"
      | "ABD"
      | "ACB"
      | "ACD"
      | "ADB"
      | "ADC"
      | "BAC"
      | "BAD"
      | "BCA"
      | "BCD"
      | "BDA"
      | "BDC"
      | "CAB"
      | "CAD"
      | "CBA"
      | "CBD"
      | "CDA"
      | "CDB"
      | "DAB"
      | "DAC"
      | "DBA"
      | "DBC"
      | "DCA"
      | "DCB"
      | "ABCD"
      | "ABDC"
      | "ACBD"
      | "ACDB"
      | "ADBC"
      | "ADCB"
      | "BACD"
      | "BADC"
      | "BCAD"
      | "BCDA"
      | "BDAC"
      | "BDCA"
      | "CABD"
      | "CADB"
      | "CBAD"
      | "CBDA"
      | "CDAB"
      | "CDBA"
      | "DABC"
      | "DACB"
      | "DBAC"
      | "DBCA"
      | "DCAB"
      | "DCBA"
    >
  >,
];
