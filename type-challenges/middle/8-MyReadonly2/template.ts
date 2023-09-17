// 1、限制K的值，必须是满足keyof T的union类型，没传递就给一个keyof T作为默认值
// 2、找出不属于K但是在T中的元素
// 3、将K里面对应T的元素设置为readonly
// 4、将两者做一个交叉类型即可
// type MyReadonly2<T, K extends keyof T = keyof T> = Omit<T, K> &
//   Readonly<Pick<T, K>>;

// type MyReadonly2<T, K extends keyof T = keyof T> = {
//   [P in keyof T as P extends K ? never : P]: T[P];
// } & { readonly [P in K]: T[P] };

// type MyReadonly2<T, K extends keyof T = keyof T> = Omit<T, K> & Readonly<Pick<T, K>>;

// type MyReadonly2<T, K extends keyof T = keyof T> = Omit<T, K> & Readonly<Pick<T, K>>;

type MyReadonly2<T, K extends keyof T = keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
} & { readonly [P in K]: T[P] };
