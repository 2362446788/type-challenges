// type Unshift<T extends unknown[], U> = T extends [...infer Rust]
//   ? [U, ...Rust]
//   : never;
// type Unshift<T extends unknown[], U> = T extends [...infer Rust]
//   ? [U, ...Rust]
//   : never;
type Unshift<T extends unknown[], U> = T extends [...infer R]
  ? [U, ...R]
  : never;
