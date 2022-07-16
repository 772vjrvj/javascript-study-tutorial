window.onload = function(){
  draw();
}		
var gkhead = new Image;
gkhead.src = 'http://phrogz.net/tmp/gkhead.jpg';

var ox = 0, oy = 0, 
    px = 0, py = 0, 
    scx = 1, scy = 1, 
    dragged = false, move = false;
    imgPosX = 0, imgPosY = 0, 
    imgWidth = 500, imgHeight = 500;
var canvas = document.getElementById("myCanvas");
var reset = document.getElementById("reset");
var plus = document.getElementById("plus");
var minus = document.getElementById("minus");
var moveBtn = document.getElementById("move");

reset.addEventListener('click', () => {
  ox = 0, oy = 0, 
  px = 0, py = 0, 
  scx = 1, scy = 1, 
  moveBtn.style.backgroundColor = '',
  dragged = false, move = false,
  imgPosX = 0,     imgPosY = 0, 
  imgWidth = 500,  imgHeight = 500;
  draw();
});
plus.addEventListener('click', () => {
  let bfzx, bfzy, afzx, afzy;
  const x = imgPosX + imgWidth/2;
  const y = imgPosY + imgHeight/2;

  [bfzx, bfzy] = StoW(x, y); //e.x , e.y 마우스의 위치
  scx -= 10 * scx / -150;
  scy -= 10 * scy / -150;
  [afzx, afzy] = StoW(x, y);
  ox += (bfzx - afzx);
  oy += (bfzy - afzy);
  draw();
});
minus.addEventListener('click', () => {
  let bfzx, bfzy, afzx, afzy;
  const x = imgPosX + imgWidth/2;
  const y = imgPosY + imgHeight/2;

  [bfzx, bfzy] = StoW(x, y); //e.x , e.y 마우스의 위치
  scx -= 10 * scx / 150;
  scy -= 10 * scy / 150;
  [afzx, afzy] = StoW(x, y);
  ox += (bfzx - afzx);
  oy += (bfzy - afzy);
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


canvas.onmousedown = (e) => {
   px = e.x; 
   py = e.y;
   if(imgPosX <= px && px <= imgPosX + imgWidth && 
      imgPosY <= py && py <= imgPosY + imgHeight ){
      dragged = true;
   }
}

canvas.onmousemove = (e) => {
  if(dragged && move){
    ox -= (e.x - px)/scx;
    oy -= (e.y - py)/scy;
    px = e.x; 
    py = e.y; 
    draw();
  }
}

canvas.onmouseup = () => {
  dragged = false;
}





//아래로 스크롤을 내린경우
//스크롤 e.deltaY는 아래로 내리면 125가 된다. 
//rate은  0.08
//아래로 계속 내린경우 scx는 0.98의 n승이 된다. 앞의 값의 0.98곱이다.
//



//위로 스크롤을 올린경우
//스크롤 e.deltaY는 위로 올리면 -125가 된다. 
//rate은 -0.08
//위로로 계속 올린경우 scx는 1.08의 n승이 된다. 앞의 값의 1.08곱이다.




canvas.onwheel = (e) => {
  let bfzx, bfzy, afzx, afzy;
  [bfzx, bfzy] = StoW(e.x, e.y); //기존 위치
  const rate = 10 / e.deltaY;    //0.08 or -0.08
  scx = scx * (1 - rate);        //10 / e.deltaY = 10/125 = 0.08이다. scx = scx - (0.08 * scx) = scx*(0.92) 이 된다.
  scy = scy * (1 - rate);        //10 / e.deltaY = 10/125 = 0.08이다. scx = scx + (0.08 * scx) = scx*(1.08) 이 된다.
  [afzx, afzy] = StoW(e.x, e.y); //올리면 감소한값 내리면 증가한값
  ox = ox + (bfzx - afzx);       //내렸다면 음수
  oy = oy + (bfzy - afzy);       //올렸다면 양수
  draw();
}
var ctx = canvas.getContext("2d");





function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const [ex, ey] = WtoS(0, 0);
  imgPosX = ex;
  imgPosY = ey;
  imgWidth = 500 * scx;
  imgHeight = 500 * scy;

  ctx.drawImage(gkhead, imgPosX, imgPosY, imgWidth, imgHeight);
}

function WtoS(wx, wy) {
  let sx = (wx - ox) * scx;
  let sy = (wy - oy) * scy;
  return [sx, sy];
}



//  스크롤을 내리면 1/0.98 을 곱하므로 1보다 크고
//  스크롤을 올리면 1/1.08 을 곱하므로 1보자 작고 0보다 크다

function StoW(sx, sy) {
  let wx = sx * ( 1 / scx ) + ox;  
  let wy = sy * ( 1 / scy ) + oy;
  return [wx, wy];
}
