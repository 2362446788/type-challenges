import type { Equal, Expect } from "@type-challenges/utils";

// 注释版本为什么不行
// ts
// // 注释版
// type IsUnion<T, U = T> = T extends any
//   ? [T] extends [U]
//     ? false
//     : true
//   : never;
// 当 T 是联合类型（如 string | number）时：
// 触发分布式条件，T 依次被替换为 string 和 number，分别执行分支。
// U 始终为 string | number。
// 对于 T = string 的分支：判断 [string] extends [string | number]。
// [string] 是 [string | number] 的子类型，所以结果为 true → 返回 false。
// 对于 T = number 的分支：判断 [number] extends [string | number]，同理返回 false。
// 最终结果：false | false → false。
// 无论传入什么联合类型，每个单成员都必然是完整联合类型的子类型，因此每个分支都返回 false，整个结果永远是 false。它完全失去了检测联合类型的能力。
// 正确版本如何解决
// ts
// // 正确版
// type IsUnion<T, U = T> = T extends any
//   ? [U] extends [T]
//     ? false
//     : true
//   : never;
// 把检查方向反了过来：用完整的联合类型 U 去检查是否为某个单成员 T 的子类型。
// 还是 string | number 的例子：
// T = string 时，判断 [string | number] extends [string] → false → 返回 true。
// T = number 时，判断 [string | number] extends [number] → false → 返回 true。
// 最终结果：true | true → true。✅
// 当 T 是非联合类型（如 string）时，不会触发分布式条件：
// T = string，U = string。
// 判断 [string] extends [string] → true → 返回 false。✅
// 这样就能准确区分联合类型和非联合类型了。

// 1. 利用 union 的分布式条件计算特性，并且新增一个泛型 U 保存完整的类型 T
// type IsUnion<T, U = T> = T extends any ? any: any;
// 2. 使用数组包裹 U 让其变成一个具体的元组类型，因为 U 也是 union 类型，只用将其当作一个整体才不会触发分布式计算，然后和 [T] 进行判断是否满足
// 如果是 union 类型的话，例如：string | number，[U] extends [T] => [string | number] extends [string]，不满足返回 true
// 如果不是 union 类型的话，例如：string，[U] extends [T] => [string] extends [string]，满足返回 false
// type IsUnion<T, U = T> = T extends any
//   ? [U] extends [T]
//     ? false
//     : true
//   : never;
// 3. 如果一开始传递的就是 never 那就返回 false，需要额外处理下，因为 T extends any 这里，never extends 任何东西都是 never，不会返回 false
type IsNever<T> = [T] extends [never] ? true : false;
type IsUnion<T, U = T> =
  IsNever<T> extends true
    ? false
    : T extends any
      ? [U] extends [T]
        ? false
        : true
      : never;

type T1 = IsUnion<string>;

type cases = [
  Expect<Equal<IsUnion<string>, false>>,
  Expect<Equal<IsUnion<string | number>, true>>,
  Expect<Equal<IsUnion<"a" | "b" | "c" | "d">, true>>,
  Expect<Equal<IsUnion<undefined | null | void | "">, true>>,
  Expect<Equal<IsUnion<{ a: string } | { a: number }>, true>>,
  Expect<Equal<IsUnion<{ a: string | number }>, false>>,
  Expect<Equal<IsUnion<[string | number]>, false>>,
  // Cases where T resolves to a non-union type.
  Expect<Equal<IsUnion<string | never>, false>>,
  Expect<Equal<IsUnion<string | unknown>, false>>,
  Expect<Equal<IsUnion<string | any>, false>>,
  Expect<Equal<IsUnion<string | "a">, false>>,
  Expect<Equal<IsUnion<never>, false>>,
];
