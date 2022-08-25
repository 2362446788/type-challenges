type Zip<F extends unknown[], S extends unknown[]> = [F, S] extends [
  [infer L, ...infer restF],
  [infer R, ...infer restS]
]
  ? [[L, R], ...Zip<restF, restS>]
  : [];
