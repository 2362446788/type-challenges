type Concat<T extends unknown[], U extends unknown[]> = T extends [
  ...infer First
]
  ? U extends [...infer Second]
    ? [...First, ...Second]
    : [...First]
  : [];
