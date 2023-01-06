type All<T, U> =
  T extends [infer F, ...infer R]
  ? Equal<U, F> extends true ? All<R, U> : false
  : true;