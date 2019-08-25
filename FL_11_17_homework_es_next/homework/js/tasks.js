function maxElement(arr) {
    return Math.max(...arr);
}

function copyArray(arr) {
    return [...arr];
}

function addUniqueID(obj) {
    return {
        ...obj,
        id: Symbol('id')
    };
}

const oldObj = {
    name: 'Someone',
    details: {
        id: 1,
        age: 11,
        university: 'UNI'
    }
};

function regroupObject(obj) {
    const {
        name: firstName,
        details: {
            id,
            age,
            university
        }
    } = obj;
    return {
        university: university,
        user: {
            age,
            firstName,
            id
        }
    }
}

function findUniqueElements(arr) {
    return Array.from(new Set(arr));
}

function hideNumbers(phoneNum) {
    return phoneNum.slice(-4).padStart(phoneNum.length, "*");
}

function required() {
    throw new Error('Missing property');
}

function add(a = required(), b = required()) {
    return a + b;
}

function logNames() {
    fetch('https://jsonplaceholder.typicode.com/users').then((response) => {
        return response.json()
    }).then((json) => {
        let names = json.map((obj) => obj.name).sort();
        console.log(names);
    }).catch((error) => {
        console.log(error);
    })
}

async function logNamesAsync() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const json = await response.json();
        let names = json.map((obj) => obj.name).sort();
        console.log(names);
    } catch (error) {
        console.log(error);
    }
}
