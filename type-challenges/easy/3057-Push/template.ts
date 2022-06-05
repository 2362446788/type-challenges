type Push<T extends unknown[], U> = T extends [...infer Rust]
  ? [...Rust, U]
  : never;
