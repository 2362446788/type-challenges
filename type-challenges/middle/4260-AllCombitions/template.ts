type String2Union<S extends String> = S extends `${infer L}${infer R}`
  ? L | String2Union<R>
  : S;

type AllCombinations<S extends string> = _AllCombinations<String2Union<S>>;

type Combination<A extends string, B extends string> =
  | A
  | B
  | `${A}${B}`
  | `${B}${A}`;

type _AllCombinations<A extends string, B extends string = A> = A extends A
  ? Combination<A, _AllCombinations<Exclude<B, A>>>
  : never;

type TT = String2Union<'a'>