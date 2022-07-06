type Falsy = "" | 0 | [] | Record<PropertyKey, never> | false;
type AnyOf<T extends any[]> = T extends Falsy[] ? false : true;
