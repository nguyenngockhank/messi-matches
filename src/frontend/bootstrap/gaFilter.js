
let gaFilter = null;

export function createGaFilter(callback) {
    if (gaFilter) {
        return gaFilter;
    }

    const gaFilterObj = {};
    gaFilter = new Proxy(gaFilterObj, {
        set: function (target, key, value) {
            target[key] = value;
            callback(target);
            return true;
        }
    });
    return gaFilter;
}

export function getGaFilter() {
    return gaFilter;
}