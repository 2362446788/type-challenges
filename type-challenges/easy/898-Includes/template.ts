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
// export type Includes<T extends readonly any[], U> = T extends [
//   infer First,
//   ...infer Rust
// ]
//   ? Equal<First, U> extends true
//   ? true
//   : Includes<Rust, U>
//   : false;

export type Includes<T extends unknown[], U> = T extends [infer F, ...infer R]
  ? Equal<F, U> extends true
    ? true
    : Includes<R, U>
  : false;
