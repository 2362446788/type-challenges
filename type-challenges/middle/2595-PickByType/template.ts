// 1、先遍历所有的key
// 2、再通过as关键字去判断类型是否符合
// 3、把符合的找出来即可

type PickByType<T extends Record<string, any>, U extends any> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K];
};
