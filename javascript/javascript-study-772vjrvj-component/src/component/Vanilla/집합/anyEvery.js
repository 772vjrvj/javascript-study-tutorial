const names = ["Kai", "Katharina", "Tim"];

// 이름이 4자보다 짧은지 확인합니다. 1개라도 있으면 true
const containsShortName = names.some(name => name.length < 4);
console.log(containsShortName); // true

// 모든 이름이 3자 이상인지 확인합니다. 모두 있어야 true
const containsLongNamesOnly = names.every(name => name.length > 3);
console.log(containsLongNamesOnly); // false