import type { Equal, Expect } from "@type-challenges/utils";

// 优先遍历整个 T，然后在 key 的判断中判断是否 extends U，如果不满足就设置为 never，这样就会排除掉这个 key
type MyOmit<T, U extends keyof T> = {
  [K in keyof T as K extends U ? never : K]: T[K];
}

type Test = MyOmit<Todo, "description">;
type T1 = Omit<Todo, "description">;

type cases = [
  Expect<Equal<Expected1, MyOmit<Todo, "description">>>,
  Expect<Equal<Expected2, MyOmit<Todo, "description" | "completed">>>
];

// @ts-expect-error
type error = MyOmit<Todo, "description" | "invalid">;


// type MyOmit1<T, U extends keyof T> = {
//   [Key in keyof T as Key extends U ? never : Key]: T[Key]
// }
// // @ts-expect-error
// type error1 = MyOmit1<Todo, "description" | "invalid">;

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

interface Expected1 {
  title: string;
  completed: boolean;
}

interface Expected2 {
  title: string;
}
