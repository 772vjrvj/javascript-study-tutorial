// using __proto__
var obj = {};
var descriptor = Object.create(null); // no inherited properties
descriptor.value = 'static';

// not enumerable, not configurable, not writable as defaults
Object.defineProperty(obj, 'key', descriptor);

// being explicit
Object.defineProperty(obj, 'key', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: 'static'
});

// recycling same object
function withValue(value) {
    var d = withValue.d || (
        withValue.d = {
            enumerable: false,
            writable: false,
            configurable: false,
            value: value
        }
    );

    // avoiding duplicate operation for assigning value
    if (d.value !== value) d.value = value;

    return d;
}
// ... and ...
Object.defineProperty(obj, 'key', withValue('static'));

// if freeze is available, prevents adding or
// removing the object prototype properties
// (value, get, set, enumerable, writable, configurable)
(Object.freeze || Object)(Object.prototype);
