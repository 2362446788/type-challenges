import type { Equal, Expect } from "@type-challenges/utils";

type obj = {
  person: {
    name: string;
    age: {
      value: number;
    };
  };
};

// 先使用字符串匹配出来，然后如果只有一个值的话就走 Omit
// 多个值的话进行遍历，然后将 Key 和匹配的值进行比较，如果符合那么久继续递归调用，不匹配返回当前 key 对应的值
type DeepOmit<O, P extends string> = P extends `${infer K}.${infer Rest}`
  ? {
      [key in keyof O]: key extends K ? DeepOmit<O[key], Rest> : O[key];
    }
  : Omit<O, P>;

type cases = [
  Expect<Equal<DeepOmit<obj, "person">, {}>>,
  Expect<
    Equal<DeepOmit<obj, "person.name">, { person: { age: { value: number } } }>
  >,
  Expect<Equal<DeepOmit<obj, "name">, obj>>,
  Expect<
    Equal<
      DeepOmit<obj, "person.age.value">,
      { person: { name: string; age: {} } }
    >
  >,
];
