// for ... in 객체 순환 ================
var obj = {
    a: 1,
    b: 2,
    c: 3
  };
  
  for (var item in obj) {
    console.log(item) // a, b, c
  }
  // for ... of 에선 에러남
  var obj = {
    a: 1,
    b: 2,
    c: 3
  };
  
  for (var item of obj) {
    console.log(item) // Uncaught TypeError: obj is not iterable
  }
  // for ... in 객체 순환 ================
  
  
  // for ... of 배열 순환 ================
  var arr = [1, 2, 3];
  
  for (var item of arr) {
    console.log(item); // 1, 2, 3
  }
  
  var arr = [1, 2, 3];
  //배열은  in 에서 key값 index 가져옴
  for (var item in arr) {
    console.log(item); // 0, 1, 2
  }
  // for ... of 배열 순환 ================
  Object.prototype.objCustom = function () {};
  Array.prototype.arrCustom = function () {};
  
  let iterable = [3, 5, 7];
  iterable.foo = "hello"; //
  
  //foo arrCustom objCustom 은 중간에 추가된 것들이다 
  for (let i in iterable) {
    console.log(i); // logs 0, 1, 2, "foo", "arrCustom", "objCustom"
  }
  
  for (let i of iterable) {
    console.log(i); // logs 3, 5, 7
  }
  