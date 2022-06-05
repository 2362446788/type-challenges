type Unshift<T extends unknown[], U> = T extends [...infer Rust]
  ? [U, ...Rust]
  : never;
