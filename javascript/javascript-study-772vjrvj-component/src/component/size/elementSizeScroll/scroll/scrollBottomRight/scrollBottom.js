const box = document.querySelector('.box');
const container = document.querySelector('.container');
const wrapper = document.querySelector('.wrapper');

container.onscroll = e => {
    const scrollTop = container.scrollTop;
    const scrollLeft = container.scrollLeft;
    const scrollHeight = container.scrollHeight;
    const scrollWidth = container.scrollWidth;
    const clientHeight = container.clientHeight;
    const clientWidth = container.clientWidth;
    const scrollBottom = scrollHeight - scrollTop - clientHeight;
    const scrollRight = scrollWidth - scrollLeft - clientWidth;

    console.log('scrollBottom : ', scrollBottom);
    console.log('scrollRight : ', scrollRight);
}

