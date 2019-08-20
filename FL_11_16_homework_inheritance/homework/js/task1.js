function myAssign() {
    let target = arguments[0];
    for (let i = 1; i < arguments.length; i++) {
        let nextSource = arguments[i];
        for (let nextKey in nextSource) {
            if (nextSource.hasOwnProperty(nextKey)) {
                target[nextKey] = nextSource[nextKey];
            }
        }
    }
    return target;
}

const defaults = {
    a: 123,
    b: 777
};
const options = {
    a: 456
};
const configs = myAssign({}, defaults, options);
