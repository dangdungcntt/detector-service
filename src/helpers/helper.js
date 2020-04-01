const path = require('path');

global.data_get = (target, path, _default = null) => {
    if (!target || typeof target !== 'object') return _default;
    if (['undefined', 'function'].includes(typeof path) || path == null) return target;

    path = Array.isArray(path) ? path : (path + '').split('.');

    while (path.length) {
        let key = path.shift();
        if (!target[key]) return _default;
        target = target[key];
    }

    return target;
};

global.__root = path.resolve(__dirname + '/../../');