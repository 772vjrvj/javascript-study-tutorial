const test = [1,2,3,4];

const test2 = Array.prototype.slice.call(test);
const test3 = test.slice(0);
const test4 = [...test];

let test5 = [];
for (const item of test) {
    test5.push(item);
}

let test6 = [];
test.forEach(element => {
    test6.push(element);
});

let test7 = [];
for (let index = 0; index < test.length; index++) {
    const element = test[index];
    test7.push(element);
}

console.log(test2);
console.log(test3);
console.log(test4);
console.log(test5);
console.log(test6);
console.log(test7);
