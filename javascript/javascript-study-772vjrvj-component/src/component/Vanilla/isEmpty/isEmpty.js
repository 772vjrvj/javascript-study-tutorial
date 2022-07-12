function isEmptyObj(obj)  {
  // 객체 타입체크
  if (obj === null) {
    return true;
  }
  
  // property 체크
  for(let prop in obj)  {
    if(obj.hasOwnProperty(prop))  {
      return false;
    }
  }
  
  return true;
}

const obj1 = {};
const obj2 = {name: 'js'};
const str = "Javascript";
const test1 = undefined;
const test2 = null;
const test3 = new Map;
const test4 = new Function;

document.writeln(isEmptyObj(obj1)); // true
document.writeln(isEmptyObj(obj2)); // false
document.writeln(isEmptyObj(str));  // false
document.writeln(isEmptyObj(test1));  // false
document.writeln(isEmptyObj(test2));  // false
document.writeln(isEmptyObj(test3));  // false