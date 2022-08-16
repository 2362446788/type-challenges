type Template = {
  params: {
    name: string;
    age: number;
  },
  payload: {
    total: {
      num: number;
      sec: string;
    }
  }
}
type T1 = {
  name: string;
  age: number;
}


// add DFS to generate type
type DFS<T> = {
  [Key in keyof T]: Key extends string ? T[Key] extends Record<string, any> ? Key | `${Key}.${DFS<T[Key]>}` : Key : never;
}[keyof T]

type res = DFS<Template>



type LinkString<T extends string, U extends string, I extends string> = `${T}${U}${I}`;

type ExpandTemplate<T, P extends keyof T = keyof T, U extends string = ''> =
  P extends keyof T
  ? T[P] extends Record<string, any>
  ? ExpandTemplate<T[P], keyof T[P], U extends `${infer F}${string}` ? `${U}.${P & string}` : `${U}${P & string}`>
  : `${U}.${P & string}`
  : U;
type U<T, P extends keyof T = keyof T> = P extends keyof T ? `${P & string}` : never;
/* 
 * 构造一个type：
 *  1、接收一个type修饰得映射类型
 *  2、将映射类型支持的key组成字符串的union类型，支持在进行js赋值的时候提示对应的字符串。
 *     例如：'params' | 'payload' | 'params.name' | 'params.age' | 'payload.total' | 'payload.total.num' | 'payload.total.sec'
 */
type T = ExpandTemplate<T1>;
type TE = ExpandTemplate<Template>;
type O = U<T1>;
const temp: ExpandTemplate<Template> = "payload.total.sec";
