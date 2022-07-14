// 1、首先触发分布式 U extends U
// 2、遍历U的key，判断是否属于T，不属于的话返回U对应的key
// 3、属于的话判断这个key是否在Y中，在的话拿到Y对应的值，否则返回never

type ReplaceKeys<U, T, Y> = U extends U
  ? {
      [K in keyof U]: K extends T ? (K extends keyof Y ? Y[K] : never) : U[K];
    }
  : never;
