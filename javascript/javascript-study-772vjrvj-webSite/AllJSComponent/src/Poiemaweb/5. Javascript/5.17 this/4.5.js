function Person(name) {
    this.name = name;
}

Person.prototype.doSomething = function (callback) {
    if (typeof callback == 'function') {
        // callback.call(this);
        // this가 바인딩된 새로운 함수를 호출
        callback.bind(this)();
    }
};

function foo() {
    console.log('#', this.name);
}

var p = new Person('Lee');
p.doSomething(foo);  // 'Lee'
