function isInteger(x) {
    return typeof !isNaN(parseFloat(x)) && (x % 1 === 0);
}

isInteger(5);
isInteger(5.1);
