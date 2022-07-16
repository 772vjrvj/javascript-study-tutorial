const ko = 'kokokoko';

const match1 = ko.match(/(ko)+/);
console.log('match1 : ', match1);
// ["kokokoko", "ko", index: 0, input: "kokokoko", groups: undefined]

const match2 = ko.match(/(?:ko)+/);
console.log('match2 : ', match2);
// ["kokokoko", index: 0, input: "kokokoko", groups: undefined]


const match3 = /(?:ko)+/.exec(ko);
console.log('match3 : ', match3);

