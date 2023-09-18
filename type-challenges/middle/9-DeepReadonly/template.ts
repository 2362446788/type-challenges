// 1、遍历所有的T的keys
// 2、将其设置为readonly
// 3、判断对应key的值，如果是函数或者普通值，返回普通值
// 4、如果是对象，递归设置readonly
// type DeepReadonly<T extends object> = {
//   readonly [P in keyof T]: T[P] extends Function
//     ? T[P]
//     : T[P] extends Record<string | number | symbol, any>
//     ? DeepReadonly<T[P]>
//     : T[P];
// };

// type DeepReadonly<T> = {
//   readonly [P in keyof T]: T[P] extends Function
//   ? T[P]
//   : T[P] extends Record<string | number | symbol, any>
//   ? DeepReadonly<T[P]>
//   : T[P];
// };

// type DeepReadonly<T> = {
//   readonly [P in keyof T]: T[P] extends Function
//   ? T[P]
//   : T[P] extends Record<string | number | symbol, any>
//   ? DeepReadonly<T[P]>
//   : T[P];
// };

type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends Function
    ? T[P]
    : T[P] extends Record<string | number | symbol, any>
    ? DeepReadonly<T[P]>
    : T[P];
};
