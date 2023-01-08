type All<T extends any[], V> = T extends [infer F, ...infer R]
  ? F extends V
  ? All<R, V>
  : false
  : true