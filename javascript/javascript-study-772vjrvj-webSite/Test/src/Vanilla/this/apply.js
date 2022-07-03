const numbers = [5, 6, 2, 3, 7];

//max함수는 this가 필요 없고 arg만 필요하므로 null
const max = Math.max.apply(null, numbers);

console.log(max);
// expected output: 7

const min = Math.min.apply(null, numbers);

console.log(min);
// expected output: 2



//한꺼번에 넣을 수 있는 장점이 있다.
const array = ['a', 'b'];
const elements = [0, 1, 2];
array.push.apply(array, elements);
console.info(array); // ["a", "b", 0, 1, 2]

// min/max number in an array
const numbers2 = [5, 6, 2, 3, 7];

// using Math.min/Math.max apply
let max2 = Math.max.apply(null, numbers2);
// This about equal to Math.max(numbers[0], ...)
// or Math.max(5, 6, ...)


function example3() {
  console.log(Array.prototype.join.apply(arguments));
}
example3(1, 'string', true); // '1,string,true'


function convertArgsToArray() {
  console.log(arguments);

  // arguments 객체를 배열로 변환
  // slice: 배열의 특정 부분에 대한 복사본을 생성한다.
  var arr = Array.prototype.slice.apply(arguments); // arguments.slice
  // var arr = [].slice.apply(arguments);

  console.log(arr);
  return arr;
}
convertArgsToArray(1, 2, 3);
​