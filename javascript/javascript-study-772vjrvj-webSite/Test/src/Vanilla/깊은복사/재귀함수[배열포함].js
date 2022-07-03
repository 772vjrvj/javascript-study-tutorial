function copyObj(obj) {
    var copy = {};
    if (Array.isArray(obj)) {
      copy = obj.slice().map((v) => {
        return copyObj(v);
      });
    } else if (typeof obj === 'object' && obj !== null) {
      for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) {
          copy[attr] = copyObj(obj[attr]);
        }
      }
    } else {
      copy = obj;
    }
    return copy;
  }
  var obj = { a: 1, b: 2, c: [{ d: null, e: 'f' }] };
  var obj2 = copyObj(obj);
  obj2.a = 3;
  obj2.c[0].d = true;
  console.log(obj.a); // 1
  console.log(obj.c[0].d); // null