import type { Equal, Expect } from "@type-challenges/utils";

interface Model {
  name: string;
  count: number;
  isReadonly: boolean;
  isEnable: boolean;
}

// 遍历然后使用重映射判断类型是否满足，满足就返回 never 舍弃，不满足正常返回
type OmitByType<T extends object, V> = {
  [K in keyof T as T[K] extends V ? never : K]: T[K];
};

type cases = [
  Expect<Equal<OmitByType<Model, boolean>, { name: string; count: number }>>,
  Expect<
    Equal<
      OmitByType<Model, string>,
      { count: number; isReadonly: boolean; isEnable: boolean }
    >
  >,
  Expect<
    Equal<
      OmitByType<Model, number>,
      { name: string; isReadonly: boolean; isEnable: boolean }
    >
  >,
];
