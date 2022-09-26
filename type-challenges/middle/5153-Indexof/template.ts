type MyEqual<T, U> =
  (<G>() => G extends T ? 1 : 2) extends
  (<G>() => G extends U ? 1 : 2) ? true : false

type IndexOf<T extends unknown[], U, Index extends unknown[] = []> = T extends [infer First, ...infer Rest]
  ? MyEqual<First, U> extends true
  ? Index['length']
  : IndexOf<Rest, U, [any, ...Index]>
  : -1