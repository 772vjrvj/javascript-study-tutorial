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

      isScrolling = false;
    }
  });


});