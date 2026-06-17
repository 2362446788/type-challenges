import type { Equal, Expect } from "@type-challenges/utils";

type Reverse<T extends any[]> = T extends [infer F, ...infer R]
  ? [...Reverse<R>, F]
  : [];

// 使用函数约束入参，然后使用函数的结构进行推导入参和返回值
// 将返回值进行反转，然后重新构造一个新的函数
type FlipArguments<T extends Function> = T extends (...args: infer A) => infer R
  ? (...args: Reverse<A>) => R
  : never;

type T1 = FlipArguments<() => boolean>;

type cases = [
  Expect<Equal<FlipArguments<() => boolean>, () => boolean>>,
  Expect<
    Equal<FlipArguments<(foo: string) => number>, (foo: string) => number>
  >,
  Expect<
    Equal<
      FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void>,
      (arg0: boolean, arg1: number, arg2: string) => void
    >
  >,
];

type errors = [
  // @ts-expect-error
  FlipArguments<"string">,
  // @ts-expect-error
  FlipArguments<{ key: "value" }>,
  // @ts-expect-error
  FlipArguments<["apple", "banana", 100, { a: 1 }]>,
  // @ts-expect-error
  FlipArguments<null | undefined>,
];
