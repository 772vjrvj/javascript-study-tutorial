
//프로젝트중에 인풋값을 넣으면 검증결과 값이 나오는 데이터가 있었다. 인풋값이 만개면 결과도 만개가 만들어 지는 구조였다.
// 그래서 검증 결과 데이터를 받으면 그 객체 안에 인풋값과 결과 값이 들이 같이 들어 있고 그것들이 비교하는 화면을 만들어야 하는 상황 이었다.




//test1

console.time('test1');
const test1Obj = {
  input : {

  },
  output: []
}
for (let index = 0; index < 10000; index++) {
  const inputKey = 'testInputKey' + index;
  const inputVal = ['testInputVal' + index]
  test1Obj.input[inputKey] = inputVal;
  const testOutput = {
    key : 'testInputKey' + index,
    val1 : 'testOutputVal1-' + index,
    val2 : 'testOutputVal2-' + index,
    val3 : 'testOutputVal3-' + index,
  }
  test1Obj.output[index] = testOutput
}
const test2Obj = _.cloneDeep(test1Obj);
const test3Obj = _.cloneDeep(test1Obj);
console.timeEnd('test1');


//856ms
// console.time('test2');

////input의 key들을 가져오고 ['testInputKey0', ..]
// const keys = _.keys(test1Obj.input); 
// const keysLen = keys.length;
// const result = [];

////key들의 수만큼 for문을 돌면서 찾는다.
// let count = 0;
// for (let i = 0; i < keysLen; i++) {

//   let rsObj = {}

//   const inputkey = keys[i];
//   const output = test1Obj.output;

//   const findItem = _.find(output, (item, idx) => {
//     count += 1;
//     return item.key === inputkey
//   });

//   rsObj.val1 = findItem.val1;
//   rsObj.val2 = findItem.val2;
//   rsObj.val3 = findItem.val3;

//   result[i] = rsObj;
// }
// console.log('count : ', count);
// console.timeEnd('test2');



//26.03515625 ms
console.time('test3');

const keys = _.keys(test1Obj.input)
const keysLen = keys.length;
const result = [];

const test1ObjOutput = _.keyBy(test1Obj.output, 'key');

let cnt = 0;
for (let i = 0; i < keysLen; i++) {

  let rsObj = {}

  const inputkey = keys[i];
  const output = test1ObjOutput[inputkey];

  rsObj.val1 = output.val1;
  rsObj.val2 = output.val2;
  rsObj.val3 = output.val3;

  result[i] = rsObj;
}
console.timeEnd('test3');








// console.time('test3');

// const keys = _.keys(test1Obj.input)
// const keysLen = keys.length;
// const result = new Array(keysLen);
// const output = test1Obj.output;
// const outputLen = output.length;

// //const test1ObjOutput = _.keyBy(test1Obj.output, 'key');
// let test1ObjOutput = {}
// for (let idx = 0; idx < outputLen; idx++) {
//   const ob = output[idx];
//   test1ObjOutput[ob.key] = ob;
// }


// let cnt = 0;
// for (let i = 0; i < keysLen; i++) {

//   let rsObj = {}

//   const inputkey = keys[i];
//   const output = test1ObjOutput[inputkey];

//   rsObj.val1 = output.val1;
//   rsObj.val2 = output.val2;
//   rsObj.val3 = output.val3;

//   result[i] = rsObj;
// }
// //console.log('result : ', result);
// console.timeEnd('test3');





// console.time('test3');

// const keys = _.keys(test1Obj.input)
// const keysLen = keys.length;
// const result = new Array(keysLen);
// const output = test1Obj.output;
// const outLen = output.length;

// let test1ObjOutput = new Map;
// for (let idx = 0; idx < outLen; idx++) {
//   test1ObjOutput.set(output[idx].key, output[idx])
// }

// let cnt = 0;
// for (let i = 0; i < keysLen; i++) {

//   let rsObj = {}

//   const inputkey = keys[i];
//   const output = test1ObjOutput.get(inputkey);

//   rsObj.val1 = output.val1;
//   rsObj.val2 = output.val2;
//   rsObj.val3 = output.val3;

//   result[i] = rsObj;
// }
// //console.log('result : ', result);
// console.timeEnd('test3');



// console.time('test3');
// const keys = _.keys(test1Obj.input)
// const keysLen = keys.length;
// const result = new Array(keysLen);

// const output = test1Obj.output;
// //const outputLen = output.length;


// const arrMap = output.reduce((map, obj) => {
//   map.set(obj.key, obj);
//   return map;
// }, new Map);

// // let arrMap = new Map;
// // for (let index = 0; index < outputLen; index++) {
// //   arrMap.set(output[index].key, output[index]);
// // }


// for (let i = 0; i < keysLen; i++) {

//   let rsObj = {}

//   const inputkey = keys[i];
//   const output = arrMap.get(inputkey);

//   rsObj.val1 = output.val1;
//   rsObj.val2 = output.val2;
//   rsObj.val3 = output.val3;

//   result[i] = rsObj;
// }
// //console.log('result : ', result);
// console.timeEnd('test3');








//test3