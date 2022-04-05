

/////////////

function Person(name) {
    this.name = name;
}

Person.prototype.doSomething = function (callback) {
    if (typeof callback == 'function') {
        callback.call(this);
    }
};

function foo() {
    console.log(this.name);
}

var p = new Person('Lee');
p.doSomething(foo);  // 'Lee'
