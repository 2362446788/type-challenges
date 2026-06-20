Implement a typeDeepOmit, Like Utility types Omit, A type takes two arguments.

For example:

```ts
type obj = {
  person: {
    name: string;
    age: {
      value: number
    }
  }
}

type test1 = DeepOmit<obj, 'person'>    // {}
type test2 = DeepOmit<obj, 'person.name'> // { person: { age: { value: number } } }
type test3 = DeepOmit<obj, 'name'> // { person: { name: string; age: { value: number } } }
type test4 = DeepOmit<obj, 'person.age.value'> // { person: { name: string; age: {} } }
```