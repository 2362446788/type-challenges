type Filter<T, U> = T extends []
  ? []
  : T extends [infer Head, ...infer Tail]
    ? Head extends U
      ? Filter<Tail, U>
      : [Head, ...Filter<Tail, U>]
    : never;

// type T1 = Filter<[0, 1, 2], 2>;

type Combination<T extends string[]> = T extends []
  ? never
  : {
      [K in keyof T]: T[K] | `${T[K]} ${Combination<Filter<T, T[K]>>}`;
    }[number];
