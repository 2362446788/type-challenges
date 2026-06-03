import { Equal, Expect } from '@type-challenges/utils'

// 通过索引类型遍历目标类型，然后增加 readonly 标识
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P];
}

type cases = [
  Expect<Equal<MyReadonly<Todo1>, Readonly<Todo1>>>,
]

interface Todo1 {
  title: string
  description: string
  completed: boolean
  meta: {
    author: string
  }
}