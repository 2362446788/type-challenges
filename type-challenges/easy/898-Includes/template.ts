// import type { Equal } from "@type-challenges/utils";
// export type Includes<T extends readonly any[], U> = T extends [
//   infer First,
//   ...infer Rust
// ]
//   ? Equal<First, U> extends true
//     ? true
//     : Includes<Rust, U>
//   : false;

import type { Equal } from "@type-challenges/utils";
export type Includes<T extends readonly any[], U> = T extends [
  infer First,
  ...infer Rust
]
  ? Equal<First, U> extends true
  ? true
  : Includes<Rust, U>
  : false;
