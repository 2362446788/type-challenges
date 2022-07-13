// 1、将属于K中的key都取出来构建一个?的类型
// 2、将不属于K的key也构造一个类型
// 3、需要使用才可以完整

type Use<T> = {
  [K in keyof T]: T[K];
};

type PartialByKeys<T, K = keyof T> = Use<
  {
    [U in keyof T as U extends K ? U : never]?: T[U];
  } & {
    [U in keyof T as U extends K ? never : U]: T[U];
  }
>;
