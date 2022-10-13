type IsEqual<T, U> = (<G>() => G extends T ? 1 : 2) extends (<G>() => G extends U  ? 1  : 2)
  ? true
  : false;

type IsInclude<Arr extends unknown[], T> = Arr extends [infer Head, ...infer Rest]
  ? IsEqual<T, Head> extends true
    ? true
    : IsInclude<Rest, T>
  : false

type Unique<T extends unknown[], Result extends unknown[] = []> = T extends [infer Head, ...infer Rest]
  ? Unique<Rest, IsInclude<Result, Head> extends true ? Result : [...Result, Head]>
  : Result