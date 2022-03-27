type MyReadonly<T> = {
  readonly [P in keyof T]: T[P];
};

// 进行任务分解
// 1、需要返回一个新对象
// 2、遍历当前元素，赋值给新对象 in -> mapped keyof -> lookup
// 3、给新对象的每一个属性都加上readonly Readonly
// 4、返回新对象
