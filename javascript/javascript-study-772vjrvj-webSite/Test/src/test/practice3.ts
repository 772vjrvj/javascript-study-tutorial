class Person3<T>{
    name: T;
    constructor(name: T){
        this.name = name;
    }
}

const p31 = new Person3<string>('Lee1');
const p32 = new Person3<string>('Lee2');
console.log('p31 :', p31.name);
console.log('p32 :', p32.name);
