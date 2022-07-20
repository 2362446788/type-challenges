// type CreateArray<T extends number, A extends number[] = []> = A["length"] extends T ? A : CreateArray<T, [T, ...A]>;
// type PopValue<T> = T extends [...infer R, unknown] ? R : never;
// type MinusOne<T extends number, A extends number[] = CreateArray<T, []>> = PopValue<A>['length'];

// type CreateArray<
//   TLength extends number,
//   TData extends unknown[] = []
//   > = TData["length"] extends TLength
//   ? TData
//   : CreateArray<TLength, [unknown, ...TData]>;

// type PopValue<TArray extends Array<unknown>> = TArray extends [
//   ...infer Rest,
//   unknown
// ]
//   ? Rest
//   : never;

// type MinusOne<
//   TDigit extends number,
//   TArray extends unknown[] = CreateArray<TDigit>
//   > = PopValue<TArray>["length"];

// type MinusOne<T, K extends number = number, U extends any[] = []> = U['length'] extends T
//   ? U extends [infer R, ...infer rest]
//   ? [...rest]['length']
//   : []['length']
//   : MinusOne<T, K, [T, ...U]>

// type MinusOne<T extends number, Tem extends any[] = []> = [
//   ...Tem,
//   ""
// ]["length"] extends T
//   ? Tem["length"]
//   : MinusOne<T, [...Tem, ""]>;

// type LengthToArray<N extends string, T extends any[] = []> = `${T['length']}` extends N ? T : LengthToArray<N, [any, ...T]>;

// type CreateLengthArray<S extends string, T extends any[] = []> = S extends `${infer F}${infer L}` ? CreateLengthArray<L, [...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...LengthToArray<F>]> : T;

// type MinusOne<T extends number> = CreateLengthArray<`${T}`> extends [infer _, ...infer S] ? S['length'] : never;

// your answers
// ts 源码对递归次数做了限制，所以大数不行
type MinusOne<T extends number, U extends unknown[] = []> = [...U, unknown]['length'] extends T ? U['length'] : MinusOne<T, [...U, unknown]> 
