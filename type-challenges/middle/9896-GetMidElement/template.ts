type Double<T extends unknown[]> = [...T, ...T]

type GetMiddleElement<
  T extends unknown[],
  I extends unknown[] = []
> = I['length'] extends T['length']
  ? []
  : [...I, unknown]['length'] extends number
  ? [...Double<I>, unknown]['length'] extends T['length']
  ? [T[I['length']]]
  : Double<[...I, unknown]>['length'] extends T['length']
  ? [T[I['length']], T[[...I, unknown]['length']]]
  : GetMiddleElement<T, [...I, unknown]>
  : never