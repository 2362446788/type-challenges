type Last<T extends any[]> = T extends [...unknown[], infer L] ? L : never;
