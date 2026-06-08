import type { Equal, Expect } from "@type-challenges/utils";

type test1 = {
  key: "cat";
  value: "green";
};

type testExpect1 = {
  key: "cat";
  value: "green";
  home: boolean;
};

type test2 = {
  key: "dog" | undefined;
  value: "white";
  sun: true;
};

type testExpect2 = {
  key: "dog" | undefined;
  value: "white";
  sun: true;
  home: 1;
};

type test3 = {
  key: "cow";
  value: "yellow";
  sun: false;
};

type testExpect3 = {
  key: "cow";
  value: "yellow";
  sun: false;
  isMotherRussia: false | undefined;
};

// 想要把新的 key 添加到对象中，那么只有在遍历对象的时候把 keyof T 的值扩展一下，通过 union 联合
// 然后值判断 K 是否是 T 的 key，如果是就返回 T[K]，否则返回 U
type AppendToObject<T, V extends string | number | symbol, U> = {
  [K in keyof T | V]: K extends keyof T ? T[K] : U;
};

type T1 = AppendToObject<test1, "home", boolean>;

type cases = [
  Expect<Equal<AppendToObject<test1, "home", boolean>, testExpect1>>,
  Expect<Equal<AppendToObject<test2, "home", 1>, testExpect2>>,
  Expect<
    Equal<
      AppendToObject<test3, "isMotherRussia", false | undefined>,
      testExpect3
    >
  >,
];
