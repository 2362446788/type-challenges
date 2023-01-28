type Filter<T extends any[], P, R extends any[] = []> = T extends [infer First, ...infer Rest] ? (
  Filter<Rest, P, First extends P ? [...R, First] : R>
) : R