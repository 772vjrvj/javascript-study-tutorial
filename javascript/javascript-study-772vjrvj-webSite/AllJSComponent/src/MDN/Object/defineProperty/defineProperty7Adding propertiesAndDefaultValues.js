var o = {}

o.a = 1;

Object.defineProperty(o, 'a', {
    value: 1,
    writable: true,
    configurable: true,
    enumerable: true,
});

Object.defineProperty(o, 'a', {
    value: 1
});

Object.defineProperty(o, 'a', {
    value: 1,
    writable: false,
    enumerable: false,
    configurable: false,
});
