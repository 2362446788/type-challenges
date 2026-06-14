import type { Equal, Expect, Debug } from "@type-challenges/utils";

interface User {
  name: string;
  age: number;
  address: string;
}

interface UserPartialName {
  name?: string;
  age: number;
  address: string;
}

interface UserPartialNameAndAge {
  name?: string;
  age?: number;
  address: string;
}

// 1. 把非 U 的 key 过滤出来正常返回
// type PartialByKeys<T, U = keyof T> = {
//   [K in keyof T as K extends U ? never : K]: T[K];
// }

// 2. 再把 U 里面的 key 过滤出来添加 ?
// type PartialByKeys<T, U = keyof T> = {
//   [K in keyof T as K extends U ? never : K]: T[K];
// } & {
//   [K in keyof T as K extends U ? K : never]?: T[K];
// }

// 3. 这样还不能满足 case，需要将其计算出来，可以借用 Debug
type PartialByKeys<T, U = keyof T> = Debug<{
  [K in keyof T as K extends U ? never : K]: T[K];
} & {
  [K in keyof T as K extends U ? K : never]?: T[K];
}>

// 更简易的写法
// type PartialByKeys<T, U = keyof T> = Debug<Omit<T, U & keyof T> & Partial<Pick<T, U & keyof T>>>;

type T1 = Debug<PartialByKeys<User, "name" | "unknown">>;

type cases = [
  Expect<Equal<PartialByKeys<User, "name">, UserPartialName>>,
  Expect<Equal<PartialByKeys<User, "name" | "unknown">, UserPartialName>>,
  Expect<Equal<PartialByKeys<User, "name" | "age">, UserPartialNameAndAge>>,
  Expect<Equal<PartialByKeys<User>, Partial<User>>>
];
