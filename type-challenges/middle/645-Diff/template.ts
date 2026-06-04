// 1、这题的难点在于找出不同的子项
// 2、先将T和U取并集
// 3、再取交集
// 4、并集相比于交集多出来key就是所需key
// 5、再找到对应的type返回即可

type Diff<T extends Record<string, any>, U extends Record<string, any>> = {
  [K in keyof (T & U) as K extends keyof T & keyof U
    ? never
    : K]: K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

type Foo = {
  name: string;
  age: number;
};

type Bar = {
  name: string;
  count: number;
};

// 结果为 "name" | "age" | "count"，是一个并集
type key1 = keyof (Foo & Bar);

// 结果为 "name"，是一个交集
type key2 = keyof Foo & keyof Bar;
