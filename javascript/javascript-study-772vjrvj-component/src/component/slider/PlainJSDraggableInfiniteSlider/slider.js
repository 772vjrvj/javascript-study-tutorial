var slider = document.getElementById('slider'),
    sliderItems = document.getElementById('slides'),
    prev = document.getElementById('prev'),
    next = document.getElementById('next');

function slide(wrapper, items, prev, next) {
    var posX1 = 0,
        posX2 = 0,
        posInitial,
        posFinal,
        threshold = 100,
        slides = items.getElementsByClassName('slide'),
        slidesLength = slides.length,
        slideSize = items.getElementsByClassName('slide')[0].offsetWidth,
        firstSlide = slides[0],
        lastSlide = slides[slidesLength - 1],
        cloneFirst = firstSlide.cloneNode(true),
        cloneLast = lastSlide.cloneNode(true),
        index = 0,
        allowShift = true,
        silderLeft = wrapper.getBoundingClientRect().left, //절대 좌표
        isLock = false;

    // Clone first and last slide
    items.appendChild(cloneFirst);
    items.insertBefore(cloneLast, firstSlide);
    wrapper.classList.add('loaded');

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

    function dragStart (e) {
        if(!isLock){
            e = e || window.event;
            e.preventDefault();
            posInitial = items.offsetLeft;
    
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
            if(e.clientX >= silderLeft && e.clientX <= silderLeft + slideSize){
                items.style.left = (items.offsetLeft - posX2) + "px";
            }
        }
    }

    function dragEnd (e) {
        posFinal = items.offsetLeft;

        //마지막 위치와 시작 위치의 절대값 차이가 100이 넘어야 한다.
        //|posFinal - posInitial| > 100
        // (-400 + -101)  - (-400) < -(100) 
        // 1/4만큼 왼쪽으로 더 가야 이동 ... 
        if (posFinal - posInitial < -threshold) {
            console.log('1');
            //오른쪽 방향
            //숫자는 감소
            shiftSlide(1, 'drag');


            // (-400 + + 101)  - (-400) > (100) 
            // 1/4만큼 오른쪽로 더 가야 이동 ... 
        } else if (posFinal - posInitial > threshold) {
            console.log('2');
            //오른쪽 방향
            //숫자는 감소
            shiftSlide(-1, 'drag');
        } else {
            items.style.left = (posInitial) + "px";
        }

        document.onmouseup = null;
        document.onmousemove = null;
    }

    function shiftSlide(dir, action) {
        items.classList.add('shifting');

        if (allowShift) {
            if (!action) { posInitial = items.offsetLeft; }

            //왼족버튼
            if (dir == 1) {
                isLock = true;
                items.style.left = (posInitial - slideSize) + "px";
                index++;

            //오른쪽 버튼
            } else if (dir == -1) {
                isLock = true;
                items.style.left = (posInitial + slideSize) + "px";
                index--;
            }
        };

        allowShift = false;
    }

    function checkIndex (){
        items.classList.remove('shifting');

        //오른쪽 이동 (숫자 감소) 하면서 slide가 1번에서 끝번호 5번이으로 온경우 5번은 복사 본이므로 원본으로 이동시켜야함
        if (index == -1) {
            items.style.left = -(slidesLength * slideSize) + "px";
            index = slidesLength - 1;
        }

        //왼쪽으로 읻홍(숫자 증가) 하면서 slide가 5에서 1(복사본)로 간경우
        if (index == slidesLength) {
            items.style.left = -(1 * slideSize) + "px";
            index = 0;
        }

        allowShift = true;
        isLock = false;
    }
}

slide(slider, sliderItems, prev, next);
