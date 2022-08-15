const box = document.querySelector('.box');
const container = document.querySelector('.container');
const wrapper = document.querySelector('.wrapper');


/*transform: translate( -50%, -50%); offset에서 제외 된다.*/
//부모의 border 안쪽 끝부터 자식 border 밖까지 (padding 포함)
console.log('box.offsetLeft : ', box.offsetLeft);
console.log('box.offsetTop : ', box.offsetTop);


//padding border 포함 전체 길이
console.log('box.offsetWidth : ', box.offsetWidth);
console.log('box.offsetHeight : ', box.offsetHeight);


//box.clientLeft border left값
//box.clientTop border top값
console.log('box.clientLeft : ', box.clientLeft);
console.log('box.clientTop : ', box.clientTop);


//box.clientWidth border 안의 width 스크롤 제외
//box.clientHeight border 안의 height 스크롤 제외
// * 참고 패딩이 없는 경우라면 content width는 scroll 포함되고 clientWidth 는 scroll 포함 안됨
console.log('box.clientWidth : ', box.clientWidth);
console.log('box.clientHeight : ', box.clientHeight);

