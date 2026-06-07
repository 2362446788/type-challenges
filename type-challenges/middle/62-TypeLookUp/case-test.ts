import type { Equal, Expect } from "@type-challenges/utils";

interface Cat {
  type: "cat";
  breeds: "Abyssinian" | "Shorthair" | "Curl" | "Bengal";
}

interface Dog {
  type: "dog";
  breeds: "Hound" | "Brittany" | "Bulldog" | "Boxer";
  color: "brown" | "white" | "black";
}

type Animal = Cat | Dog;

// 首先需要了解分布式触发的条件，一个 union 联合类型 extends 某个类型就会触发分布式计算
// 这里使用 T 去 extends 对应的对象类型，先把 type 通过 infer 推导出来，如果不满足则返回 never
// 然后再用 U 和 P 匹配，如果匹配上了说明这个分支的类型就合法的，直接返回即可，否则返回 never

type LookUp<T, U> = T extends {
  type: infer P;
  [key: string]: any;
}
  ? U extends P
    ? T
    : never
  : never;

type Test = LookUp<Animal, "dog">;

type cases = [
  Expect<Equal<LookUp<Animal, "dog">, Dog>>,
  Expect<Equal<LookUp<Animal, "cat">, Cat>>,
  Expect<Equal<LookUp<Animal, "cat1">, never>>,
];
