
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


var path1 = [25,-1,26,-1,26,1,27,1,28,2,28,3,28,4,29,6,30,7,31,8,32,9,32,10,33,10,33,11,34,11,34,12,34,13,35,13,36,14,36,15,37,16,37,17,39,17,39,18,40,19,41,19,42,20,43,21,44,21,45,22,46,22,47,22,47,23,49,23,50,23,50,24,51,24,52,24,53,24,54,24,55,25,56,26,57,26,59,26,60,26,61,26,62,26,64,26,65,26,66,27,68,27,69,27,70,27,72,28,73,28,75,28,76,28,77,29,78,29,79,30,80,30,81,30,82,30,83,30,84,30,85,31,86,31,87,31,89,32,89,33,91,33,92,33,93,33,94,34,95,35,96,35,97,35,98,35,100,36,101,37,102,38,103,38,105,38,105,39,107,40,108,40,110,41,111,42,112,43,113,43,114,44,115,45,117,46,118,47,119,48,120,49,121,49,121,50,122,50,122,51,123,52,124,53,125,54,125,55,126,56,126,57,127,57,127,59,127,60,128,61,129,62,129,64,129,65,130,66,130,67,130,69,131,70,131,71,132,71,132,72,132,74,132,75,132,76,132,77,133,78,133,79,134,81,134,82,134,83,134,85,135,86,135,87,136,88,136,90,136,91,136,92,136,93,136,94,136,95,136,96,136,97,136,98,136,99,136,100,136,101,136,102,136,103,136,104,136,105,136,106,136,108,136,109,136,111,135,111,134,112,134,113,133,114,133,115,132,115,132,116,131,116,130,117,130,118,129,118,129,119,128,119,128,120,127,120,126,121,125,121,123,122,122,122,122,123,120,123,119,123,118,124,117,124,116,124,115,125,114,125,113,125,111,126,111,127,109,127,108,127,107,127,106,127,105,127,103,127,102,127,101,127,100,127,99,127,98,127,96,128,95,128,94,128,92,128,91,128,90,128,89,128,87,128,86,128,85,128,83,128,82,128,81,128,80,128,78,128,77,128,75,128,74,128,73,128,72,128,70,128,69,128,68,127,67,127,65,126,64,126,63,125,62,124,60,124,59,123,58,123,57,122,56,121,55,121,54,120,53,119,51,118,50,117,49,116,47,115,47,114,46,114,45,112,44,112,44,111,43,111,43,110,42,110,42,109,40,108,39,107,39,106,38,105,37,104,37,103,36,102,36,101,35,100,34,98,34,97,34,96,33,95,33,94,33,93,32,92,32,91,31,91,31,90,30,89,30,88,30,87,30,86,30,84,30,83,30,82,30,81,30,80,29,79,29,78,29,77,29,76,29,75,29,74,29,73,29,72,29,71,29,70,29,69,29,68,29,66,29,65,29,64,29,63,29,61,29,60,29,59,30,58,30,56,31,55,31,54,32,53,32,52,33,51,33,50,33,49,34,49,35,48,35,47,35,46,35,45,36,44,36,43,37,42,38,41,38,40,39,39,39,38,40,37,40,36,41,35,42,35,42,34,43,32,44,31,45,30,46,30,46,29,47,28,48,27,49,26,50,26,50,25,51,24,52,23,52,22,53,21,54,21,54,20,54,19,54,18,54,16,54,15,54,14,54,13,54,12,54,11,54,10,53,10,53,9,53,8,52,8,52,7,52,5,51,4,50,2,50,1,50,-1];




var path2 = [377,-1,377,1,377,1,377,2,377,3,377,4,377,5,377,6,377,7,377,8,378,9,378,10,379,10,380,11,381,11,382,11,382,12,383,12,384,12,385,13,385,14,386,14,387,15,388,16,389,16,389,17,390,17,391,18,391,19,392,19,393,20,393,21,394,21,394,22,394,23,395,23,395,24,396,25,397,27,397,28,397,29,398,29,398,30,398,31,398,32,399,33,399,34,399,35,399,36,399,37,399,38,399,39,399,40,399,41,399,42,399,43,399,44,399,45,398,46,398,47,397,48,396,49,396,50,395,50,395,52,394,52,394,53,394,54,393,55,392,56,391,57,391,58,390,59,389,60,388,60,388,61,387,62,387,63,386,63,386,64,385,64,384,65,384,66,383,66,382,67,381,67,380,68,379,69,378,69,377,69,377,70,376,70,375,70,374,70,373,71,371,71,370,71,369,72,368,73,367,73,366,73,365,73,364,73,363,73,362,74,361,74,360,74,359,74,358,74,357,74,356,74,355,74,354,74,353,74,352,74,351,74,350,74,349,74,348,74,347,74,345,74,344,74,344,73,343,72,342,72,342,71,341,71,341,70,340,70,340,69,340,68,339,68,338,67,337,66,336,65,336,64,335,64,334,63,333,62,333,61,333,60,332,60,332,59,331,59,331,58,331,57,330,56,330,55,330,54,329,54,329,53,329,52,329,51,329,50,329,49,329,48,329,47,329,46,328,45,328,44,328,43,328,42,327,41,327,40,327,39,326,38,326,37,326,36,326,35,326,34,326,33,326,32,326,31,326,30,326,29,326,28,326,27,326,26,326,25,326,23,326,22,326,21,327,20,327,19,327,18,328,17,328,16,328,15,329,15,329,14,330,14,330,13,331,13,331,12,331,11,332,11,332,10,333,10,333,9,334,9,335,9,335,8,336,8,337,7,337,6,338,6,339,6,339,5,340,5,341,5,342,4,343,4,344,3,345,3,346,2,347,2,348,2,349,2,350,2,351,2,352,2,353,2,354,2,355,2,356,2,357,2,358,2,359,2,360,1,361,1,362,-1]


var path = path2.concat(path1);

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
