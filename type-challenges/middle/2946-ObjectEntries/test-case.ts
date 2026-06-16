import type { Equal, Expect } from "@type-challenges/utils";

interface Model {
  name: string;
  age: number;
  locations: string[] | null;
}

type ModelEntries =
  | ["name", string]
  | ["age", number]
  | ["locations", string[] | null];

type IsUnion<T, V = T> = T extends any
  ? [V] extends [T]
    ? false
    : true
  : never;

type NoNUndefined<T> =
  IsUnion<T> extends true ? (T extends undefined ? never : T) : T;

// 1. 借用遍历来处理，优先使用 -? 将其都变成必填字段
// 此时对象的 value 就是需要的那个值
// type ObjectEntries<T> = {
//   [K in keyof T]-?: [K, T[K]];
// };
// 2. 把对象的 value 获取出来转变成 union
// 这个时候第二个 case 没法通过，即 value 中需要去掉 undefined
// type ObjectEntries<T> = {
//   [K in keyof T]-?: [K, T[K]];
// }[keyof T];
// 3. 借助 NoNUndefined 和 IsUnion 去除联合类型中的 undefined
type ObjectEntries<T> = {
  [K in keyof T]-?: [K, NoNUndefined<T[K]>];
}[keyof T];

type T1 = ObjectEntries<Model>;
type T2 = ObjectEntries<Partial<Model>>;
type T3 = ObjectEntries<{ key?: undefined }>;

// 更优雅的处理版本
// 1. 借用额外的泛型使用分布式计算逻辑
// 2. 返回 [V, ] 然后使用 T[V] 的值去推导出来 R，将其返回
// T[V] extends infer R | undefined ? R : never 这里对于 T[V] 是 undefined 的时候 R 就会被匹配为一个 undefined
// 因为 infer 是推导一个存在的类型使条件判断成立
// 例如：undefined extends infer R | undefined
// 此时只有 R 为 undefined 的时候满足条件
// type ObjectEntries<T, V = keyof T> = V extends keyof T
//   ? [V, T[V] extends infer R | undefined ? R : never]
//   : never;

// type T1 = ObjectEntries<Model>;
// type T2 = ObjectEntries<Partial<Model>>;
// type T3 = ObjectEntries<{ key?: undefined }>;

type cases = [
  Expect<Equal<ObjectEntries<Model>, ModelEntries>>,
  Expect<Equal<ObjectEntries<Partial<Model>>, ModelEntries>>,
  Expect<Equal<ObjectEntries<{ key?: undefined }>, ["key", undefined]>>,
  Expect<Equal<ObjectEntries<{ key: undefined }>, ["key", undefined]>>,
];
