type TrimRight<T extends string> = T extends `${infer F}${" " | "\n" | "\t"}`
  ? TrimRight<F>
  : T;
