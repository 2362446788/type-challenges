// 1、找到第一个匹配的将其提取出来
// 2、因为题目要求是匹配一次就行，所有递归的条件是前后自行递归查找提取
// 3、最终找出输出

type ReplaceAll<
  S extends string,
  From extends string,
  To extends string
> = From extends ""
  ? S
  : S extends `${infer F}${From}${infer R}`
  ? `${ReplaceAll<F, From, To>}${To}${ReplaceAll<R, From, To>}`
  : S;
