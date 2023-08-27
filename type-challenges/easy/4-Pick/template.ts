type MyPick<T, K extends keyof T> = {
    [P in K]: T[P];
}

// type MyPick<T, K extends keyof T> = {
//   [P in K]: T[P];
// };

// type MyPick<T, K extends keyof T> = {
//   [P in K]: T[P];
// };

// 按照js的思想

// function MyPick(keys, target) {
//   // 1、创建一个对象
//   let object = {};
//   // 2、遍历target，判断在keys中是否存在，存在赋予object
//   target.forEach((key) => {
//     if (keys.includes(key)) {
//       object[key] = keys[key];
//     }
//   });
//   // 3、返回object
//   return object;
// }

// 涉及到的知识点
// 1、in：mapped -> https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#mapping-modifiers
// 2、T[P]：indexed -> https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html#handbook-content
// 3、keyof：lookup -> https://www.typescriptlang.org/docs/handbook/2/keyof-types.html
// 4、extends：Generic Constraints -> https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints
