// 팩토리얼
// 팩토리얼(계승)은 1부터 자신까지의 모든 양의 정수의 곱이다.
// n! = 1 * 2 * ... * (n-1) * n

function getType(target) {
    return Object.prototype.toString.call(target).slice(8, -1);
  }
  
  function isNumber(target) {
    return getType(target) === 'Number';
  }
  
  
  function factorial(n) {
    const reg=/[\.]/g;
  
    if( !isNumber(n) || isNaN(n) || n < 0 || reg.test(n))
        return;
  
    if (n < 2) return 1;
    return factorial(n - 1) * n;
  }
  
  console.log(factorial(0)); // 1
  console.log(factorial(1)); // 1
  console.log(factorial(2)); // 2
  console.log(factorial(3)); // 6
  console.log(factorial(4)); // 24
  console.log(factorial(5)); // 120
  console.log(factorial(6)); // 720