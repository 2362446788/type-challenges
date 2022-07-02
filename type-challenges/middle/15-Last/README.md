TypeScript 4.0 is recommended in this challenge

Implement a generic Last<T> that takes an Array T and returns its last element.

For example

```javascript
type arr1 = ["a", "b", "c"];
type arr2 = [3, 2, 1];

type tail1 = Last<arr1>; // expected to be 'c'
type tail2 = Last<arr2>; // expected to be 1
```