import type { Equal, Expect } from "@type-challenges/utils";

interface Todo1 {
  title: string;
  description: string;
  completed: boolean;
  meta: {
    author: string;
  };
}

type List = [1, 2, 3];

// 可以使用 -readonly 将 readonly 标识给删除
type Mutable<T extends object> = {
  -readonly [K in keyof T]: T[K];
};

type cases = [
  Expect<Equal<Mutable<Readonly<Todo1>>, Todo1>>,
  Expect<Equal<Mutable<Readonly<List>>, List>>,
];

type errors = [
  // @ts-expect-error
  Mutable<"string">,
  // @ts-expect-error
  Mutable<0>,
];
