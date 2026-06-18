import type { Equal, Expect, NotEqual } from "@type-challenges/utils";

// 要实现属性和值进行翻转
// 约束入参 T 的值为一个对象
// 遍历获取所有的属性，然后通过 as 重映射将值映射为属性，属性映射为值
// 但是这样对于值为 true 的就没办法通过，因为 boolean 类型不能作为对象的属性
// type Flip<T extends Record<string, any>> = {
//   [K in keyof T as T[K]]: K;
// };
// 因此需要将 T[K] 变成一个字符串，直接使用模板字符串包裹即可
type Flip<T extends Record<string, any>> = {
  [K in keyof T as `${T[K]}`]: K;
};

type T1 = Flip<{ pi: 3.14; bool: true }>;

type cases = [
  Expect<Equal<{ a: "pi" }, Flip<{ pi: "a" }>>>,
  Expect<NotEqual<{ b: "pi" }, Flip<{ pi: "a" }>>>,
  Expect<Equal<{ 3.14: "pi"; true: "bool" }, Flip<{ pi: 3.14; bool: true }>>>,
  Expect<
    Equal<{ val2: "prop2"; val: "prop" }, Flip<{ prop: "val"; prop2: "val2" }>>
  >,
];
