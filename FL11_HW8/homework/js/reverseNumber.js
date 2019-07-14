function reverseNumber(x) {
    x = '' + x;
    let arr = x.split('');

    if (arr[0] === '-') {
        arr.push(arr.shift());
    }

    return parseFloat(arr.reverse().join(''));
}

reverseNumber(123);
reverseNumber(-456);
reverseNumber(10000);
