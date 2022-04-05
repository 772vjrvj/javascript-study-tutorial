const n1 = 123456789.123;
const n2 = -1234567891.123;

const cn1 = n1.toString()
.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
const cn2 = n2.toString()
.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

console.log('cn1 : ', cn1);
console.log('cn2 : ', cn2);
