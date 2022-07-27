const objArr = [
    {width : 700, height : 1000, cnt: 40},
    {width : 700, height : 200, cnt: 80},
    {width : 1000, height : 400, cnt: 20}
]

const widthArr = objArr.map(o => o.width);
const widthMin = Math.min(...widthArr);
console.log('widthMin : ', widthMin);

const heightArr = objArr.map(o => o.height);
const heightMin = Math.min(...heightArr);
console.log('heightMin : ', heightMin);

let max = objArr[0];

for (let i = 0; i < objArr.length; i++) {
    const cnt = objArr[i].cnt
    if(cnt > max.cnt) max = objArr[i];
}

console.log('max ; ', max);