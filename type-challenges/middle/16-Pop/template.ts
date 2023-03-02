// 1、通过infer推断出前面的数据和最后一位数据
// 2、将前面的数据输出
// type Pop<T extends unknown[]> = T extends [...infer R, unknown] ? R : never;
type Pop<T extends unknown[]> = T extends [...infer R, unknown] ? R : never;
