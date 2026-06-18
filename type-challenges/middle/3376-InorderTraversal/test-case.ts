import type { Equal, Expect } from "@type-challenges/utils";

const tree1 = {
  val: 1,
  left: null,
  right: {
    val: 2,
    left: {
      val: 3,
      left: null,
      right: null,
    },
    right: null,
  },
} as const;

const tree2 = {
  val: 1,
  left: null,
  right: null,
} as const;

const tree3 = {
  val: 1,
  left: {
    val: 2,
    left: null,
    right: null,
  },
  right: null,
} as const;

const tree4 = {
  val: 1,
  left: null,
  right: {
    val: 2,
    left: null,
    right: null,
  },
} as const;

// 先定义 Node 节点
type Node = {
  val: number;
  left: Node | null;
  right: Node | null;
};

// 根据传入的参数去匹配是否满足 Node 节点
// 如果不满足返回 []
// 满足的话：在构造一个新数组，分别去取 left、val、right 的值，left 和 right 的值需要进行递归调用获取
type InorderTraversal<T> = T extends Node
  ? [...InorderTraversal<T["left"]>, T["val"], ...InorderTraversal<T["right"]>]
  : [];

type T1 = InorderTraversal<null>;
type T2 = InorderTraversal<typeof tree1>;
type T3 = InorderTraversal<typeof tree2>;
type T4 = InorderTraversal<typeof tree3>;
type T5 = InorderTraversal<typeof tree4>;

type cases = [
  Expect<Equal<InorderTraversal<null>, []>>,
  Expect<Equal<InorderTraversal<typeof tree1>, [1, 3, 2]>>,
  Expect<Equal<InorderTraversal<typeof tree2>, [1]>>,
  Expect<Equal<InorderTraversal<typeof tree3>, [2, 1]>>,
  Expect<Equal<InorderTraversal<typeof tree4>, [1, 2]>>,
];
