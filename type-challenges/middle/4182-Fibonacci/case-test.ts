import type { Equal, Expect } from "@type-challenges/utils";

// The sequence starts: 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ...\
// fibonacci 的 js 代码实现
// const fibonacci = (num) => {
//   if (num === 1 || num === 2) {
//     return 1;
//   }
//   return fibonacci(num - 1) + fibonacci(num - 2);
// };

type CreateArray<
  T extends number,
  V,
  A extends V[] = [],
> = A["length"] extends T ? A : CreateArray<T, V, [...A, V]>;

// 非波那契序列的计算给则 f(n) = f(n-1) + f(n-2)
// 第一项和第二项都是 1，那么我们考虑开始为第三项进行计算
// 先计算值为 3 的时候，剩下怎么继续递归调用还没处理
// T 为要计算的值
// N 为计数器，初始值直接放入三个值
// N_1 是 n - 1 的值
// N_2 是 n - 2 的值
// 最后如果 N 的长度满足 T，那就返回 N_1 和 N_2 的值
// type Fibonacci<
//   T extends number,
//   N extends 1[] = [1, 1, 1],
//   N_1 extends 1[] = [1],
//   N_2 extends 1[] = [1],
// > = T extends 1 | 2
//   ? 1
//   : N["length"] extends T
//     ? [...N_1, ...N_2]["length"]
//     : Fibonacci<T, N, N_1, N_2>;

// 上面的处理只能解决 3 的情况，那么 4 5 6 ... 的情况怎么处理呢？
// 那就需要进行递归调用，如何进行递归呢？
// N 进行下一次递归就加一个值
// 下一次递归后 N_2 就变成了 N_1，N_1 就变成了 N（又基于 f(n) = f(n-1) + f(n-2)，即目前 N_1 + N_2 的值）
type Fibonacci<
  T extends number,
  N extends 1[] = [1, 1, 1],
  N_1 extends 1[] = [1],
  N_2 extends 1[] = [1],
> = T extends 1 | 2
  ? 1
  : N["length"] extends T
    ? [...N_1, ...N_2]["length"]
    : Fibonacci<T, [...N, 1], [...N_1, ...N_2], N_1>;

type T1 = Fibonacci<3>; // 2
type T2 = Fibonacci<4>; // 4

type cases = [Expect<Equal<Fibonacci<3>, 2>>, Expect<Equal<Fibonacci<8>, 21>>];
