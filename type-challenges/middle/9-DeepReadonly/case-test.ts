import type { Equal, Expect } from "@type-challenges/utils";

// 对于对象数据类型的除了函数类型都需要进行深层次处理，最好的方法就是递归
// 正常约束 T 为 object 类型，然后使用 readonly 约束遍历的每一个 key
// 接着判断具体的 value 是否是 object
//   - 是函数类型就直接返回，不能深层次处理
//   - 不是就递归处理
// 不是 object 就正常返回 value 即可
// type DeepReadonly<T extends object> = {
//   readonly [K in keyof T]: T[K] extends object
//     ? T[K] extends Function
//       ? T[K]
//       : DeepReadonly<T[K]>
//     : T[K];
// };

// 另一个解法：基本数据类型没有 key，所以使用 keyof T extends never 就能找出基本数据类型，然后剩余的就使用递归处理
type DeepReadonly<T> = keyof T extends never
  ? T
  : {
      readonly [K in keyof T]: DeepReadonly<T[K]>;
    };

type Test = DeepReadonly<X>;

type cases = [Expect<Equal<DeepReadonly<X>, Expected>>];

type X = {
  a: () => 22;
  b: string;
  c: {
    d: boolean;
    e: {
      g: {
        h: {
          i: true;
          j: "string";
        };
        k: "hello";
      };
      l: [
        "hi",
        {
          m: ["hey"];
        },
      ];
    };
  };
};

type Expected = {
  readonly a: () => 22;
  readonly b: string;
  readonly c: {
    readonly d: boolean;
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true;
          readonly j: "string";
        };
        readonly k: "hello";
      };
      readonly l: readonly [
        "hi",
        {
          readonly m: readonly ["hey"];
        },
      ];
    };
  };
};
