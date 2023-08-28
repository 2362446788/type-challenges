// type TupleToObject<T extends readonly any[]> = any

// 题目分解：
// 1、返回一个对象
// 2、遍历数组
// 3、做输入检测，对象的索引支持string|number|symbol
// type TupleToObject<T extends readonly (string | number | symbol)[]> = {
//   [P in T[number]]: P;
// };

// type TupleToObject<T extends readonly (string | number | symbol)[]> = {
//   [P in T[number]]: P;
// };

type TupleToObject<T extends readonly (string | number | symbol)[]> = {
  [K in T[number]]: K;
}

type a = TupleToObject<string[]>;

// 1、遍历数组 T[number]
// 2、typeof 转换类型

let str1 = "1";
type s1 = typeof str1; // 转换为一个string

const str2 = "2";
type s2 = typeof str2; // 转换为一个 '2' 不允许被修改

const arr1 = [1, "2"];
type a1 = typeof arr1; // 转换为 (number|string)[]

const arr2 = [1, "2"] as const;
type a2 = typeof arr2; // 转换为 readonly [1, '2'] 不允许被修改

type a22 = TupleToObject<a2>;

const tuple: [number, string] = [1, "2"];

// @ts-expect-error
// ts错误断言 https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-9.html#-ts-expect-error-comments
