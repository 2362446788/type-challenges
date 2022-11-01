type NumberRange<L, H, union = never, T extends unknown[] = []> = L extends H
  ? H | union
  : T["length"] extends L
  ? NumberRange<[...T, unknown]["length"], H, L | union, [...T, unknown]>
  : NumberRange<L, H, union, [...T, unknown]>;