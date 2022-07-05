// 1、将F&S，找到合并后的key
// 2、判断key是否属于S，一位内是覆盖，所以先找S，再找F
// 3、将数据返回即可

type Merge<F extends Record<string, any>, S extends Record<string, any>> = {
  [K in keyof (F & S)]: K extends keyof S
    ? S[K]
    : K extends keyof F
    ? F[K]
    : never;
};
