
window.onload = function(){
  draw();
}

//이미지
var gkhead = new Image();
    gkhead.crossOrigin = "anonymous";
    gkhead.src = '/javascript/javascript-study-772vjrvj-component/src/component/canvas/sample/zoomDragMove/complete/image/narae.png';

//버튼
var reset     = document.getElementById("reset");
var plus      = document.getElementById("plus");
var minus     = document.getElementById("minus");
var moveBtn   = document.getElementById("move");
var lineBtn   = document.getElementById("line");

//slider
var rateValue = document.getElementById("rate_value");
var rate      = document.getElementById("rate");
    rateValue.innerHTML = rate.value;
    rate.oninput = function() {
      rateValue.innerHTML = this.value;
      per = this.value/100;
    }

//변수
var rate      = 1;    //총 증가율
var per       = 0.08; //증가비율

var pointX    = 0;   //마지막으로 움직인 마우스 x위치
var pointY    = 0;   //마지막으로 움직인 마우스 y위치

var imgPosX   = 0;   //초기 이미지 x위치
var imgPosY   = 0;   //초기 이미지 y위치
var imgWidth  = 500; //초기 이미지 width
var imgHeight = 500; //초기 이미지 height

var dragged   = false; //이미지 드래그 시작
var move      = false; //이미지 움직일 수 있는지
var line      = false; //라인 표시

var path      = [10,10, 490,10, 490,490, 10, 490 ,10, 10,
                 20,20, 480,20, 480,480, 20, 480 ,20, 20,
                 30,30, 470,30, 470,470, 30, 470 ,30, 30,
                 40,40, 460,40, 460,460, 40, 460 ,40, 40,
                 50,50, 450,50, 450,450, 50, 450 ,50, 50,
                 60,60, 440,60, 440,440, 60, 440 ,60, 60,
                 70,70, 430,70, 430,430, 70, 430 ,70, 70,
                 80,80, 420,80, 420,420, 80, 420 ,80, 80,
                 90,90, 410,90, 410,410, 90, 410 ,90, 90
                ]; //테스트 경로



var canvas    = document.getElementById("myCanvas");
var ctx       = canvas.getContext("2d");

reset.addEventListener('click', () => {
  rate      = 1;    //총 증가율
  per       = 0.08; //증가비율
  
  pointX    = 0;   //마지막으로 움직인 마우스 x위치
  pointY    = 0;   //마지막으로 움직인 마우스 y위치
  
  imgPosX   = 0;   //초기 이미지 x위치
  imgPosY   = 0;   //초기 이미지 y위치
  imgWidth  = 500; //초기 이미지 width
  imgHeight = 500; //초기 이미지 height
  
  dragged   = false; //이미지 드래그 시작
  move      = false; //이미지 움직일 수 있는지
  line      = false; //라인 표시

  path      = [10,10, 490,10, 490,490, 10, 490 ,10, 10]; //테스트 경로

  moveBtn.style.backgroundColor = '';
  lineBtn.style.backgroundColor = '';
  draw();
});

//move버튼 클릭
moveBtn.addEventListener('click', () => {
  move = !move;
  if(move === true){
    moveBtn.style.backgroundColor = '#f0f0f0';
  }else{
    moveBtn.style.backgroundColor = '';
  }
});

//line버튼 클릭
lineBtn.addEventListener('click', () => {
  line = !line;
  if(line === true){
    lineBtn.style.backgroundColor = '#f0f0f0';
  }else{
    lineBtn.style.backgroundColor = '';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(gkhead, imgPosX, imgPosY, imgWidth, imgHeight);
  }
});

//마우스 다운
canvas.onmousedown = (e) => {
  pointX = e.offsetX || (e.pageX - canvas.offsetLeft);
  pointY = e.offsetY || (e.pageY - canvas.offsetTop);

  //이미지 안에 마우스가 있었던 경우만
  if(imgPosX <= pointX && pointX <= imgPosX + imgWidth && 
     imgPosY <= pointY && pointY <= imgPosY + imgHeight ){ 
     dragged = true;
     rate = 1;
  }
}

//마우스 업
canvas.onmouseup = () => {
  dragged = false;
 }


//  var newPath = [];
//마우스 움직임
canvas.onmousemove = (e) => {
  const movePointX = e.offsetX || (e.pageX - canvas.offsetLeft); //움직이는 마우스 x좌표
  const movePointY = e.offsetY || (e.pageY - canvas.offsetTop);  //움직이는 마우스 y좌표

  // newPath = [...newPath, movePointX, movePointY];
  // console.log(JSON.stringify(newPath));

  document.getElementById('posX').innerText = movePointX; //x좌표
  document.getElementById('posY').innerText = movePointY; //y좌표

  const rgb = ctx.getImageData(movePointX, movePointY, 1, 1).data;
  document.getElementById('rgbR').innerText = rgb[3] === 0? 255: rgb[0]; //RGB R
  document.getElementById('rgbG').innerText = rgb[3] === 0? 255: rgb[1]; //RGB G
  document.getElementById('rgbB').innerText = rgb[3] === 0? 255: rgb[2]; //RGB B

  //라인 버튼을 누른 상태면
  if(line && !dragged && !move || !dragged && move && line){
    pointX = movePointX;
    pointY = movePointY;
    draw();
  //이미지를 클릭하고 move버튼을 누른 상태면
  }else if(dragged && move || dragged && move && line){
    const diffWidth = movePointX - pointX; 
    const diffHeight = movePointY - pointY;
    imgPosX = imgPosX + diffWidth;
    imgPosY = imgPosY + diffHeight;

    path = path.map((p, i) => {
      let result = 0;
      if(i % 2 === 0){
        result = p + diffWidth;
      }else{
        result = p + diffHeight;
      }
      return result;
    });

    pointX = movePointX;
    pointY = movePointY;
    draw();
  }

}

//라인버튼 눌렀을 때 마우스 끝 포인터
function mousePointerMaker(movePointX, movePointY){
  ctx.beginPath();
  ctx.setLineDash([0, 0]);
  ctx.arc(movePointX, movePointY, 8, 0, 2*Math.PI);
  ctx.fillStyle = "rgba(000, 051, 255, 0.3)";
  ctx.fill();
  ctx.stroke();
}

//라인버튼 눌렀을 때 대칭 라인 표시 각각 함수 호출
function allLineMakers(movePointX, movePointY){
  lineMaker(movePointX, movePointY, imgPosX           , imgPosY);             //왼쪽 위
  lineMaker(movePointX, movePointY, imgPosX           , imgPosY + imgHeight); //왼쪽 아래
  lineMaker(movePointX, movePointY, imgPosX + imgWidth, imgPosY);             //오른쪽 위
  lineMaker(movePointX, movePointY, imgPosX + imgWidth, imgPosY + imgHeight); //오른쪽 아래
}

//라인버튼 눌렀을 때 대칭 라인 표시
function lineMaker(mpX, mpY, imgX, imgY){
  const moveX = Math.floor(mpX);
  const moveY = Math.floor(mpY);
  const imageX = Math.floor(imgX);
  const imageY = Math.floor(imgY);

  let endX = 0, endY = 0;

  if(moveX === imageX && moveY > imageY){
    if(moveY > imageY){
      endY = 0;
    }else if(moveX === imageX && moveY < imageY){
      endY = 500;
    }
    endX = moveX;
  }else if(moveY === imageY){
    if(moveX > imageX){
      endX = 0;
    }else if(moveX < imageX){
      endX = 500;
    }
    endY = moveY;
  }else{
    if(moveX - imageX >= 0 && moveY - imageY >= 0){
      endX = -moveY / ((moveY - imageY)/(moveX - imageX)) + moveX;
      endY = 0;   // x 축
    }else if(moveX - imageX > 0 && moveY - imageY < 0){ //1사분면
      endX = 0;   // y축
      endY = ((moveY - imageY)/(moveX - imageX))*(-moveX) + moveY;
    }else if(moveX - imageX < 0 && moveY - imageY > 0){ //3사분면
      endX = -moveY / ((moveY - imageY)/(moveX - imageX)) + moveX;
      endY = 0;  // x 축
    }else if(moveX - imageX < 0 && moveY - imageY < 0){ //2사분면
      endX = 500;
      endY=((moveY - imageY)/(moveX - imageX))*(500-moveX) + moveY;
    }
  }
  ctx.beginPath();
  ctx.moveTo(moveX, moveY);
  ctx.lineTo(endX, endY);
  ctx.setLineDash([3, 2]);
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'black';
  ctx.stroke();
  ctx.closePath();
}

//plus버튼
plus.addEventListener('click', () => {
  settingZoom('p');
  draw();
});

//minus버튼
minus.addEventListener('click', () => {
  settingZoom('m');
  draw();
});

//줌 이미지 중간으로 한다.
function settingZoom(type){
  pointX = imgPosX + imgWidth/2;
  pointY = imgPosY + imgHeight/2;
  rate = type === 'm' ? 1 - per : 1 + per;
  imgPosX = rate * (imgPosX - pointX) + pointX;
  imgPosY = rate * (imgPosY - pointY) + pointY;
  imgWidth = imgWidth * rate;
  imgHeight = imgHeight * rate;

  path = path.map((p, i) => {
    let result = 0;
    if(i % 2 === 0){
      result = rate * (p - pointX) + pointX;
    }else{
      result = rate * (p - pointY) + pointY;
    }
    return result;
  });


}




//캔버스 안에서 마우스 휠
canvas.onwheel = (e) => {
  var rateBtn = document.getElementById("rate");

  if(rateBtn.value !== null 
    && rateBtn.value !== undefined 
    && !Number.isNaN(rateBtn.value)
    && rateBtn.value > 0 && rateBtn.value <100){
      per = Number(rateBtn.value) / 100;
    }else{
      per = 0.08;
    }
  pointX = e.offsetX || (e.pageX - canvas.offsetLeft);
  pointY = e.offsetY || (e.pageY - canvas.offsetTop);
  if(e.deltaY < 0){ //스크롤 up
    rate = 1 + per;
  }else{ //스크롤 down
    rate = 1 - per;
  }
  imgPosX = rate * (imgPosX - pointX) + pointX;
  imgPosY = rate * (imgPosY - pointY) + pointY;
  imgWidth = imgWidth * rate;
  imgHeight = imgHeight * rate;

  path = path.map((p, i) => {
    let result = 0;
    if(i % 2 === 0){
      result = rate * (p - pointX) + pointX;
    }else{
      result = rate * (p - pointY) + pointY;
    }
    return result;
  });

  draw();
}

//그리기
function draw() {
  //이미지 그리기
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(gkhead, imgPosX, imgPosY, imgWidth, imgHeight);

  //이미지 내부 그림 그리기
  for (let index = 0; index < path.length; index += 2) {
    const p1 = path[index];
    const p2 = path[index+1];
    const p3 = path[index+2];
    const p4 = path[index+3];
    if(p3 && p4){
      ctx.beginPath();
      ctx.moveTo(p1, p2);
      ctx.lineTo(p3, p4);
      ctx.stroke();
      ctx.closePath();
    }
  }

  //라인이 있다면 라인 그리기
  if(line){
    allLineMakers(pointX, pointY);
    mousePointerMaker(pointX, pointY);
  }
}
