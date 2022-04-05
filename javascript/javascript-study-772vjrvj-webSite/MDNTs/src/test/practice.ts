class Person<T>{
    name: T;
    constructor(name: T){
        this.name = name;
    }
}

const p = new Person<string>('Lee');
