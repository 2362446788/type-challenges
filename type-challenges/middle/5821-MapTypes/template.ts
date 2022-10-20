type MapTypes<T extends Record<string, any>, R extends { mapFrom: any, mapTo: any }, U extends R = R> = {
  [K in keyof T]: R extends any
  ? T[K] extends R['mapFrom']
  ? R['mapTo']
  : T[K] extends U['mapFrom']
  ? never
  : T[K]
  : never
}

type Case = MapTypes<{ name: string; date: Date }, { mapFrom: string, mapTo: number } | { mapFrom: string, mapTo: Date }>
//  ^?
