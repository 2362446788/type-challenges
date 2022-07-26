type Reverse<T extends unknown[], U extends unknown[] = []> = T extends [infer F, ...infer R] ? Reverse<R, [F, ...U]> : U;