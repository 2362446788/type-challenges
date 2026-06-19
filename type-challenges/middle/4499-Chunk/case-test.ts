import type { Equal, Expect } from "@type-challenges/utils";

// 借用 U 用于存储切分的值，O 用于存储最终的值
// 1. 一项一项的遍历数组，然后把每一项放到切分的 U 中
// 2. 判断此时 U 是否已经存满了
//    存满了：那么递归剩余的数据，把这次遍历到的值新增加到 U 中，然后把 U 放到 O 中
//    没存满：也继续递归剩余的数据，只是这次遍历的值是添加到已经的 U 中，O 结果不用改变
// 3. 最后可能存在 U 中有数据但是又没有存满的情况，所以需要判断是否还有值，如果有还需要把其添加到结果 O 中进行返回
type Chunk<
  T extends any[],
  V extends number,
  U extends any[] = [],
  O extends any[] = [],
> = T extends [infer F, ...infer R]
  ? U["length"] extends V
    ? Chunk<R, V, [F], [...O, U]>
    : Chunk<R, V, [...U, F], O>
  : U extends []
    ? O
    : [...O, U];

type T1 = Chunk<[1, 2, 3], 1>;

type cases = [
  Expect<Equal<Chunk<[], 1>, []>>,
  Expect<Equal<Chunk<[1, 2, 3], 1>, [[1], [2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3], 2>, [[1, 2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 2>, [[1, 2], [3, 4]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 5>, [[1, 2, 3, 4]]>>,
  Expect<Equal<Chunk<[1, true, 2, false], 2>, [[1, true], [2, false]]>>,
];
