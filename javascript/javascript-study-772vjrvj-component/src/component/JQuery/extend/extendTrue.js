//================================================깊은 복제========================//
// 객체가 가진 값이 객체일때 $.extend함수에서 true 옵션에 따라 깊은복사, 얕은복사가 된다.
var obj = { "a": { "aa": 100 }};  
var objCopy = $.extend(true, {}, obj); // 깊은 복사(deep copy)
objCopy.a.aa = 1000;
console.log(obj);  // obj.a.aa의 속성값은 100으로 유지됨
console.log(objCopy);  
