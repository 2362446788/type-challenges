// type TupleToUnion<T extends unknown[]> = T[number];
// type TupleToUnion<T extends unknown[]> = T[number];
type TupleToUnion<T extends readonly any[]> = T[number];
