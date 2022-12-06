// your answers
type ToPrimitive<T> = {
  [K in keyof T]: T[K] extends string
  ? string
  : T[K] extends number
  ? number
  : T[K] extends boolean
  ? boolean
  : ToPrimitive<T[K]>
}