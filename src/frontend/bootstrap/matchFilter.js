
let matchFilter = null;

export function createMatchFilter(callback) {
    if (matchFilter) {
        return matchFilter;
    }

    const gaFilterObj = {};
    matchFilter = new Proxy(gaFilterObj, {
        set: function (target, key, value) {
            target[key] = value;
            callback(target);
            return true;
        }
    });
    return matchFilter;
}

export function getMatchFilter() {
    return matchFilter;
}