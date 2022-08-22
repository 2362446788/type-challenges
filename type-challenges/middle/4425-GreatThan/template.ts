// your answers
type NumberToTuple<N extends number, R extends 1[] = []> = R["length"] extends N
  ? R
  : NumberToTuple<N, [1, ...R]>;

type GreaterThan<
  T extends number,
  U extends number
  > = NumberToTuple<T> extends [...NumberToTuple<U>, ...infer R]
  ? R extends []
  ? false
  : true
  : false;