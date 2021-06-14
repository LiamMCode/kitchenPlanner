export type DeepReadonly<T>
    = T extends Array<infer AV>         ? DeepReadonlyArray<AV>
    : T extends Set<infer SV>           ? DeepReadonlySet<SV>
    : T extends Map<infer MK, infer MV> ? DeepReadonlyMap<MK, MV>
    : T extends Object                  ? { [K in keyof T]: DeepReadonly<T[K]> }
    : T;

export type DeepReadonlyArray<V>  = ReadonlyArray<DeepReadonly<V>>;
export type DeepReadonlySet<V>    = ReadonlySet<DeepReadonly<V>>;
export type DeepReadonlyMap<K, V> = ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>;
