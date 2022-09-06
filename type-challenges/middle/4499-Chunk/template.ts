type Chunk<
  T,
  D extends number,
  A extends any[] = [],
  TL extends any[] = []
> = T extends [infer F, ...infer R]
  ? A["length"] extends D
  ? Chunk<R, D, [F], [...TL, [...A]]>
  : Chunk<R, D, [...A, F], TL>
  : A extends []
  ? [...TL]
  : [...TL, A];