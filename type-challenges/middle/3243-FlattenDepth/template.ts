// your answers
type FlattenDepth<
  T extends any[],
  C extends number = 1,
  CO extends number[] = []
  > = CO['length'] extends C
  ? T
  : T extends [infer G, ...infer Rest]
  ? G extends any[]
  ? [...FlattenDepth<G, C, [...CO, 1]>, ...FlattenDepth<Rest, C, CO>]
  : [G, ...FlattenDepth<Rest, C, CO>]
  : T