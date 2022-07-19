// 1、通过字符串得匹配获取到前后得字符
// 2、递归找出最终得字符串然后返回

type DropChar<S extends string, C extends string = ""> = S extends `${infer F}${C}${infer R}` ? DropChar<`${F}${R}`, C> : S;