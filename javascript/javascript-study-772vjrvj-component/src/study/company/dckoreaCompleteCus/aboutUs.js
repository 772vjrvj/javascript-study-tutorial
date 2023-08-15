window.addEventListener("DOMContentLoaded", () => {

  /* 헤더 부분 관련*/
  //스크롤이 끝나지 않은 상태에서 클릭하면 멈춤 이유는 클릭이후에도 남은 스크롤이 움직여서임
  let isScrolling = false;
  
  const headerWrapper = document.querySelector('#header-wrap');
  const gotoTop = document.querySelector("#gotoTop");

  // body와 documentElement 중 더 큰 높이를 반환
  const bodyHeight = document.body.scrollHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const docHeight = Math.max(bodyHeight, documentHeight) / 25;
  const logo = document.querySelector('#logo-small');


  /* feature-box 이미지 관련 */
  const boxs = document.querySelectorAll('.fbox-icon img');
  let startBoxes = Array(boxs.length).fill(false);

  // getBoundingClientRect 의 top과 bottom 은 동적으로 변함
  // box.getBoundingClientRect().top + window.scrollY //브라우저 최상단으로 부터 떨어진 절대거리
  // box.getBoundingClientRect().top >= 0 && boxs[0].getBoundingClientRect().bottom<= windowHeight //화면에 완전히 나타나는 코드

  
  /* counter 관련 */
  const numbers = document.querySelectorAll('.number span');
  let startNumbers = [];

  gotoTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
  });

  window.addEventListener('scroll', (e) => {
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    if(!isScrolling){
      isScrolling = true;

      //해더 영역
      if(Number(window.scrollY) > 0 && Number(window.scrollY) <= docHeight){
          headerWrapper.classList.add('scrollTop');
          logo.src = 'img/logo.png';
      }else if(Number(window.scrollY) > docHeight){
          headerWrapper.classList.add('scrollTopLogo');
      }else{
          logo.src = 'img/logo-dark.png';
          headerWrapper.classList.remove('scrollTop');
          headerWrapper.classList.remove('scrollTopLogo');
      }

      //맨위로 화살표
      if(Number(window.scrollY) >= docHeight * 3 ){
          gotoTop.classList.add('showTop');
      }else{
          gotoTop.classList.remove('showTop');
      }


      //feature-box 이미지 ** 딜레이를 줄수도 있지만 여기서는 화면에 2/3쯤 나왓을 떄 나타나게 함
      for (let index = 0; index < boxs.length; index++) {
        const box = boxs[index];
        if( !startBoxes[index]
          && box.getBoundingClientRect().bottom - (box.getBoundingClientRect().height * 1/3) <= windowHeight
          ){
            startBoxes[index] = true;
            box.classList.add('fadeIn');
        }
      }

      //numbers 
      for (let index = 0; index < numbers.length; index++) {
        const number = numbers[index];
        if(!startNumbers[index] && number.getBoundingClientRect().bottom - (number.getBoundingClientRect().height/2) <= windowHeight){
          startNumbers[index] = true;
          changeNum(number);
        }
      }

      isScrolling = false;
    }
  });

  //초기화 처음 한번 실행 (새로 고침을 위해)
  function initBox(){
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    for (let index = 0; index < boxs.length; index++) {
      const box = boxs[index];
      if(box.getBoundingClientRect().bottom - (box.getBoundingClientRect().height * 1/3) <= windowHeight
      //스크롤 맨 위부터 해당요소 마닥에서 그 요소의 1/3만큼 뺀 bottom이 창 높이보다 작거나 같은가
        ){
        box.classList.add('fadeIn');
      }
    }
  }

  async function getApiNumbers() {
    isScrolling = true;
    console.log('getApiNumbers');
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    const ids = data.map(((d,i) => d.id));
    const newIds = ids.slice(0,4);
    let resultArr = [];

    for (let index = 0; index < newIds.length; index++) {
      const item1 = newIds[index];
      const item2 = Math.floor(Math.random() * 100) + item1;
      resultArr = [...resultArr , item2];
      numbers[index].setAttribute('data-to', item2);
    }

    startNumbers = Array(newIds.length).fill(false);
    iniNumber();
}

  function iniNumber(){
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    for (let index = 0; index < numbers.length; index++) {
      const number = numbers[index];
      if(!startNumbers[index] && number.getBoundingClientRect().bottom - (number.getBoundingClientRect().height/2) <= windowHeight){
        startNumbers[index] = true;
        changeNum(number);
      }
    }
    isScrolling = false;
  }

  initBox();

  getApiNumbers();

  function changeNum(number){
    let num = 1;
    let intervalTime = 100;
    const targetNum = number.getAttribute('data-to');
    
    if(targetNum > 10){
        intervalTime = 50; //더빠름
    }
    const timer = setInterval(() => {
        ++num;
        number.innerText = num;
        if(Number(num) === Number(targetNum)){
            clearInterval(timer);
        }
    }, intervalTime);
  }
});