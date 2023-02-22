// 1、循环T中的key
// 2、通过as操作符剔除不是P的key
// 3、返回对应的值
// type MyOmit<T, K extends keyof T> = {
//   [P in keyof T as P extends K ? never : P]: T[P];
// };

// 通过Exclude剔除选项再进行分配
// type MyOmit<T, K extends keyof T> = {
//   [P in Exclude<keyof T, K>]: T[P];
// };
type MyOmit<T, K extends keyof T> = {
  [P in Exclude<keyof T, K>]: T[P];
};

