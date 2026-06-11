import type { Equal, Expect, Debug } from "@type-challenges/utils";

type Foo = {
  name: string;
  age: string;
};
type Bar = {
  name: string;
  age: string;
  gender: number;
};
type Coo = {
  name: string;
  gender: number;
};

// type Diff<T, U> = {
//   [K in keyof T | keyof U as K extends keyof T
//     ? K extends keyof U
//       ? never
//       : K
//     : K]: K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
// };

// 更简洁的写法：
// keyof T | keyof U => keyof (T & U)
// & 操作符会把两个对象类型中重叠的类型合并
// type T1 = Debug<Foo & Bar>;
// K extends keyof T & keyof U
// type K = string | number; type U = string;
// type T2 = K & U; // string
// 两个联合类型通过 & 能
type Diff<T, U> = {
  [K in keyof (T & U) as K extends keyof T & keyof U
    ? never
    : K]: K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

type cases = [
  Expect<Equal<Diff<Foo, Bar>, { gender: number }>>,
  Expect<Equal<Diff<Bar, Foo>, { gender: number }>>,
  Expect<Equal<Diff<Foo, Coo>, { age: string; gender: number }>>,
  Expect<Equal<Diff<Coo, Foo>, { age: string; gender: number }>>,
];
