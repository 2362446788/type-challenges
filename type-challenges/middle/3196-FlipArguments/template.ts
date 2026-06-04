// 1、重新构造一个数组
// 2、递归数组，传递遍历到得值
type ReverseOne<T extends unknown[], U extends unknown[] = []> = T extends [infer F, ...infer R] ? ReverseOne<R, [F, ...U]> : U;

// 1、直接递归返回值
// type ReverseOne<T> = T extends [infer Head, ...infer Rest] ? [...Reverse<Rest>, Head] : T;

type FlipArguments<T extends (...args: any[]) => any> = T extends (...args: infer G) => infer R ? (...args: ReverseOne<G>) => R : T;