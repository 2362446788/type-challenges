import type { Equal, Expect } from "@type-challenges/utils";

// 直接使用 T[number] 即可将元组的内容变成联合类型
type TupleToUnion<T extends readonly any[]> = T[number];

type cases = [
  Expect<Equal<TupleToUnion<[123, "456", true]>, 123 | "456" | true>>,
  Expect<Equal<TupleToUnion<[123]>, 123>>
];
