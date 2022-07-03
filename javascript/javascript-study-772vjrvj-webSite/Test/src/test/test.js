const array = ['kkk',new Number(),1.1,4, 6, 8, 9, 12, 53, {'a':'kkk1a'},'',' ',function(){},
-17, 2, 5, 7, 31, 97, -1, 17, null,NaN, 1.1, undefined];

console.log(array.filter(isPrime));

// 타입 체크 
function getType(target) {
  return Object.prototype.toString.call(target).slice(8, -1);
}

//prime체크
function isPrime(num) {
  const reg=/[\.]/g;
  //Number 타입 체크(소수 제외 ex(1.2))
  if (getType(num) !== 'Number' || isNaN(num) || reg.test(num)) {
    return false;
  }
  
  const prime = num;
  
  if (prime <= 1)
    return false;
  else if (prime === 2)
    return true;
  else {
    for (let i = 2; i < num; i++)
      if (prime % i === 0)
        return false;
    return true;
  }
}
