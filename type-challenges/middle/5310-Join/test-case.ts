import type { Equal, Expect } from "@type-challenges/utils";

// 复杂方法，需要处理 V 为空字符串的情况
// type Join<
//   T extends any[],
//   L extends string | number,
//   V extends string = "",
// > = T["length"] extends 1
//   ? V extends ""
//     ? `${T[0]}`
//     : `${V}${L}${T[0]}`
//   : T extends [infer F, ...infer R]
//     ? Join<R, L, V extends "" ? `${F & string}` : `${V}${L}${F & string}`>
//     : V;

// 简单方式
// 判断一个数组是不是只有一个数据，可以使用 T extends [infer F extends string, ...infer R,] 然后根据 R extends [] 来进行判断或者 R['length'] extends 0 来处理
type Join<T extends any[], L extends string | number> = T extends [
  infer F extends string,
  ...infer R,
]
  ? // ? R extends []
    R["length"] extends 0
    ? `${F}`
    : `${F}${L}${Join<R, L>}`
  : never;

type T1 = Join<["2", "2", "2"], 1>;

type cases = [
  Expect<Equal<Join<["a", "p", "p", "l", "e"], "-">, "a-p-p-l-e">>,
  Expect<Equal<Join<["Hello", "World"], " ">, "Hello World">>,
  Expect<Equal<Join<["2", "2", "2"], 1>, "21212">>,
  Expect<Equal<Join<["o"], "u">, "o">>,
];
