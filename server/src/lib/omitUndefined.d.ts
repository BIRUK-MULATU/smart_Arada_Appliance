type WithoutUndefined<T> = {
    [K in keyof T]?: Exclude<T[K], undefined>;
};
export declare function omitUndefined<T extends object>(obj: T): WithoutUndefined<T>;
export {};
//# sourceMappingURL=omitUndefined.d.ts.map