Implement the built-in Pick<T, K> generic without using it.

Constructs a type by picking the set of properties K from T

for example

```javascript
interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = MyPick<Todo, 'title' | 'completed'>

const todo: TodoPreview = {
    title: 'Clean room',
    completed: false,
}
```
