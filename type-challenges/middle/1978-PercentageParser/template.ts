// type PercentageParser<A extends string, P extends "+" | "-" | "" = "", U extends "%" | "" = ""> =
//   A extends `${infer T}%`
//   ? PercentageParser<T, P, "%">
//   : A extends `${infer O extends ("+" | "-")}${infer F}`
//   ? PercentageParser<F, O, U>
//   : [P, A, U]

type Parser1<A extends string> = A extends `${infer H}${infer _}` ? H extends '-' | '+' ? H : '' : ''
type Parser2<A extends string> = A extends `${infer _}%` ? '%' : ''
type Parser3<A extends string> = A extends `${Parser1<A>}${infer M}${Parser2<A>}` ? M : ''
type PercentageParser<A extends string> = [Parser1<A>, Parser3<A>, Parser2<A>]