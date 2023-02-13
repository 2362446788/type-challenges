// type If<C extends boolean, T extends any, F extends any> = C extends true
//   ? T
//   : F;
type If<C extends boolean, T extends any, F extends any> = C extends true
  ? T
  : F;

