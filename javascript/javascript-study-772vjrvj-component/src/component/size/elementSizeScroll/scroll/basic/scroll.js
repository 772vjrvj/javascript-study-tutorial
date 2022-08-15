const box = document.querySelector('.box');
const container = document.querySelector('.container');
const wrapper = document.querySelector('.wrapper');

function getScrollbarWidth() {
    // Creating invisible container
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll'; // forcing scrollbar to appear
    outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
    document.body.appendChild(outer);

    // Creating inner element and placing it in the container
    const inner = document.createElement('div');
    outer.appendChild(inner);

    // Calculating difference between container's full width and the child width
    const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

    // Removing temporary elements from the DOM
    outer.parentNode.removeChild(outer);

    return scrollbarWidth;
}

console.log('scroll Width : ', getScrollbarWidth());

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



console.log('container.scrollWidth : ', container.scrollWidth);
console.log('container.scrollHeight : ', container.scrollHeight);

container.onscroll = e => {
    console.log('container.scrollTop : ', container.scrollTop);
    console.log('container.scrollLeft : ', container.scrollLeft);
}

