// type First<T extends any[]> = T extends [] ? never : T[0];
// type First<T extends any[]> = T["length"] extends 0 ? never : T[0];
// type First<T extends any[]> = T[0] extends T[number] ? T[0] : never;
// type First<T extends any[]> = T extends [infer first, ...infer rest]
//   ? first
//   : never;

// type First<T extends any[]> = T extends [] ? never : T[0];
// type First<T extends any[]> = T["length"] extends 0 ? never : T[0];
// type First<T extends any[]> = T[0] extends T[number] ? T[0] : never;
type First<T extends any[]> = T extends [infer F, ...infer R] ? F : never;

// 1、extends 方式
// 2、tuple 的 length
// 3、extends union
// type uni = [string, number];
// type uni1 = uni[number]; // union类型 string|number
// 4、infer 推断方式
// type First<T extends any[]> = T extends [infer First, ...infer Rest]
//   ? First
//   : never;
// 分解为js写法
// function first(array) {
//   const [first, ...rest] = array;
//   return first ? first : [];
// }

// type First<T extends any[]> = any
// type First<T extends any[]> = T extends [] ? never : T[0];
// type First<T extends any[]> = T["length"] extends 0 ? never : T[0];
// type First<T extends any[]> = T[0] extends T[number] ? T[0] : never;
// type First<T extends any[]> = T extends [infer First, ...infer Rest]
//   ? First
//   : never;
