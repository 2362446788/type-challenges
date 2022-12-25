type DeepMutation<any> = any; type DeepMutable<T> = {
  -readonly [key in keyof T]: T[key] extends any[]
  ? DeepMutable<T[key]>
  : T[key] extends Function
  ? T[key]
  : T[key] extends object
  ? DeepMutable<T[key]>
  : T[key];
};