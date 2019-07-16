const isAdult = 18;
const milisecondInSecond = 1000;
const secondsInMinute = 60;
const minutesInHour = 60;
const hoursInDay = 24;

let data = [{
        '_id': '5b5e3168c6bf40f2c1235cd6',
        'index': 0,
        'age': 39,
        'eyeColor': 'green',
        'name': 'Stein',
        'favoriteFruit': 'apple'
    },
    {
        '_id': '5b5e3168e328c0d72e4f27d8',
        'index': 1,
        'age': 38,
        'eyeColor': 'blue',
        'name': 'Cortez',
        'favoriteFruit': 'strawberry'
    },
    {
        '_id': '5b5e3168cc79132b631c666a',
        'index': 2,
        'age': 2,
        'eyeColor': 'blue',
        'name': 'Suzette',
        'favoriteFruit': 'apple'
    },
    {
        '_id': '5b5e31682093adcc6cd0dde5',
        'index': 3,
        'age': 19,
        'eyeColor': 'green',
        'name': 'George',
        'favoriteFruit': 'banana'
    }
];

function getNumbers(str) {
    let splitArr = str.split('');
    let mapArr = mapArray(splitArr, function (el) {
        return parseFloat(el);
    });
    return filterArray(mapArr, function (val) {
        return !isNaN(val)
    });
}

function findTypes(...args) {
    let result = {};
    args.forEach(function (el) {
        if (result[typeof el]) {
            result[typeof el]++
        } else {
            result[typeof el] = 1;
        }
    });
    return result;
}

function executeForEach(arr, fn) {
    for (let i = 0; i < arr.length; i++) {
        fn(arr[i]);
    }
}

function mapArray(arr, fn) {
    let newArr = [];
    executeForEach(arr, function (el) {
        newArr.push(fn(el))
    });
    return newArr;
}

function filterArray(arr, fn) {
    let transformedArr = [];

    executeForEach(arr, function (el) {
        if (fn(el)) {
            transformedArr.push(el)
        }
    });

    return transformedArr;
}

function showFormattedDate(date) {
    return 'Date: ' + date.toLocaleString('default', {
        month: 'short'
    }) + ' ' + date.getDate() + ' ' + date.getFullYear();
}

function canConvertToDate(dateString) {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
}

function daysBetween(dateOne, dateTwo) {
    const msPerDay = milisecondInSecond * secondsInMinute * minutesInHour * hoursInDay;
    const utc1 = Date.UTC(dateOne.getFullYear(), dateOne.getMonth(), dateOne.getDate());
    const utc2 = Date.UTC(dateTwo.getFullYear(), dateTwo.getMonth(), dateTwo.getDate());

    return Math.floor((utc2 - utc1) / msPerDay);
}

function getAmountOfAdultPeople(arr) {
    return filterArray(arr, function (param) {
        return param.age > isAdult;
    }).length;
}

function keys(obj) {
    let arr = [];
    for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            arr.push(prop);
        }
    }
    return arr;
}

function values(obj) {
    let arr = [];
    for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            arr.push(obj[prop]);
        }
    }
    return arr;
}
