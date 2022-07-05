
console.log('공백      isEmpty : ' + _.isEmpty(''));
console.log('0         isEmpty : ' + _.isEmpty(0));
console.log('null      isEmpty : ' + _.isEmpty(null));
console.log('undefined isEmpty : ' + _.isEmpty(undefined));
console.log('[]        isEmpty : ' + _.isEmpty([]));
console.log('{}        isEmpty : ' + _.isEmpty({}));


console.log(isEmpty(''));
console.log(isEmpty(null));
console.log(isEmpty(undefined));
console.log(isEmpty([]));
console.log(isEmpty({}));
console.log(isEmpty(new Map));
console.log(isEmpty(new Set));
console.log(isEmpty(0));

const data = 0;
const result = data !== 0 && _.isEmpty(data) ? '-' : data;
console.log(result);

function isEmpty(data){
  let result = '-';
  if(data !== 0 && _.isEmpty(data)){
    result = '-';
  }else{
    result = data;
  }
  return result;
}