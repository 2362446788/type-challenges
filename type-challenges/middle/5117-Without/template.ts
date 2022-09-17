type GetUnion<T extends number[] | number> = T extends number[] ? T[number] : T

type Without<
  T extends number[], 
  U extends number[] | number, 
> = 
  T extends [infer First, ...infer Rest extends number[]] ? 
    First extends GetUnion<U> ? Without<Rest, U> : [First, ...Without<Rest, U>] 
  : T