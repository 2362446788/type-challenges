import type { Equal, Expect } from "@type-challenges/utils";

// 使用到的也是数组匹配的逻辑，匹配第一项 F，然后剩余项匹配到 R
// 判断 F 是否满足 U
// 满足的话就返回新数组包含 F，然后将剩余项递归调用返回 [F, ...Filter<R, U>]
// 不满足直接返回剩余项的递归调用 Filter<R, U>
// type Filter<T, U> = T extends [infer F, ...infer R]
//   ? F extends U
//     ? [F, ...Filter<R, U>]
//     : Filter<R, U>
//   : [];

// 还有一个使用对象存储的方法
// Filter 除了接受类型 F，U之外，接受一个 P 参数，默认为 []
// 使用数组匹配能力，如果不满足匹配条件就直接返回 P 存储的内容，满足条件就递归调用 Filter，然后传递的新数组是剩余项 R，接着判断 F 和 U 是否匹配，匹配上就把 F 添加到 P 的末尾，否则继续使用 P
type Filter<T, U, P extends any[] = []> = T extends [infer F, ...infer R]
  ? Filter<R, U, F extends U ? [...P, F] : P>
  : P;

type T1 = Filter<[0, 1, 2], 2>;

type Falsy = false | 0 | "" | null | undefined;

type cases = [
  Expect<Equal<Filter<[0, 1, 2], 2>, [2]>>,
  Expect<Equal<Filter<[0, 1, 2], 0 | 1>, [0, 1]>>,
  Expect<Equal<Filter<[0, 1, 2], Falsy>, [0]>>,
];
