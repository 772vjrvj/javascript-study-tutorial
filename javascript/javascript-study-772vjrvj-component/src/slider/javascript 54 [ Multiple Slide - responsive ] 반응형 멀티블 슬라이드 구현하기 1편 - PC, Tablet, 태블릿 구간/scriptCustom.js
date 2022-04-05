    var slides = document.querySelector('.slides'),
        slidesWrapper = document.querySelector('.slide_wrapper'),
        slide = document.querySelectorAll('.slides li'),
        currentIdx = 0,
        slideCount = slide.length,
        slideWidth = 200,
        slideMargin = 30,
        moveAmt = slideWidth + slideMargin,
        maxSlides = 3,
        responsiveMargin = 20,
        newslide,
        newslideWidth,
        prevBtn = document.querySelector('.prev'),
        nextBtn = document.querySelector('.next');

        newslideWidth = slideWidth;

        makeClone();
            //복사본 생성하기
        function makeClone(){
            for(var i = 0; i<maxSlides; i++){
                var cloneSlide = slide[i].cloneNode(true);
                cloneSlide.classList.add('clone');
                slides.appendChild(cloneSlide);
            }
            for(var i =slideCount -1; i >=0; i--){
                var cloneSlide = slide[i].cloneNode(true);
                cloneSlide.classList.add('clone');
                slides.prepend(cloneSlide);
            }

            updateWidth();
        }


        function updateWidth(){
            var currentSlides = document.querySelectorAll('.slides li');
            var newSlideCount = currentSlides.length;
            var newWidth = (moveAmt * newSlideCount) - slideMargin + 'px';
            slides.style.width = newWidth;
        }


        //가로 배열하기
        function slideLayout(sw, sm){
            newslide = document.querySelectorAll('.slides li ');
            moveAmt = sw + sm;
            newslide.forEach(function (item, index){
                item.style.left = moveAmt*index + 'px';
                item.style.width = newslideWidth + 'px';
            });
        }
        slideLayout(slideWidth, slideMargin);

        //중앙 배치 하기
        function setSlide(){
            var ulMoveAmt = (-slideCount * moveAmt) + 'px';
            slides.style.transform = 'translateX(' + ulMoveAmt + ')';
            slides.classList.add('animated');
        }
        setSlide();

        nextBtn.addEventListener('click', function(){
            moveSlide(currentIdx + 1);
        });

        prevBtn.addEventListener('click', function(){
            moveSlide(currentIdx - 1);
        });

        //moveSlide 함수
        function moveSlide(num){
            slides.style.left = moveAmt * -num + 'px';
            currentIdx = num;
            console.log(currentIdx, slideCount);

            if(currentIdx === slideCount || currentIdx === -slideCount){
                setTimeout(function(){
                    slides.classList.remove('animated');
                    slides.style.left = '0px';
                    currentIdx = 0;
                }, 500);

                setTimeout(function(){
                    slides.classList.add('animated');
                }, 600)
            }

        }

        var timer = undefined;
        var slideWrapper = document.querySelector('.slide_wrapper');

        function autoSlide(){
            if(timer === undefined){
                timer = setInterval(function(){
                    moveSlide(currentIdx + 1);
                }, 3000);
            }
        }
        // autoSlide();

        function stopSlide(){
            clearInterval(timer);
            timer = undefined;
        }


        slideWrapper.addEventListener('mouseenter', function(){
            stopSlide();
        });
        slideWrapper.addEventListener('mouseleave', function(){
            autoSlide();
        });

        //반응형 슬라이드
        window.addEventListener('resize', function(){
            var currentWidth =  document.querySelector('body').offsetWidth;
            if(currentWidth < 720){
                // var slidesWidth = slidesWrapper.offsetWidth;
                slidesWrapper.style.width = 440 + 'px';
                // newslideWidth = (slidesWidth - (responsiveMargin * maxSlides - 1))/3;
                // responsiveMargin = 20;
            }else{
                newslideWidth = slideWidth;
                responsiveMargin = slideMargin;
            }
            // if(currentWidth <= 500){
            //     var newslideWidth = slides.clientWidth;
            //     moveAmt = newslideWidth;
            // }
            // slideLayout(newslideWidth, responsiveMargin);
            // setSlide();
            // console.log(newslideWidth);

        });

