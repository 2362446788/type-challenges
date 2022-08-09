/* 
 * 这题需要实现 key 和 value 的交换，我们可以遍历对象对 key 进行追加变形

通过在 keyof 描述对象时采用 as 追加变形

type Flip<T> = {
  [K in keyof T as T[K]]: K
}
但是这样有几个测试会挂掉，由于 key 的位置只能是 string 或者 number 或者 boolean 所以挂了

因此我们可以限定一下 value 的类型 Record<string, string | number | boolean>

这样还是有挂掉的，是 Flip<{ pi: 3.14; bool: true }>，很显然 boolean 不能作为 key，需要转化成字符串，我们用模版强行转一下即可
*/
type Flip<T extends Record<string, string | boolean | number>> = {
  [K in keyof T as `${T[K]}`]: K;
}