import type { Equal, Expect } from "@type-challenges/utils";

type Case1 = AppendArgument<(a: number, b: string) => number, boolean>;
type Result1 = (a: number, b: string, x: boolean) => number;

type Case2 = AppendArgument<() => void, undefined>;
type Result2 = (x: undefined) => void;

// 1、将 Fn 推导出来，获取到 args 和返回值
// 2、将 V 添加到 Fn 中即可
type AppendArgument<Fn extends Function, V> = Fn extends (
  ...args: infer P
) => infer R
  ? (...args: [...P, V]) => R
  : never;

type cases = [Expect<Equal<Case1, Result1>>, Expect<Equal<Case2, Result2>>];
