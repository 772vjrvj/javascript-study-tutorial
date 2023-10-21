const fruitsA = ["a", "b", "c"];
const fruitsB = ["b", "c", "d", "e"];

//교집합 
const intersection = fruitsA.filter(fruit => fruitsB.includes(fruit));
console.log('intersection : ', intersection);

//합집합
const union = [...new Set([...fruitsA, ...fruitsB])];
console.log('union : ', union);

//차집합
const difference = fruitsA.filter(fruit => !fruitsB.includes(fruit));
console.log('difference : ', difference);

//합집합 - 교집합 배타적 논리합1
const unionMinuseIntersection1 = [
  ...fruitsA.filter(fruit => !fruitsB.includes(fruit)),
  ...fruitsB.filter(fruit => !fruitsA.includes(fruit)),
];
console.log('unionMinuseIntersection1 : ', unionMinuseIntersection1);

//합집합 - 교집합 배타적 논리합2
const unionMinuseIntersection2 = fruitsA
                 .filter(fruit => !fruitsB.includes(fruit))
                 .concat(fruitsB.filter(fruit => !fruitsA.includes(fruit))); 
console.log('unionMinuseIntersection2 : ', unionMinuseIntersection2);
