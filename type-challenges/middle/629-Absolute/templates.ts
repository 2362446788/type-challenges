// 1、将值构造为string
// 2、判断是否有-
// type Absolute<T extends number | string | bigint> = `${T}` extends `-${infer V}`
//   ? V
//   : `${T}`;

// 1、构造一个目标值
// 2、推断出是否存在-
// 3、存在-递归执行后续的数据，不修改目标值
// 4、不存在也递归执行
type Absolute<
  T extends number | string | bigint,
  L extends string = ""
> = `${T}` extends `${infer F}${infer R}`
  ? F extends "-"
    ? Absolute<R, L>
    : Absolute<R, `${L}${F}`>
  : L;
