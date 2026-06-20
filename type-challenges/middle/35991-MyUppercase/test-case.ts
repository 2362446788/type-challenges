import type { Equal, Expect } from "@type-challenges/utils";

interface Mapping {
  a: "A";
  b: "B";
  c: "C";
  d: "D";
  e: "E";
  f: "F";
  g: "G";
  h: "H";
  i: "I";
  j: "J";
  k: "K";
  l: "L";
  m: "M";
  n: "N";
  o: "O";
  p: "P";
  q: "Q";
  r: "R";
  s: "S";
  t: "T";
  u: "U";
  v: "V";
  w: "W";
  x: "X";
  y: "Y";
  z: "Z";
}

type MyUppercase<T extends string> = T extends `${infer F}${infer R}`
  ? `${F extends keyof Mapping ? Mapping[F] : F}${MyUppercase<R>}`
  : "";

type cases = [
  Expect<Equal<MyUppercase<"a">, "A">>,
  Expect<Equal<MyUppercase<"Z">, "Z">>,
  Expect<
    Equal<MyUppercase<"A z h yy 😃cda\n\t  a   ">, "A Z H YY 😃CDA\n\t  A   ">
  >,
];
