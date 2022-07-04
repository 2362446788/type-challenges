// 1、创建一个变量U来存储，一个数组
// 2、将遍历到的字符串添加到数组中
// 3、将数组中的数据取出形成union

type StringToUnion<
  T extends string,
  U extends unknown[] = []
> = T extends `${infer F}${infer R}` ? StringToUnion<R, [...U, F]> : U[number];
