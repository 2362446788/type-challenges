import type { Alike, Expect } from "@type-challenges/utils";

// 第一步：先把两个函数搭建起来
// type Chainable = {
//   option: () => any;
//   get: () => any;
// }

// 第二步：使用泛型传递给 Chainable 用于存储，默认值是 {}，然后 get 返回这个 T
// type Chainable<T = {}> = {
//   option: () => any;
//   get: () => T;
// }

// 第三步：修改 option 的参数，增加两个泛型，K 和 V，分别给对应的连个参数，然后最后递归调用 Chainable 去修改之前的类型变量 T，使用联合类型将值加进去
// type Chainable<T = {}> = {
//   option: <K extends string, V>(key: K, value: V) => Chainable<T & Record<K, V>>;
//   get: () => T;
// }

// 第四步：对于之前就存在的 key 的话需要提示错误，那么就在给 key 声明类型的时候增加逻辑判断，如果在之前的 T 中存在就返回 never
// 最后还需要将后者的覆盖前者所以需要使用 Omit<T, K> 将之前的类型剔除
type Chainable<T = {}> = {
  option: <K extends string, V>(
    key: K extends keyof T ? never : K,
    value: V,
  ) => Chainable<Omit<T, K> & Record<K, V>>;
  get: () => T;
};

declare const a: Chainable;

const result1 = a
  .option("foo", 123)
  .option("bar", { value: "Hello World" })
  .option("name", "type-challenges")
  .get();

const result2 = a
  .option("name", "another name")
  // @ts-expect-error
  .option("name", "last name")
  .get();

const result3 = a
  .option("name", "another name")
  // @ts-expect-error
  .option("name", 123)
  .get();

type cases = [
  Expect<Alike<typeof result1, Expected1>>,
  Expect<Alike<typeof result2, Expected2>>,
  Expect<Alike<typeof result3, Expected3>>,
];

type Expected1 = {
  foo: number;
  bar: {
    value: string;
  };
  name: string;
};

type Expected2 = {
  name: string;
};

type Expected3 = {
  name: number;
};
