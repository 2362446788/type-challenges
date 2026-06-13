import type { Equal, Expect } from "@type-challenges/utils";

type Foo = {
  [key: string]: any;
  foo(): void;
};

type Bar = {
  [key: number]: any;
  bar(): void;
  0: string;
};

const foobar = Symbol("foobar");
type FooBar = {
  [key: symbol]: any;
  [foobar](): void;
};
type O = keyof FooBar;

type Baz = {
  bar(): void;
  baz: string;
};

// 错误思路
// 要移除索引签名，需要区分索引签名和真实索引的差别：真实索引是一个具体的字符串，例如"bar"、"0"，索引签名是大类型，例如 string、number
// 那么就可以使用模板字符串的方式来匹配是否满足，如果不满足就过滤掉
// type RemoveIndexSignature<T> = {
//   [K in keyof T as K extends `${infer S}` ? S : never]: T[K];
// };

// 正确思路
// 要移除索引签名，需要区分索引签名和真实索引的差别：真实索引是一个具体的值（而不只是字符串），例如"bar"、"0"，索引签名是大类型，例如 string、number
// 那么就可以使用这些大类型来过滤具体的值
// 因为遍历出来的属性是具体的值，所以 number extends K 就不满足，因为大范围不满足小范围，小范围才满足大范围，例如 K extends number
type RemoveIndexSignature<T> = {
  [K in keyof T as string extends K
    ? never
    : number extends K
      ? never
      : symbol extends K
        ? never
        : K]: T[K];
};

// type TT<T> = T extends `${infer S}` ? S : never;
// type T2 = TT<string>;
// type T3 = TT<"s">;
// type T4 = TT<keyof FooBar>;

// type WideKeys<T, U> = {
//   [K in keyof T as U extends K ? K : never]: T[K];
// };

// // 用例：保留那些是 'a' 或 'b' 的父类型的键
// type Example = WideKeys<
//   { a: 1; b: 2; c: string; [x: string]: any },
//   'a' | 'b' | 'd'
// >;

type O1 = 'a' | never;
type o2 = 'a' & never;
type O3 = 'a' | any;
type O4 = 'a' & any;

type T1 = RemoveIndexSignature<Foo>;

type cases = [
  Expect<Equal<RemoveIndexSignature<Foo>, { foo(): void }>>,
  Expect<Equal<RemoveIndexSignature<Bar>, { bar(): void; 0: string }>>,
  Expect<Equal<RemoveIndexSignature<FooBar>, { [foobar](): void }>>,
  Expect<Equal<RemoveIndexSignature<Baz>, { bar(): void; baz: string }>>,
];
