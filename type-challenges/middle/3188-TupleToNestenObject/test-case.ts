import type { Equal, Expect } from "@type-challenges/utils";

// 先分析最后一个 case ，如果为空数组直接返回 value，那么在使用数组匹配的时候如果没有匹配上就直接返回 value 即可
// 1. 使用数组匹配，一个一个去进行匹配，然后构造一个对象，记得使用 K in F，因为只有字面量类型或者 symbol 才能做对象的 key
// 2. 对于新对象的 value 使用递归调用去执行即可
type TupleToNestedObject<T extends any[], V> = T extends [
  infer F extends string,
  ...infer R,
]
  ? {
      [K in F]: TupleToNestedObject<R, V>;
    }
  : V;

type T1 = TupleToNestedObject<["a"], string>;
type T2 = TupleToNestedObject<["a", "b"], number>;
type T3 = TupleToNestedObject<["a", "b", "c"], boolean>;
type T4 = TupleToNestedObject<[], boolean>;

// const fn = (a, b) => {
//   if (a.length === 0) return b;
//   let key = a.shift();
//   return {
//     [key]: fn(a, b),
//   };
// };
// let a = fn(["a"], "1");

type cases = [
  Expect<Equal<TupleToNestedObject<["a"], string>, { a: string }>>,
  Expect<Equal<TupleToNestedObject<["a", "b"], number>, { a: { b: number } }>>,
  Expect<
    Equal<
      TupleToNestedObject<["a", "b", "c"], boolean>,
      { a: { b: { c: boolean } } }
    >
  >,
  Expect<Equal<TupleToNestedObject<[], boolean>, boolean>>,
];
