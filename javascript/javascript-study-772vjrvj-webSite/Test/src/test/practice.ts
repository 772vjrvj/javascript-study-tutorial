class Person<T>{
    name: T;
    constructor(name: T){
        this.name = name;
    }
}

const p1 = new Person<string>('Lee1');
const p2 = new Person<string>('Lee2');
console.log('test');
