import type { Equal, Expect } from "@type-challenges/utils";

// 前置知识点，如何判断一个类型是 union 类型
type IsUnion<A, B = A> = A extends A ? ([B] extends [A] ? false : true) : never;
type U1 = IsUnion<"a" | "b" | "c">; // true
type U2 = IsUnion<["a", "b", "c"]>; // false
// 为什么上面的 IsUnion 就能判断 union 了呢？先来看 union 触发的分布式条件，在 ts 中，如果在条件判断中，左边出现了 union 类型，无论右边是什么，都会触发分布式计算，将每一个值进行计算，最后返回一个新的 union 类型
type TestUnion<A, B = A> = A extends A ? { a: A; b: B } : never;
// 如下面这个条件，返回的 a 是每一个值，而 b 是一个整体的值，因为 A extends A 触发了分布式计算
type TestUnionResult = TestUnion<"a" | "b" | "c">;
// {
//     a: "a";
//     b: "a" | "b" | "c";
// } | {
//     a: "b";
//     b: "a" | "b" | "c";
// } | {
//     a: "c";
//     b: "a" | "b" | "c";
// }
// 因此利用这个条件，就先让 A extends A 触发分布式，然后使用 [B] extends [A] ? false : true 将其作为一个整理来处理，假如 A 是上面例子中的 union 类型，那么就会出现 ["a" | "b" | "c"] extends ["a"]，这样就满足了，会走到 true，如果不是 union 类型，例如 A = "a"，那么判断条件就是 "a" extends "a" 就满足返回 false

// 1. 先使用 union 的特性触发分布式计算
// type Permutation<T> = T extends any ? [T] : [];
// type T1 = Permutation<"A" | "B" | "C">; // ["A"] | ["B"] | ["C"]

// 2. 紧接着需要处理额外的其他数据，怎么获取其他数据呢？通过 Exclude 来去除，但是这里 T 已经变成了一个具体的类型了，所以还需要一个其他类型来存储一开始传递进来的类型，让其等于 T
//
// type Permutation<T, U = T> = T extends any ? [T, Exclude<U, T>] : [];
// type T1 = Permutation<"A" | "B" | "C">; // ["A", "B" | "C"] | ["B", "A" | "C"] | ["C", "A" | "B"]

// 3. Exclude<U, T> 剩余的类型是一个 union，可以看成 "B" | "C" 需要进行处理了，所以递归调用 Permutation
// type Permutation<T, U = T> = T extends any
//   ? [T, Permutation<Exclude<U, T>>]
//   : [];
// type T1 = Permutation<"A" | "B" | "C">; // ["A", ["B", ["C", never]] | ["C", ["B", never]]] | ["B", ["A", ["C", never]] | ["C", ["A", never]]] | ["C", ["A", ["B", never]] | ["B", ["A", never]]]

// 4. 此时变成了这样的 ["A", ["B", ["C", never]]，也就是后面的递归调用都没有解构出来造成的，所以使用解构来处理
// type Permutation<T, U = T> = T extends any
//   ? [T, ...Permutation<Exclude<U, T>>]
//   : [];
// type T1 = Permutation<"A" | "B" | "C">; // never

// 5. 解构之后发现变成 never 了，说明解构出来了，只是结果中有 never，所以其他的 union 类型都不展示了
// 既然这样，那就需要加上一个前置判断条件，如果匹配上了 never，需要返回一个空数组，这里的判断条件就不能触发分布式计算了，所以需要使用 [T] extends [never]
type Permutation<T, U = T> = [T] extends [never]
  ? []
  : T extends any
    ? [T, ...Permutation<Exclude<U, T>>]
    : [];
type T1 = Permutation<"A" | "B" | "C">;

type cases = [
  Expect<Equal<Permutation<"A">, ["A"]>>,
  Expect<
    Equal<
      Permutation<"A" | "B" | "C">,
      | ["A", "B", "C"]
      | ["A", "C", "B"]
      | ["B", "A", "C"]
      | ["B", "C", "A"]
      | ["C", "A", "B"]
      | ["C", "B", "A"]
    >
  >,
  Expect<
    Equal<
      Permutation<"B" | "A" | "C">,
      | ["A", "B", "C"]
      | ["A", "C", "B"]
      | ["B", "A", "C"]
      | ["B", "C", "A"]
      | ["C", "A", "B"]
      | ["C", "B", "A"]
    >
  >,
  Expect<Equal<Permutation<boolean>, [false, true] | [true, false]>>,
  Expect<Equal<Permutation<never>, []>>,
];
