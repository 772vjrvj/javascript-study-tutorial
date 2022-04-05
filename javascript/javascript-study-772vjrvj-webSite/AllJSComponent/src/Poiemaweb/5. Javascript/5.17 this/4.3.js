

function Person(name) {
    this.name = name;
}

Person.prototype.doSomething = function(callback) {
    if(typeof callback == 'function') {
        // --------- 1
        callback();
    }
};

function foo() {
    console.log(this.name); // --------- 2
}

var p = new Person('Lee');
p.doSomething(foo);  // undefined
