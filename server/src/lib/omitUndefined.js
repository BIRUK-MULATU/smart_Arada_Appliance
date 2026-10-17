export function omitUndefined(obj) {
    const result = {};
    for (const key of Object.keys(obj)) {
        if (obj[key] !== undefined)
            result[key] = obj[key];
    }
    return result;
}
//# sourceMappingURL=omitUndefined.js.map