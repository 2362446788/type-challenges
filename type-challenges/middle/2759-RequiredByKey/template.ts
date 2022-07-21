type Merges<T> = {
  [K in keyof T]: T[K]
}
type RequiredByKeys<T extends Record<string, any>, U = keyof T> = Merges<
  {
    [P in keyof T as P extends U ? P : never]-?: T[P]
  } & {
    [O in keyof T as O extends U ? never : O]: T[O]
  }
>

