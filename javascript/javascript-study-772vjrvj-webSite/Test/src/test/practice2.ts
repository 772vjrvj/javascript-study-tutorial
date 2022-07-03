class Person2<T>{
    name: T;
    constructor(name: T){
        this.name = name;
    }
}

const p11 = new Person2<string>('Lee1');
const p12 = new Person2<string>('Lee2');
console.log('test');
