window.addEventListener("DOMContentLoaded", () => {
    console.log('DOMContentLoaded');

    var slider = document.getElementById('swiper-container'),
        sliderItems = document.getElementById('swiper-wrapper'),
        prev = document.getElementById('slider-arrow-left'),
        next = document.getElementById('slider-arrow-right'),
        btn = document.querySelector('.btn'),
        tabmenuList = document.querySelectorAll('input[name="tabmenu"]');



    function slide(wrapper, items, prev, next, btn, tabmenuList) {
        var posX1 = 0,
            posX2 = 0,
            posInitial,
            posFinal,
            index = 0,
            allowShift = true,
            silderLeft = wrapper.getBoundingClientRect().left, //절대 좌표
            isLock = false;

        //api 호출로 대체 가능
        var slides = items.getElementsByClassName('swiper-slide'),
            slidesLength = slides.length,
            firstSlide = slides[0],
            lastSlide = slides[slidesLength - 1],
            cloneFirst = firstSlide.cloneNode(true),
            cloneLast = lastSlide.cloneNode(true);

        // Clone first and last slide
        items.appendChild(cloneFirst);
        items.insertBefore(cloneLast, firstSlide);
        wrapper.classList.add('loaded');

        items.style.width =  100 *(slidesLength + 2) + '%';
        items.style.left = '-100%';

        var innerWidth = 100 / (slidesLength + 2) + '%'

        for (let index = 0; index < items.children.length; index++) {
            const element = items.children[index];
            element.style.width = innerWidth;
            if(index === 0 || index === items.children.length-2){
                element.style.background = 'green';
            }else if(index === 1 ||index === items.children.length-1){
                element.style.background = 'violet';
            }else{
                element.style.background = 'yellow';
            }
        }


        for (let index = 0; index < btn.children.length; index++) {
            const element = btn.children[index];
            element.addEventListener('click', (e) => {
                const forId = element.getAttribute('for');

                tabmenuList.forEach((tabmenu, index) => {
                    if(tabmenu.id === forId){
                        tabmenu.checked = true;
                        shiftMenu(index);
                    }
                });

            })
        }

        // Mouse events
        items.onmousedown = dragStart;

        // Touch events
        items.addEventListener('touchstart', dragStart);
        items.addEventListener('touchend', dragEnd);
        items.addEventListener('touchmove', dragAction);

        // Click events
        prev.addEventListener('click', function () { shiftSlide(-1) });
        next.addEventListener('click', function () { shiftSlide(1) });

        // Transition events
        items.addEventListener('transitionend', checkIndex);

        var clientWidth = document.documentElement.clientWidth;

        function dragStart (e) {
            if(!isLock){
                e = e || window.event;
                e.preventDefault();
                posInitial = items.offsetLeft;
                clientWidth = document.documentElement.clientWidth;

                if (e.type == 'touchstart') {
                    posX1 = e.touches[0].clientX;
                } else {
                    posX1 = e.clientX;
                    document.onmouseup = dragEnd;
                    document.onmousemove = dragAction;
                }
            }
        }

        function dragAction (e) {
            e = e || window.event;

            if (e.type == 'touchmove') {
                posX2 = posX1 - e.touches[0].clientX;
                posX1 = e.touches[0].clientX;
            } else {
                
                posX2 = posX1 - e.clientX;
                posX1 = e.clientX;
                if(e.clientX >= silderLeft && e.clientX <= silderLeft + clientWidth){
                    items.style.left = (items.offsetLeft - posX2) + "px";
                }
            }
        }

        function dragEnd (e) {
            posFinal = items.offsetLeft;

            var threshold = clientWidth * (1/8);

            //마지막 위치와 시작 위치의 절대값 차이가 100이 넘어야 한다.
            //|posFinal - posInitial| > 100
            // (-400 + -101)  - (-400) < -(100) 
            // 1/4만큼 왼쪽으로 더 가야 이동 ... 
            if (posFinal - posInitial < -threshold) {
                //오른쪽 방향
                //숫자는 감소
                shiftSlide(1, 'drag');


                // (-400 + + 101)  - (-400) > (100) 
                // 1/4만큼 오른쪽로 더 가야 이동 ... 
            } else if (posFinal - posInitial > threshold) {
                //오른쪽 방향
                //숫자는 감소
                shiftSlide(-1, 'drag');
            } else {
                items.style.left = -(100 + (index * 100)) + '%';
            }

            document.onmouseup = null;
            document.onmousemove = null;
        }

        function shiftMenu(idx, action){
            items.classList.add('shifting');
            if (allowShift && index !== idx) {
                index = idx;
                allowShift = false;
                if (!action) { posInitial = items.offsetLeft; }
                items.style.left = -(100 + ((index) * 100)) + '%';
            };

        }

        function shiftSlide(dir, action) {
            if (allowShift) {
                items.classList.add('shifting');
                allowShift = false;
                if (!action) { posInitial = items.offsetLeft; }

            //오른쪽 버튼
                if (dir == 1) {
                    isLock = true;
                    items.style.left = -(100 + ((index + 1) * 100)) + '%';
                    index++;
                //왼족버튼
                } else if (dir == -1) {
                    isLock = true;
                    items.style.left =  (-100 - ((index - 1) * 100) ) + '%';
                    index--;
                }
            };

        }

        function checkIndex (){
            items.classList.remove('shifting');
            //왼쪽으로 읻홍(숫자 증가) 하면서 slide가 5에서 1(복사본)로 간경우
            if (index == -1) {
                items.style.left = -(slidesLength * 100) + "%";
                index = slidesLength - 1;
            }

        //오른쪽 이동 (숫자 감소) 하면서 slide가 1번에서 끝번호 5번이으로 온경우 5번은 복사 본이므로 원본으로 이동시켜야함
            if (index == slidesLength) {
                items.style.left = '-100%';
                index = 0;
            }
            tabmenuList[index].checked = true;

            allowShift = true;
            isLock = false;
        }
    }

    slide(slider, sliderItems, prev, next, btn, tabmenuList);


}); //javascript

window.addEventListener('load', ()=>{
    console.log('load');
})