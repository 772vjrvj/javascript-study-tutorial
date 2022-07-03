const obj = {
    a: 1,
    b: {
      c: 2,
    },
  };
  
  function copyObj(obj) {
    const result = {};
  
    for (let key in obj) {
      if (typeof obj[key] === 'object') {
        result[key] = copyObj(obj[key]);
      } else {
        result[key] = obj[key];
      }
    }
  
    return result;
  }
  
  const copiedObj = copyObj(obj);
  
  copiedObj.b.c = 3
  
  obj.b.c === copiedObj.b.c //false 