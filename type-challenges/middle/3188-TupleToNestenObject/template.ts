type TupleToNestedObject<T extends Array<unknown>, U> = T extends [
  infer F,
  ...infer Rest,
]
  ? {
    [key in F as F extends PropertyKey ? F : never]: TupleToNestedObject<
      Rest,
      U
    >
  }
  : U