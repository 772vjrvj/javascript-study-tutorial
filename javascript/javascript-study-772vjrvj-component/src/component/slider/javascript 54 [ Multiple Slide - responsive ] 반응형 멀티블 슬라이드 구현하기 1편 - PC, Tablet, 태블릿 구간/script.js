    var slides = document.querySelector('.slides'),
        slide = document.querySelectorAll('.slides li'),
        currentIdx = 0,
        slideCount = slide.length,
        slideWidth = 200,
        slideMargin = 30,
        moveAmt = slideWidth + slideMargin,
        maxSlides = 3,
        prevBtn = document.querySelector('.prev'),
        nextBtn = document.querySelector('.next');

    makeClone();

    //복사본 생성하기
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
        // setInitialPos(); //맨앞으로 이동
        // setTimeout(function(){
        //     slides.classList.add('animated');
        // },100);

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

    function moveSlide(num){
        console.log('num:', num);
        slides.style.left = -num *(slideWidth + slideMargin) + 'px';
        currentIdx = num;
        console.log(currentIdx, slideCount);
        if(currentIdx === slideCount || currentIdx === -slideCount){
            setTimeout(function(){
                slides.classList.remove('animated');
                slides.style.left = '0px';
                currentIdx = 0;
            }, 300);
            setTimeout(function(){
                slides.classList.add('animated');
                clickHold = 0;
                console.log('clickHold',clickHold);
            }, 400)
        }else{
            setTimeout(function(){
                clickHold = 0;
            }, 400)
        }

    }

    //가로 배열하기
    function slideLayout(){
        var newslide = document.querySelectorAll('.slides li ');
        newslide.forEach(function (item, index){
            item.style.left = moveAmt*index + 'px';
        });
    }

    slideLayout();

    //중앙 배치 하기
    function setSlide(){
        var ulMoveAmt = -slideCount * moveAmt + 'px';
        slides.style.transform = 'translateX(' + ulMoveAmt + ')';
        slides.classList.add('animated');
    }
    setSlide();


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

    var timer = undefined;

    function autoSlide(){
        if(timer === undefined){
            timer = setInterval(function(){
                moveSlide(currentIdx + 1);
            }, 3000);
        }
    }

    autoSlide();
    function stopSlide(){
        clearInterval(timer);
        timer = undefined;
        console.log(timer);
    }

    slides.addEventListener('mouseenter', function(){
        stopSlide();
    });
    slides.addEventListener('mouseleave', function(){
        autoSlide();
    });

    //반응형 슬라이드
    window.addEventListener('resize', function(){
        var currentWidth =  document.querySelector('body').offsetWidth;
        console.log(currentWidth);
       if(currentWidth < 700){
            var slides
       }
    });

