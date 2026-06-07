import type { Equal, Expect } from "@type-challenges/utils";

// 1、找到第一个匹配的将其提取出来
// 2、因为题目要求是匹配一次就行，所有递归的条件是前后自行递归查找提取
// 3、最终找出输出
type ReplaceAll<
  S extends string,
  From extends string,
  To extends string,
> = From extends ""
  ? S
  : S extends `${infer F}${From}${infer R}`
    ? // 这么直接递归不行，会把整个字符串再拍一遍，会造成重复，因此针对前后个字进行递归调用即可
      // ReplaceAll<`${F}${To}${R}`, From, To>
      `${ReplaceAll<F, From, To>}${To}${ReplaceAll<R, From, To>}`
    : S;

type T1 = ReplaceAll<"foobarfoobar", "ob", "b">;
type T2 = ReplaceAll<"foboorfoboar", "bo", "b">;

type cases = [
  Expect<Equal<ReplaceAll<"foobar", "bar", "foo">, "foofoo">>,
  Expect<Equal<ReplaceAll<"foobar", "bag", "foo">, "foobar">>,
  Expect<Equal<ReplaceAll<"foobarbar", "bar", "foo">, "foofoofoo">>,
  Expect<Equal<ReplaceAll<"t y p e s", " ", "">, "types">>,
  Expect<Equal<ReplaceAll<"foobarbar", "", "foo">, "foobarbar">>,
  Expect<Equal<ReplaceAll<"barfoo", "bar", "foo">, "foofoo">>,
  Expect<Equal<ReplaceAll<"foobarfoobar", "ob", "b">, "fobarfobar">>,
  Expect<Equal<ReplaceAll<"foboorfoboar", "bo", "b">, "foborfobar">>,
  Expect<Equal<ReplaceAll<"", "", "">, "">>,
];
