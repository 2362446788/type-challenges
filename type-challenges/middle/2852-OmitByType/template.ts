type OmitByType<T extends Record<string, any>, U> = {
  [K in keyof T as T[K] extends U ? never : K]: T[K]
}