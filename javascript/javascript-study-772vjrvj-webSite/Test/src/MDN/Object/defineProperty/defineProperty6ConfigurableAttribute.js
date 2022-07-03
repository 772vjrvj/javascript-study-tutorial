var o = {};
Object.defineProperty(o, 'a', {
    get() { return 1; },
    configurable: false
});

Object.defineProperty(o, 'a', {
    configurable: true
}); // throws a TypeError
Object.defineProperty(o, 'a', {
    enumerable: true
}); // throws a TypeError
Object.defineProperty(o, 'a', {
    set() {}
}); // throws a TypeError (set was undefined previously)
Object.defineProperty(o, 'a', {
    get() { return 1; }
}); // throws a TypeError
// (even though the new get does exactly the same thing)
Object.defineProperty(o, 'a', {
    value: 12
}); // throws a TypeError // ('value' can be changed when 'configurable' is false but not in this case due to 'get' accessor)

console.log(o.a); // logs 1
delete o.a; // Nothing happens
console.log(o.a); // logs 1
