import { Equal, Expect } from "@type-challenges/utils";

// 对于元组和数组类型可以直接通过 T[number] 访问到各个值，会变成一个 union 联合类型，然后可以通过 in 索引访问来访问联合类型
type TupleToObject<T extends readonly string[]> = {
  [K in T[number]]: K;
}

type Test = TupleToObject<typeof tuple>;

type Value = (typeof tuple)[number]; // "tesla" | "model 3" | "model X" | "model Y"

const tuple = ["tesla", "model 3", "model X", "model Y"] as const;

type cases = [
  Expect<
    Equal<
      TupleToObject<typeof tuple>,
      {
        tesla: "tesla";
        "model 3": "model 3";
        "model X": "model X";
        "model Y": "model Y";
      }
    >
  >
];

// @ts-expect-error
type error = TupleToObject<[[1, 2], {}]>;
