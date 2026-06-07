import type { Equal, Expect } from "@type-challenges/utils";

// 先使用 params: readonly [...T] 获取对应的元组信息
// 例如
//    promiseAllTest1 => [1, 2, 3]
//    promiseAllTest2 => [1, 2, Promise<number>]
//    promiseAllTest3 => [number, number, Promise<number>]
// 如果使用 params: T 的话获取到的就是一个数组，而且不支持 params: readonly T 语法，对于 as const 的变量能识别为元组，其他的就只能识别为数组
// 例如
//    promiseAllTest1 => readonly [1, 2, 3]
//    promiseAllTest2 => readonly [1, 2, Promise<number>]
//    promiseAllTest3 => (number | Promise<number>)[]
// 接着结果需要是 Promise，然后使用元组进行遍历，判断里面是否是 Promise，是的话获取 Promise 的值，如果嵌套多层的话可以使用 Awaited
declare function PromiseAll<T extends readonly any[]>(
  params: readonly [...T],
  // params: T,
): Promise<{
  [K in keyof T]: MyAwaited<T[K]>;
}>;

// 通过 extends 和 infer 来约束推导泛型的值，然后再递归调用
type MyAwaited<T extends Promise<any>> =
  T extends Promise<infer R> ? (R extends Promise<any> ? MyAwaited<R> : R) : T;

const promiseAllTest1 = PromiseAll([1, 2, 3] as const);
const promiseAllTest2 = PromiseAll([1, 2, Promise.resolve(3)] as const);
const promiseAllTest3 = PromiseAll([1, 2, Promise.resolve(3)]);

type cases = [
  Expect<Equal<typeof promiseAllTest1, Promise<[1, 2, 3]>>>,
  Expect<Equal<typeof promiseAllTest2, Promise<[1, 2, number]>>>,
  Expect<Equal<typeof promiseAllTest3, Promise<[number, number, number]>>>,
];
