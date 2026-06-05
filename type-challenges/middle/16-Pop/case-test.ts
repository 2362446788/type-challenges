import type { Equal, Expect } from '@type-challenges/utils'

// 数组推导的简单操作，将最后一个元素推导出来，前面的元素通过剩余运算符推导为一个数组，直接返回即可
type Pop<T extends any[]> = T extends [...infer F, infer R] ? F : never;

type cases = [
  Expect<Equal<Pop<[3, 2, 1]>, [3, 2]>>,
  Expect<Equal<Pop<['a', 'b', 'c', 'd']>, ['a', 'b', 'c']>>,
]