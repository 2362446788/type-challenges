type Subsequence<T extends any[]> = T extends [infer F, ...infer R] ? Subsequence<R> | [F, ...Subsequence<R>] : [];
