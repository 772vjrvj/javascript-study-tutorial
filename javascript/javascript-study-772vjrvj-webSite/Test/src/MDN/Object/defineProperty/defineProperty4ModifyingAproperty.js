var o = {}; // Creates a new object

Object.defineProperty(o, 'a', {
    value: 37,
    writable: false
});

console.log(o.a); // logs 37
o.a = 25; // No error thrown
// (it would throw in strict mode,
// even if the value had been the same)
console.log(o.a); // logs 37. The assignment didn't work.

// strict mode
(function() {
    'use strict';
    var o = {};
    Object.defineProperty(o, 'b', {
        value: 2,
        writable: false
    });
    o.b = 3; // throws TypeError: "b" is read-only
    return o.b; // returns 2 without the line above
}());
