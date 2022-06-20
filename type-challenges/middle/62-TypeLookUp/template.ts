// 1、限制T的类型结构，将type的值infer推导出来
// 2、然后根据推导的数据去和另一个参数进行比较
// 3、如果相同的话返回这个值，否则什么也不做

type LookUp<T, U> = T extends {
  type: infer P;
  [key: string]: any;
}
  ? P extends U
    ? T
    : never
  : never;
