// const myArray1 = [
//     {"ID": 1, "Cost": 200},
//     {"ID": 2, "Cost": 1000},
//     {"ID": 3, "Cost": 50},
//     {"ID": 4, "Cost": 500}
// ]
//
// // There's no real number bigger than plus Infinity
// var lowest = Number.POSITIVE_INFINITY;
// var highest = Number.NEGATIVE_INFINITY;
// var tmp;
// for (var i=myArray1.length-1; i>=0; i--) {
//     tmp = myArray1[i].Cost;
//     if (tmp < lowest) lowest = tmp;
//     if (tmp > highest) highest = tmp;
// }
// console.log(highest, lowest);
//
//
//
//
//
//
//
// var myArray2 = [
//     { id: 1, cost: 200},
//     { id: 2, cost: 1000},
//     { id: 3, cost: 50},
//     { id: 4, cost: 500}
// ]
//
//
// var min = Math.min(...myArray2.map(item => item.cost));
// var max = Math.max(...myArray2.map(item => item.cost));
//
// console.log("min: " + min);
// console.log("max: " + max);
//




let myArray3 = [
    { id: 1, cost: 200},
    { id: 2, cost: 1000},
    { id: 3, cost: 50},
    { id: 4, cost: 500}
]




myArray3.sort(function (a, b) {
    console.log('a :', a );
    console.log('b :', b );
    return a.Cost - b.Cost
})

const min = myArray3[0],
    max = myArray3[myArray3.length - 1]


console.log("min: " + min.id);
console.log("max: " + max.id);





Math.max.apply(Math, myArray.map(a => a.Cost));
Math.min.apply(Math, myArray.map(a => a.Cost));

