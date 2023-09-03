/**
 * 完善watch函数的类型标注
 * 1、watch工厂函数返回一个拥有on函数的Watcher实例
 * 2、on函数有以下参数约束
 *  @1 支持 xxxChanged ，xxx 是watch执行的时候传递的对象的key
 *  @2 支持自动推导函数的oldValue和newValue的类型
 */

// =============================================================
// 第一个知识点：模板字符串
// type Watcher = {
//   on(
//     evevtName: `${"firstName" | "lastName" | "age"}Changed`,
//     callback: (oldValue: any, newValue: any) => void
//   ): void;
// };
// =============================================================

// =============================================================
// 第二个知识点：泛型结合keyof获取对象的key 结果是一个union类型
// type Watcher<T> = {
//   on(
//     evevtName: `${keyof T & string}Changed`,
//     callback: (oldValue: any, newValue: any) => void
//   ): void;
// };

// declare function watch<T extends Record<string, any>>(obj: T): Watcher<T>;
// =============================================================

// =============================================================
// 第三个知识点：ts自动推导能力
// type Watcher<T> = {
//   on<K extends keyof T & string>(
//     evevtName: `${K}Changed`,
//     callback: (oldValue: T[K], newValue: T[K]) => void
//   ): void;
// };

// declare function watch<T extends Record<string, any>>(obj: T): Watcher<T>;
// =============================================================

type Watcher = {
  on(evevtName: string, callback: (oldValue: any, newValue: any) => void): void;
};

declare function watch(obj: object): Watcher;

const personWatcher = watch({
  firstName: "xiao",
  lastName: "wang",
  age: 18,
});

// personWatcher.on<"firstName">("firstNameChanged", (oldValue, newValue) => {});
personWatcher.on("firstNameChanged", (oldValue, newValue) => {});
// personWatcher.on("ageChanged", (oldValue, newValue) => {});
