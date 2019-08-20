function myCreate(obj) {
    let newObj = {};
    Object.setPrototypeOf(newObj, obj);
    return newObj;
}

const obj1 = {
    prop: 5
};
const obj2 = myCreate(obj1);

Object.getPrototypeOf(obj2) === obj1;
obj2.prop;
