type Fibonacci<
  T extends number,
  N extends number[] = [1],
  Res extends number[] = [1],
  Cur extends number[] = [1]
  > = N['length'] extends T
  ? Res['length']
  : Fibonacci<T, [...N, 1], Cur, [...Res, ...Cur]> 