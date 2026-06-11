import type { Equal, Expect } from "@type-challenges/utils";

type NodeA = {
  type: "A";
  name: string;
  flag: number;
};

type NodeB = {
  type: "B";
  id: number;
  flag: number;
};

type NodeC = {
  type: "C";
  name: string;
  flag: number;
};

type ReplacedNodeA = {
  type: "A";
  name: number;
  flag: string;
};

type ReplacedNodeB = {
  type: "B";
  id: number;
  flag: string;
};

type ReplacedNodeC = {
  type: "C";
  name: number;
  flag: string;
};

type NoNameNodeA = {
  type: "A";
  flag: number;
  name: never;
};

type NoNameNodeC = {
  type: "C";
  flag: number;
  name: never;
};

type Nodes = NodeA | NodeB | NodeC;
type ReplacedNodes = ReplacedNodeA | ReplacedNodeB | ReplacedNodeC;
type NodesNoName = NoNameNodeA | NoNameNodeC | NodeB;

// 从题意来看入参是联合类型，返回也是联合类型，那就使用分布式条件
// 1. 使用分布式触发计算
// type ReplaceKeys<T, U, V> = T extends any
//   ? {
//       [K in keyof T]: T[K];
//     }
//   : never;
// type T1 = ReplaceKeys<Nodes, "name" | "flag", { name: number; flag: string }>;
// 2. 现在就是针对 T[K] 来做处理
// 先判断是否满足 U
//    不满足直接返回 T[K]
//    满足再判断是否满足 keyof V
//        满足就从 V 中取值
//        不满足直接返回 never
type ReplaceKeys<T, U, V> = T extends any
  ? {
      [K in keyof T]: K extends U ? (K extends keyof V ? V[K] : never) : T[K];
    }
  : never;
type T1 = ReplaceKeys<Nodes, "name" | "flag", { name: number; flag: string }>;

type cases = [
  Expect<
    Equal<
      ReplaceKeys<Nodes, "name" | "flag", { name: number; flag: string }>,
      ReplacedNodes
    >
  >,
  Expect<Equal<ReplaceKeys<Nodes, "name", { aa: number }>, NodesNoName>>,
];
