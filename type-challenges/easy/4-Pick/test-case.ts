import { Equal, Expect } from "@type-challenges/utils";

// 使用映射类型遍历目标 union 联合类型，最后输出
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// Pick 的另一种写法使用重映射
// type MyPick<T, K extends keyof T> = {
//   [P in keyof T as P extends K ? P : never]: T[P];
// };

type T1 = Pick<Todo, "title">;

type cases = [
  Expect<Equal<Expected1, MyPick<Todo, "title">>>,
  Expect<Equal<Expected2, MyPick<Todo, "title" | "completed">>>,
  // @ts-expect-error
  MyPick<Todo, "title" | "completed" | "invalid">,
];

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

interface Expected1 {
  title: string;
}

interface Expected2 {
  title: string;
  completed: boolean;
}
