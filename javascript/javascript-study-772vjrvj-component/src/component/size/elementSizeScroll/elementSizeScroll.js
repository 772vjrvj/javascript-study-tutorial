const box = document.querySelector('.box');
const container = document.querySelector('.container');
const wrapper = document.querySelector('.wrapper');

console.log('box : ', box);

/*transform: translate( -50%, -50%); offset에서 제외 된다.*/
//부모의 border 안쪽 끝부터 (padding 포함)
console.log('box.offsetLeft : ', box.offsetLeft);
console.log('box.offsetTop : ', box.offsetTop);


//padding border 포함 전체 길이
console.log('box.offsetWidth : ', box.offsetWidth);
console.log('box.offsetHeight : ', box.offsetHeight);


//box.clientLeft border left값
//box.clientTop border top값
console.log('box.clientLeft : ', box.clientLeft);
console.log('box.clientTop : ', box.clientTop);


//scroll 영역제외
//content width  + padding
//content height  + padding
// * 참고 패딩이 없는 경우라면 content width는 scroll 포함되고 clientWidth 는 scroll 포함 안됨


container.onscroll = e => {
    console.log('container.scrollTop : ', container.scrollTop);
    console.log('container.scrollLeft : ', container.scrollLeft);

}

