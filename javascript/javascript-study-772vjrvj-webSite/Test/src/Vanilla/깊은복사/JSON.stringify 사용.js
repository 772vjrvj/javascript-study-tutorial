//느리다고 알려짐
const obj = {
    a: 1,
    b: {
      c: 2,
    },
  };
  
  const copiedObj = JSON.parse(JSON.stringify(obj));
  
  copiedObj.b.c = 3
  
  obj.b.c === copiedObj.b.c //false 