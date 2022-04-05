function myclass(){
}

myclass.prototype.x = 1 //enum = t, confi = t, writa = t

Object.defineProperty(myclass.prototype, 'y', {
    writable: false,
    value: 1,
});

var a = new myclass();
console.log('a.x: ', a.x);
a.x = 2;
console.log('a.x: ', a.x);
console.log('myclass.prototype.x: ', myclass.prototype.x);
console.log('a.y:', a.y);
a.y = 5;
console.log('a.y:', a.y);
