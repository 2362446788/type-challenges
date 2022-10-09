type IsEqual<T, U> = (<G>() => G extends T ? 1 : 2) extends (<G>() => G extends U ? 1 : 2)
  ? true
  : false;

type LastIndexOf<T extends unknown[], U> = T extends [...infer Rest, infer Last]
  ? IsEqual<U, Last> extends true
  ? Rest['length']
  : LastIndexOf<Rest, U>
  : -1