import type { Equal, Expect } from "@type-challenges/utils";

// 不符合版本
// type KebabCase<T extends string> = T extends `${infer F}${infer R}`
//   ?
//     // 这样判断后，如果最后一个字符串只剩下 'z'，F 匹配到了，R就匹配为 ""
//     // "" extends Capitalize<""> 是匹配的，所以会在最后的末尾增加上 -
//     R extends Capitalize<R>
//     ? `${Uncapitalize<F>}-${KebabCase<R>}`
//     : `${Uncapitalize<F>}${KebabCase<R>}`
//   : T;
// type T1 = KebabCase<"FooBarBaz">; // foo-bar-baz-

// 因为也要处理头部，所以获取到的第一个 F 一定要使用 Uncapitalize 处理
// 然后剩余的 R，使用 R extends Uncapitalize<R> 判断首字母是否是小写
// 是小写就返回 `${Uncapitalize<F>}${KebabCase<R>}`，即没做任何处理继续递归
// 不是小写就说吗找到了对应的那个驼峰字符，需要将其返回 `${Uncapitalize<F>}-${KebabCase<R>}`，即把首字母小写并且增加一个 -，剩余的 R 中还有首字母是大写的，但是在写一个递归调用中就被 Uncapitalize<F> 变成小写了
// 思维有点复杂，需要倒推
type KebabCase<T extends string> = T extends `${infer F}${infer R}`
  ? R extends Uncapitalize<R>
    ? `${Uncapitalize<F>}${KebabCase<R>}`
    : `${Uncapitalize<F>}-${KebabCase<R>}`
  : T;

type T1 = KebabCase<"FooBarBaz ">;

type cases = [
  Expect<Equal<KebabCase<"FooBarBaz">, "foo-bar-baz">>,
  Expect<Equal<KebabCase<"fooBarBaz">, "foo-bar-baz">>,
  Expect<Equal<KebabCase<"foo-bar">, "foo-bar">>,
  Expect<Equal<KebabCase<"foo_bar">, "foo_bar">>,
  Expect<Equal<KebabCase<"Foo-Bar">, "foo--bar">>,
  Expect<Equal<KebabCase<"ABC">, "a-b-c">>,
  Expect<Equal<KebabCase<"-">, "-">>,
  Expect<Equal<KebabCase<"">, "">>,
  Expect<Equal<KebabCase<"😎">, "😎">>,
];
