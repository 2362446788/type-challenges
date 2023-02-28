// type Last<T extends any[]> = T extends [...unknown[], infer L] ? L : never;
type Last<T extends any[]> = T extends [...unknown[], infer L] ? L : never;
