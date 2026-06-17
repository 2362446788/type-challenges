import type { Equal, Expect } from "@type-challenges/utils";

// 使用 union 类型在字符串中也会触发分布式计算的能力
// 例如：T = 'a' V = 'b' | 'c'
// U = `${T}${V}`
type T = "a";
type V = "b" | "c";
type U = `${T}${V}`; // 'ab' | 'ac'
type BEM<
  T extends string,
  V extends string[],
  U extends string[],
> = `${T}${V["length"] extends 0 ? "" : `__${V[number]}`}${U["length"] extends 0 ? "" : `--${U[number]}`}`;

type T1 = BEM<"btn", ["price"], []>;
type T2 = BEM<"btn", ["price"], ["warning", "success"]>;
type T3 = BEM<"btn", [], ["small", "medium", "large"]>;

type cases = [
  Expect<Equal<BEM<"btn", ["price"], []>, "btn__price">>,
  Expect<
    Equal<
      BEM<"btn", ["price"], ["warning", "success"]>,
      "btn__price--warning" | "btn__price--success"
    >
  >,
  Expect<
    Equal<
      BEM<"btn", [], ["small", "medium", "large"]>,
      "btn--small" | "btn--medium" | "btn--large"
    >
  >,
];
