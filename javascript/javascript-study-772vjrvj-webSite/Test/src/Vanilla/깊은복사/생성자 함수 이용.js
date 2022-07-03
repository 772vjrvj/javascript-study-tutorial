function copyObject(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    const copiedObject = obj.constructor();

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            copiedObject[key] = copyObject(obj[key]);
        }
    }

    return copiedObject;
}

const foo = {
    deep: {
        key: 'value'
    },
    shallow: false
};
const bar = copyObject(foo);
const arr = [1, 2, 3];
const copyArr = copyObject(arr);

//   console.log(arr); 
//   console.log(copyArr); 
//   console.log(copyArr === arr); 

bar.deep.key = 'other value';

console.log(foo); // { deep: { key: 'value' }, shallow: false }
console.log(bar); // { deep: { key: 'other value' }, shallow: false }