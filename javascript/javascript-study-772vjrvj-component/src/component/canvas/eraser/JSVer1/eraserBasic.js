//한가지 색깔로 그리고 지우기 가장 기본 버전입니다.
//한계 - 지우개를 클릭하고 마우스를 다운 했을 때는 안지워짐 움직여야 지워짐

var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");
var lastX;
var lastY;
var strokeColor="red";
var strokeWidth=5;
var mouseX;
var mouseY;
var offsetX=canvas.offsetLeft;
var offsetY=canvas.offsetTop;
var isMouseDown=false;

//마우스를 클릭하는 순간 한번만 이번트 일어남
function handleMouseDown(e){
  mouseX=parseInt(e.clientX-offsetX);
  mouseY=parseInt(e.clientY-offsetY);

  // Put your mousedown stuff here
  lastX=mouseX;
  lastY=mouseY;
  isMouseDown=true;
}

//마우스를 떼는 순간 한번만 이번트 일어남
function handleMouseUp(e){
  mouseX=parseInt(e.clientX-offsetX);
  mouseY=parseInt(e.clientY-offsetY);

  // Put your mouseup stuff here
  isMouseDown=false;
}

function handleMouseOut(e){
  mouseX=parseInt(e.clientX-offsetX);
  mouseY=parseInt(e.clientY-offsetY);

  // Put your mouseOut stuff here
  isMouseDown=false;
}

function handleMouseMove(e){
  mouseX=parseInt(e.clientX-offsetX);
  mouseY=parseInt(e.clientY-offsetY);

  // Put your mousemove stuff here
  if(isMouseDown){
    ctx.beginPath();
    if(mode=="pen"){
      ctx.globalCompositeOperation="source-over";
      //https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
      //마지막에 그린 그림이 제일 위로 올라 온다.
      ctx.strokeStyle = strokeColor;
      ctx.moveTo(lastX,lastY);    //시작
      ctx.lineTo(mouseX,mouseY);  //끝
      ctx.stroke();               //곡선
    }else{
      ctx.globalCompositeOperation="destination-out";
      //https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
      //새로운 컨텐츠가 위에 오버랩 되지만 내용이 덮어 지진 않고 원래 배경화면이 나타난다. 
      
      ctx.arc(lastX,lastY,8,0,Math.PI*2,false);
      //void ctx.arc(x, y, radius, startAngle, endAngle [, counterclockwise]); 
      //월을 그림 중심좌표 반지름 시작 각도 끝나는 각도 방향 시계 반시계 -> 각도는 라디안

      ctx.fill();
    }
    lastX=mouseX; //끝을 시작으로
    lastY=mouseY; 
  }
}

canvas.addEventListener('mousedown', function(e){
  handleMouseDown(e);
});

canvas.addEventListener('mousemove', function(e){
  handleMouseMove(e);
});

canvas.addEventListener('mouseup', function(e){
  handleMouseUp(e);
});

canvas.addEventListener('mouseout', function(e){
  handleMouseOut(e);
});

var mode="pen";
document.getElementById('pen').addEventListener('click',function(){
  mode="pen";
});

document.getElementById('eraser').addEventListener('click', function(){
  mode="eraser";
});