import type { Alike, Expect } from "@type-challenges/utils";

// 找出 U 里面的所有值变成 readonly，然后在和剩余 key 的正常值进行 intersection 交叉类型处理
// type MyReadonly2<T, U extends keyof T = keyof T> = {
//   readonly [K in U]: T[K];
// } & {
//   [K in keyof T as K extends U ? never : K]: T[K];
// }

// 跟简易的写法，直接使用 Readonly + Pick 处理 readonly， Omit 处理剩余 key
type MyReadonly2<T, U extends keyof T = keyof T> = Readonly<Pick<T, U>> & Omit<T, U>;

type cases = [
  Expect<Alike<MyReadonly2<Todo1>, Readonly<Todo1>>>,
  Expect<Alike<MyReadonly2<Todo1, "title" | "description">, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, "title" | "description">, Expected>>
];

interface Todo1 {
  title: string;
  description?: string;
  completed: boolean;
}

interface Todo2 {
  readonly title: string;
  description?: string;
  completed: boolean;
}

interface Expected {
  readonly title: string;
  readonly description?: string;
  completed: boolean;
}
