type Flatten<T extends unknown[], U extends unknown[] = []> = T extends [
  infer F,
  ...infer R
]
  ? F extends unknown[]
    ? Flatten<R, [...U, ...Flatten<F>]>
    : Flatten<R, [...U, F]>
  : U;

// type Flatten<T, R extends any[] = []> = T extends [infer F, ...infer Rest]
//   ? F extends any[]
//     ? Flatten<Rest, [...R, ...Flatten<F>]>
//     : Flatten<Rest, [...R, F]>
//   : R;
