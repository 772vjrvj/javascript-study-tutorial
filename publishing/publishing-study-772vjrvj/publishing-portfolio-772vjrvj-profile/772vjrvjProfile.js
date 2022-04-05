const navs = document.querySelectorAll('#nav ul li');
const navsArr = [...navs]
const conts = document.querySelectorAll('#contents > div');
const contsArr = [...conts];
const fills = document.querySelectorAll('.progress-fill');
const fillsArr = [...fills];
const mNav = document.querySelector('.mNav');
const menu=  document.querySelector('.menu');



let setT;
navsArr.forEach((nav, idx)=> {
    nav.addEventListener('click', (e) => {
        e.preventDefault();
        const xTo = [...conts][idx].offsetTop;
        const xFrom = document.documentElement.scrollTop;
        clearTimeout(setT);
        scrollToX(xFrom, xTo, 0, 1/300, 10);

        if(window.getComputedStyle(menu).display !=='none' && window.getComputedStyle(mNav).display !=='none'){
            setTimeout(function(){
                menu.style.display = 'none';
            },700);
        }
    });
});


function scrollToX(xFrom, xTo, t01, speed, step){
    if(t01 >1){
        window.scroll(0, xTo);
        return;
    }
    const move = xFrom -((xFrom - xTo)* t01);
    window.scroll(0, move);
    t01 += speed * step;
    setT = setTimeout(function(){
        scrollToX(xFrom, xTo, t01, speed, step);
    },step);
}

window.addEventListener('scroll', (e) => {
    e.preventDefault();
    const wScroll = window.scrollY;

    if(Math.ceil(wScroll) >= Math.ceil(contsArr[0].offsetTop) && Math.ceil(wScroll) < Math.ceil(contsArr[1].offsetTop)){
        activeChk(navsArr, 0);
        fill('remove');
    }else if(Math.ceil(wScroll) >= Math.ceil(contsArr[1].offsetTop) && Math.ceil(wScroll) < Math.ceil(contsArr[2].offsetTop)){
        activeChk(navsArr, 1);
    }else if(Math.ceil(wScroll) >= Math.ceil(contsArr[2].offsetTop) && Math.ceil(wScroll) < Math.ceil(contsArr[3].offsetTop)){
        activeChk(navsArr, 2);
        fill('active');
    }else if(Math.ceil(wScroll) >= Math.ceil(contsArr[3].offsetTop) && Math.ceil(wScroll) < Math.ceil(contsArr[4].offsetTop)){
        fill('remove');
        activeChk(navsArr, 3);
    }else if(Math.ceil(wScroll) >= Math.ceil(contsArr[4].offsetTop) && Math.ceil(wScroll) < Math.ceil(contsArr[5].offsetTop)){
        fill('remove');
        activeChk(navsArr, 4);
    }else if(Math.ceil(wScroll) >= Math.ceil(contsArr[5].offsetTop)){
        fill('remove');
        activeChk(navsArr, 5);
    }
});

function fill(state,){
    if(state==='active'){
        contsArr[2].classList.add('active');
        fillsArr.forEach((item, idx) => {
            const width = item.getAttribute('data-att');
            item.style.width = width;
        });
        // fillsArr[0].style.width = 70 + '%'
    }else{
        contsArr[2].classList.remove('active');
        fillsArr.forEach((item, idx) => {
            item.style.width = 0 + '%'
        });
    }
}

function activeChk(arr, index){
    const findItem = arr.find((item, idx) => item.classList.contains('active'));
    findItem.classList.remove('active');
    arr[index].classList.add('active');
}

mNav.addEventListener('click', (e) => {
    if(window.getComputedStyle(menu).display ==='none'){
        menu.style.display = 'block';
    }else{
        menu.style.display = 'none';
    }
});

window.addEventListener('resize', (e) => {
    const width = window.innerWidth;
    const display = window.getComputedStyle(menu).display;
    if( width > 800 && display === 'none'){
        menu.removeAttribute('style');
    }
});

const question = document.querySelectorAll('#section6 .leftSide .question p');
const questionArr = [...question];
const answer = document.querySelectorAll('#section6 .rightSide .answer p');
const answerArr = [...answer];
questionArr.forEach((ques, idx) => {
    ques.addEventListener('click', () => {
        activeChk(questionArr, idx);
        activeChk(answerArr, idx);
    });
});

const cenQTit = document.querySelectorAll('#section6 .center .question .title');
const cenQTitArr = [...cenQTit];
const cenQCon = document.querySelectorAll('#section6 .center .question .content');
const cenQConArr = [...cenQCon];
cenQTitArr.forEach((ques, idx) => {
    ques.addEventListener('click', () => {
        activeChk(cenQTitArr, idx);
        activeChk(cenQConArr, idx);
    });
});


var slides = document.querySelector('.slides'),
    slide = document.querySelectorAll('.slides li'),
    currentIdx = 0,
    slideCount = slide.length,
    slideWidth = 300,
    slideMargin = 30,
    prevBtn = document.querySelector('.prev'),
    nextBtn = document.querySelector('.next');
    document.querySelector('#section5 .countPage .before').textContent = currentIdx + 1;
    document.querySelector('#section5 .countPage .after').textContent = slideCount;
    document.querySelector('#section5 .countPage')

makeClone();

function makeClone(){
    for(var i = 0; i<slideCount; i++){
        var cloneSlide = slide[i].cloneNode(true);
        cloneSlide.classList.add('clone');
        slides.appendChild(cloneSlide);
    }
    for(var i =slideCount -1; i >=0; i--){
        var cloneSlide = slide[i].cloneNode(true);
        cloneSlide.classList.add('clone');
        slides.prepend(cloneSlide);
    }

    updateWidth(); //전체 길이 다시 구하기
    setInitialPos(); //맨앞으로 이동
    setTimeout(function(){
        slides.classList.add('animated');
    },100);

}

function updateWidth(){
    var currentSlides = document.querySelectorAll('.slides li');
    var newSlideCount = currentSlides.length;
    var newWidth = (slideWidth + slideMargin) * newSlideCount - slideMargin + 'px';
    slides.style.width = newWidth;
}

function setInitialPos(){
    var initialTranslateValue = -(slideWidth + slideMargin) * slideCount;
    slides.style.transform = 'translateX(' + initialTranslateValue + 'px)';
}

var clickHold = 0;
nextBtn.addEventListener('click', function(){
    if(clickHold === 0){
        clickHold = 1;
        moveSlide(currentIdx + 1);
    }
});

prevBtn.addEventListener('click', function(){
    if(clickHold === 0){
        clickHold = 1;
        moveSlide(currentIdx - 1);
    }
});


function moveSlide(num){
    slides.style.left = -num *(slideWidth + slideMargin) + 'px';
    currentIdx = num;
    var pageCount;
    if(num === 7){
        pageCount = 1;
    }else if(num < 0){
        pageCount = slideCount + 1 + num;
    }else{
        pageCount = num + 1;
    }

    document.querySelector('#section5 .countPage .before').textContent = pageCount;
    if(currentIdx === slideCount || currentIdx === -slideCount){
        setTimeout(function(){
            slides.classList.remove('animated');
            slides.style.left = '0px';
            currentIdx = 0;
        }, 300);
        setTimeout(function(){
            slides.classList.add('animated');
            clickHold = 0;
        }, 450)
    }else{
        setTimeout(function(){
            clickHold = 0;
        }, 400)
    }
}



