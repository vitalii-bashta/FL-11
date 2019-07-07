const divider = 2;
let a1 = parseFloat(prompt('Enter a1', ''));
let a2 = parseFloat(prompt('Enter a2', ''));
let b1 = parseFloat(prompt('Enter b1', ''));
let b2 = parseFloat(prompt('Enter b2', ''));
let c1 = parseFloat(prompt('Enter c1', ''));
let c2 = parseFloat(prompt('Enter c2', ''));

if (isNaN(a1) || isNaN(a2) || isNaN(b1) || isNaN(b2) || isNaN(c1) || isNaN(c2)) {
    alert('Please enter numeric values!')
} else {
    console.log(c1 === (a1 + b1)/divider && c2 === (a2 + b2)/divider);
} 
