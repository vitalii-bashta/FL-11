let a = parseFloat(prompt('Enter a', ''));
let b = parseFloat(prompt('Enter b', ''));
let c = parseFloat(prompt('Enter C', ''));

if (isNaN(a) || isNaN(b) || isNaN(c)) {
    console.log('Enter numeric values!');
} else {
    if (a + b <= c || b + c <= a || c + a <= b) {
        console.log('Triangle doesn’t exist');
    } else if (a === b && b === c) {
        console.log('Equivalent triangle');
    } else if (a === b || b === c || a === c) {
        console.log('Isosceles triangle')
    } else {
        console.log('Normal triangle');
    }
}
