type Shift<T extends unknown[]> = T extends [unknown, ...infer R] ? R : T;
