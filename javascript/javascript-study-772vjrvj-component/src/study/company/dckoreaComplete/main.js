window.addEventListener("DOMContentLoaded", () => {
    console.log('DOMContentLoaded');

    async function slide(container, wrapper, prev, next, btn) {
        let posX1 = 0,                                            //mouse down 하고  drag 시작 위치
            dragWidth = 0,                                        //drag해서 움직인 간격 
            posInitial,                                           //drag 시작 위치
            posFinal,                                             //mouse up 할 때 드래그 끝 위치
            index = 0,                                            //slide 위치 indxe
            allowShift = true;                                    //연속 slide를 못하게 하기 위한.
        const datas = await getApiImageUrls();                    //비동기로 이미지 url 호출 여기선 test 데이터

        if(datas && datas.length > 0){

            const slidesLength = datas.length;

            let cloneFirst; //슬라이더 맨 뒤에 붙일 요소 예를 들어 1,2,3 일때 3뒤에 1을 붙일 것임
            let cloneLast;  //슬라이더 맨 앞에 붙일 요소 예를 들어 1,2,3 일때 1앞에 3을 붙일 것임


            wrapper.style.width =  100 *(slidesLength + 2) + '%';
            wrapper.style.left = '-100%';
            const slideWidth = 100 / (slidesLength + 2) + '%';

            datas.forEach((val, idx) => {

                //slide를 data수 만큼 추가
                const swiperSlide = document.createElement('div');
                swiperSlide.classList.add('swiper-slide');

                //데이터를 넣는다. 
                swiperSlide.textContent = 'slide content : ' + val.name;

                swiperSlide.style.backgroundImage = `url(${val.imageUrl})`;

                // swiperSlide.style.background = `linear-gradient(135deg, royalblue, transparent), url(${val.imageUrl})`;

                swiperSlide.style.backgroundSize ='cover';


                swiperSlide.style.width = slideWidth;
                wrapper.appendChild(swiperSlide);

                if(idx === 0){
                    cloneFirst = swiperSlide.cloneNode(true);
                } else if(idx === datas.length-1){
                    cloneLast = swiperSlide.cloneNode(true);
                }

                //input radio 추가
                const inputElement = document.createElement('input');
                inputElement.type = 'radio';
                inputElement.name = 'tabmenu';
                inputElement.id = 'tab' + (1 + idx);
                inputElement.checked = idx === 0 ? true : false;

                container.appendChild(inputElement);


                //label 추가
                const labelElement = document.createElement('label');
                labelElement.setAttribute('for', 'tab' + (1 + idx));
                if(idx === 0){
                    labelElement.classList.add('checked');
                }
                btn.appendChild(labelElement);
            });

            // Clone first and last slide
            wrapper.appendChild(cloneFirst);
            wrapper.insertBefore(cloneLast, wrapper.firstChild);

            const tabmenuList = container.querySelectorAll('input[name="tabmenu"]');
            const labels = btn.children;

            for (let i = 0; i < labels.length; i++) {
                const label = labels[i];
                label.addEventListener('click', (e) => {
                    btn.querySelector('.btn label.checked').classList.remove('checked');
                    label.classList.add('checked');
                    const forId = label.getAttribute('for');
                    for (let j = 0; j < tabmenuList.length; j++) {
                        const ele = tabmenuList[j];
                        if(ele.id === forId){
                            ele.checked = true;
                            shiftMenu(j);
                        }else{
                            ele.checked = false;
                        }
                    }
                });
            }

            // Mouse events
            wrapper.onmousedown = dragStart;

            // Touch events
            wrapper.addEventListener('touchstart', dragStart);
            wrapper.addEventListener('touchend', dragEnd);
            wrapper.addEventListener('touchmove', dragAction);

            // Click events
            prev.addEventListener('click', function () { shiftSlide(-1) });
            next.addEventListener('click', function () { shiftSlide(1) });

            // Transition events
            wrapper.addEventListener('transitionend', checkIndex);

            let clientWidth;

            function dragStart (e) {
                if(allowShift){
                    e = e || window.event;
                    e.preventDefault();
                    posInitial = wrapper.offsetLeft;
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
                    dragWidth = posX1 - e.touches[0].clientX;
                    posX1 = e.touches[0].clientX;
                } else {
                    
                    dragWidth = posX1 - e.clientX;
                    posX1 = e.clientX;
                    if(e.clientX >= 0 && e.clientX <= clientWidth){ //브라우저 창 내부에서 드래그를 했는지 .. 브라우저창을 작게 하고 마우스를 넘길수 있다.
                        wrapper.style.left = (wrapper.offsetLeft - dragWidth) + "px";
                    }
                }
            }

            function dragEnd (e) {
                posFinal = wrapper.offsetLeft;

                const threshold = clientWidth * (1/8);

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
                    wrapper.style.left = -(100 + (index * 100)) + '%';
                }

                document.onmouseup = null;
                document.onmousemove = null;
            }

            function shiftMenu(idx){
                wrapper.classList.add('shifting');
                if (allowShift && index !== idx) {
                    allowShift = false;
                    index = idx;
                    wrapper.style.left = -(100 + ((index) * 100)) + '%';
                };

            }

            //실제 slide를 움직이는 부분
            function shiftSlide(dir, action) {
                if (allowShift) {
                    allowShift = false; //slide가 움직이기 시작할 떄는 다른 slide의 다른 작동을 할 수 없게 막음
                    wrapper.classList.add('shifting');

                    //오른쪽 버튼
                    if (dir == 1) {
                        wrapper.style.left = -(100 + ((index + 1) * 100)) + '%';
                        index++;
                    //왼족버튼
                    } else if (dir == -1) {
                        wrapper.style.left =  (-100 - ((index - 1) * 100) ) + '%';
                        index--;
                    }
                };

            }

            function checkIndex (){
                wrapper.classList.remove('shifting');
                //왼쪽으로 읻홍(숫자 증가) 하면서 slide가 5에서 1(복사본)로 간경우
                if (index == -1) {
                    wrapper.style.left = -(slidesLength * 100) + "%";
                    index = slidesLength - 1;
                }

                //오른쪽 이동 (숫자 감소) 하면서 slide가 1번에서 끝번호 5번이으로 온경우 5번은 복사 본이므로 원본으로 이동시켜야함
                if (index == slidesLength) {
                    wrapper.style.left = '-100%';
                    index = 0;
                }

                tabmenuList[index].checked = true;
                btn.querySelector('.checked').classList.remove('checked');
                labels[index].classList.add('checked');

                allowShift = true;
                
            }
        }else{
            //이미지를 가져오지 못한 경우 초기 slide 세팅

            //slide를 data수 만큼 추가
            const swiperSlide = document.createElement('div');

            //데이터를 넣는다. 
            swiperSlide.textContent = 'No Image ';
            swiperSlide.classList.add('swiper-slide');
            wrapper.appendChild(swiperSlide);

            //input radio 추가
            const inputElement = document.createElement('input');
            inputElement.type = 'radio';
            inputElement.name = 'tabmenu';
            inputElement.id = 'tab1';
            inputElement.checked = true;
            container.appendChild(inputElement);

            //label 추가
            const labelElement = document.createElement('label');
            labelElement.setAttribute('for', 'tab1');
            labelElement.classList.add('checked');
            btn.appendChild(labelElement);
        }
    }


    async function getApiImageUrls() {

        // const imageList = [
        //     'https://cdn.pixabay.com/photo/2023/06/27/10/51/man-8091933_1280.jpg',
        //     'https://cdn.pixabay.com/photo/2018/01/12/10/19/fantasy-3077928_1280.jpg',
        //     'https://cdn.pixabay.com/photo/2016/09/08/22/43/books-1655783_1280.jpg',
        //     'https://cdn.pixabay.com/photo/2013/12/17/20/10/bubbles-230014_1280.jpg',
        //     'https://cdn.pixabay.com/photo/2018/08/21/23/29/forest-3622519_1280.jpg',
        //     'https://cdn.pixabay.com/photo/2016/12/16/15/25/christmas-1911637_1280.jpg',
        //     'https://cdn.pixabay.com/photo/2016/10/18/21/22/beach-1751455_1280.jpg',
        //     'https://cdn.pixabay.com/photo/2018/09/23/18/30/drop-3698073_1280.jpg',
        //     'https://cdn.pixabay.com/photo/2018/01/04/19/43/love-3061483_1280.jpg',
        //     'https://cdn.pixabay.com/photo/2017/05/11/11/15/workplace-2303851_1280.jpg'
        // ];

        const imageList = [
            'https://images.pexels.com/photos/8837752/pexels-photo-8837752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            'https://images.pexels.com/photos/3183174/pexels-photo-3183174.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            'https://images.pexels.com/photos/6224/hands-people-woman-working.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            // 'https://images.pexels.com/photos/6476254/pexels-photo-6476254.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            // 'https://images.pexels.com/photos/7097/people-coffee-tea-meeting.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            // 'https://images.pexels.com/photos/2459/stairs-home-loft-lifestyle.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            // 'https://images.pexels.com/photos/2451567/pexels-photo-2451567.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            // 'https://images.pexels.com/photos/140945/pexels-photo-140945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            // 'https://images.pexels.com/photos/7070/space-desk-workspace-coworking.jpg',
            // 'https://cdn.pixabay.com/photo/2016/03/25/02/13/abstract-1278077_1280.jpg',
            // 'https://cdn.pixabay.com/photo/2020/04/05/00/26/web-5004174_1280.jpg',
            // 'https://cdn.pixabay.com/photo/2021/10/11/17/54/technology-6701504_1280.jpg',
            // 'https://cdn.pixabay.com/photo/2016/10/11/21/43/geometric-1732847_1280.jpg',
            // 'https://cdn.pixabay.com/photo/2018/06/07/04/48/shanghai-3459422_1280.jpg',
            // 'https://cdn.pixabay.com/photo/2016/04/04/14/12/monitor-1307227_1280.jpg',
            // 'https://cdn.pixabay.com/photo/2016/04/13/19/20/binary-1327493_1280.jpg',
            // 'https://cdn.pixabay.com/photo/2014/07/09/09/19/digital-388075_1280.jpg',
            // 'https://cdn.pixabay.com/photo/2018/08/21/23/29/forest-3622519_1280.jpg',
            // 'https://cdn.pixabay.com/photo/2016/12/16/15/25/christmas-1911637_1280.jpg',
            // 'https://cdn.pixabay.com/photo/2016/10/18/21/22/beach-1751455_1280.jpg'
        ];
        


        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        data.forEach((d,i)=>{
            d.imageUrl = imageList[i];
        });
        return [data[0], data[1], data[2]];
        // return null;
    }


    var container = document.querySelector('.swiper-container'),
        wrapper = document.querySelector('.swiper-wrapper'),
        prev = document.querySelector('.slider-arrow-left'),
        next = document.querySelector('.slider-arrow-right'),
        btn = document.querySelector('.btn');
        
    slide(container, wrapper, prev, next, btn);


}); //javascript
