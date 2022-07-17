window.onload = function(){
  draw();
}		
var gkhead = new Image;
gkhead.crossOrigin = "anonymous";
gkhead.src = '/javascript/javascript-study-772vjrvj-component/src/component/canvas/imageTest/mouseDragZoomKo/narae.png';
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var reset = document.getElementById("reset");
var plus = document.getElementById("plus");
var minus = document.getElementById("minus");
var moveBtn = document.getElementById("move");
var lineBtn = document.getElementById("line");

var rate = 1; 
var per = 0.08;
var imgPosX = 0;
var imgPosY = 0;
var pointX = 0;
var pointY = 0;
var imgWidth = 500;
var imgHeight = 500;
var dragged = false;
var move = false;
var line = false;
var path = [2,2, 3,3, 4,5 , 5,6, 6,5 ,8,4, 9,3 ,10,4];

reset.addEventListener('click', () => {
  rate = 1; 
  per = 0.08;
  imgPosX = 0;
  imgPosY = 0;
  pointX = 0;
  pointY = 0;
  imgWidth = 500;
  imgHeight = 500;
  moveBtn.style.backgroundColor = '';
  lineBtn.style.backgroundColor = '';
  dragged = false; 
  move = false;
  line = false;
  draw();
});

moveBtn.addEventListener('click', () => {
  move = !move;
  if(move === true){
    moveBtn.style.backgroundColor = 'blue';
  }else{
    moveBtn.style.backgroundColor = '';
  }
});

lineBtn.addEventListener('click', () => {
  line = !line;
  if(line === true){
    lineBtn.style.backgroundColor = 'blue';
  }else{
    lineBtn.style.backgroundColor = '';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(gkhead, imgPosX, imgPosY, imgWidth, imgHeight);
  }
});


canvas.onmousedown = (e) => {
  pointX = e.offsetX || (e.pageX - canvas.offsetLeft);
  pointY = e.offsetY || (e.pageY - canvas.offsetTop);
  if(imgPosX <= pointX && pointX <= imgPosX + imgWidth && 
     imgPosY <= pointY && pointY <= imgPosY + imgHeight ){
     dragged = true;
     rate = 1;
  }
}

canvas.onmousemove = (e) => {
  const movePointX = e.offsetX || (e.pageX - canvas.offsetLeft);
  const movePointY = e.offsetY || (e.pageY - canvas.offsetTop);
  document.getElementById('posX').innerText = movePointX;
  document.getElementById('posY').innerText = movePointY;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(gkhead, imgPosX, imgPosY, imgWidth, imgHeight);
  const rgb = ctx.getImageData(movePointX, movePointY, 1, 1).data;
  document.getElementById('rgbR').innerText = rgb[3] === 0? 255: rgb[0];
  document.getElementById('rgbG').innerText = rgb[3] === 0? 255: rgb[1];
  document.getElementById('rgbB').innerText = rgb[3] === 0? 255: rgb[2];

  if(line){
    mousePointerMaker(movePointX, movePointY);  
    allLineMakers(movePointX, movePointY);
  }

  if(dragged && move){
    const diffWidth = movePointX - pointX;
    const diffHeight = movePointY - pointY;
    imgPosX = imgPosX + diffWidth;
    imgPosY = imgPosY + diffHeight;
    pointX = movePointX;
    pointY = movePointY;
    draw();
  }

}

function mousePointerMaker(movePointX, movePointY){
  ctx.beginPath();
  ctx.setLineDash([0, 0]);
  ctx.arc(movePointX, movePointY, 8, 0, 2*Math.PI);
  ctx.fillStyle = "rgba(000, 051, 255, 0.3)";
  ctx.fill();
  ctx.stroke();

}

function allLineMakers(movePointX, movePointY){
  lineMaker(movePointX, movePointY, imgPosX           , imgPosY);             //왼쪽 위
  lineMaker(movePointX, movePointY, imgPosX           , imgPosY + imgHeight); //왼쪽 아래
  lineMaker(movePointX, movePointY, imgPosX + imgWidth, imgPosY);             //오른쪽 위
  lineMaker(movePointX, movePointY, imgPosX + imgWidth, imgPosY + imgHeight); //오른쪽 아래
}

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
}






canvas.onmouseup = () => {
 dragged = false;
}

plus.addEventListener('click', () => {
  settingZoom('p');
  draw();
});
minus.addEventListener('click', () => {
  settingZoom('m');
  draw();
});


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
  draw();
}

function settingZoom(type){
  pointX = imgPosX + imgWidth/2;
  pointY = imgPosY + imgHeight/2;
  rate = type === 'm' ? 1 - per : 1 + per;
  imgPosX = rate * (imgPosX - pointX) + pointX;
  imgPosY = rate * (imgPosY - pointY) + pointY;
}


function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  imgWidth = imgWidth * rate;
  imgHeight = imgHeight * rate;
  ctx.drawImage(gkhead, imgPosX, imgPosY, imgWidth, imgHeight);
  if(line){
    allLineMakers(pointX, pointY);
    mousePointerMaker(pointX, pointY);
  }
}
