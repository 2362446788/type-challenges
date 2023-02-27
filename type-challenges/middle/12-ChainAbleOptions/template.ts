// 1、想要返回一个数据，只能构造一个，通过反省构造
// 2、限制options的参数，如果是之前做过的key就需要舍弃
// 3、需要进行递归处理添加的key
// 4、最后通过get返回构造的数据
// type Chainable<R = {}> = {
//   option<K extends string, V = any>(
//     key: K extends keyof R ? never : K,
//     value: V
//   ): Chainable<R & { [key in K]: V }>;
//   get(): R;
// };

// type Chainable<Prev = {}> = {
//   option<K extends string, V = any>(
//     key: K extends keyof Prev ? never : K,
//     value: V
//   ): Chainable<Prev & { [key in K]: V }>;
//   get(): Prev;
// };
type Chainable<R = {}> = {
  option<K extends string, V = any>(
    key: K extends keyof R ? never : K,
    value: V
  ): Chainable<R & { [key in K]: V }>;
  get(): R;
};