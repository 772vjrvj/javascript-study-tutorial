function myclass() {
}

var value;
Object.defineProperty(myclass.prototype, "x", {
    get() {
        return value;
    },
    set(x) {
        value = x;
    }
});

var a = new myclass();
var b = new myclass();
a.x = 1;
console.log(b.x); // 1
