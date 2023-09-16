
window.onload = function(){
  ctx.drawImage(gkhead, 0, 0, canvas.width, canvas.height);

  draw();
}

//이미지
var gkhead = new Image();
    gkhead.crossOrigin = "anonymous";
    gkhead.src = '/javascript/javascript-study-772vjrvj-component/src/component/canvas/sample/zoomDragMove/complete/image/카우보이 비밥 스파이크4.jpg';

//버튼
var reset     = document.getElementById("reset");
var plus      = document.getElementById("plus");
var minus     = document.getElementById("minus");
var moveBtn   = document.getElementById("move");

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
var areaRate      = 1;    //총 증가율
var per       = 0.08; //증가비율
var pointX    = 0;   //마지막으로 움직인 마우스 x위치
var pointY    = 0;   //마지막으로 움직인 마우스 y위치
var imgPosX   = 0;   //초기 이미지 x위치
var imgPosY   = 0;   //초기 이미지 y위치
var imgWidth  = 500; //초기 이미지 width
var imgHeight = 500; //초기 이미지 height
var oriImgWidth  = 500; //초기 이미지 width
var oriImgHeight = 500; //초기 이미지 height

var dragged   = false; //이미지 드래그 시작
var move      = false; //이미지 움직일 수 있는지
var line      = false; //라인 표시
var path = [];
var oriPath = [];
var uuid = 0;
var type = 'cursor';
var color = 'black';
var lineWidth = 2;
var penWidth = 6;
var eraserWidth = 10;

imageWrapper
var imageWrapper    = document.getElementById("imageWrapper");
var eraserIcon    = document.getElementById("eraserIcon");
var penIcon    = document.getElementById("penIcon");

var canvas           = document.getElementById("myCanvas");
var canvasWrapper    = document.getElementById("canvasWrapper");
var ctx              = canvas.getContext("2d");

reset.addEventListener('click', () => {
  rate      = 1/areaRate;    //총 증가율
  areaRate  = 1;
  per       = 0.08; //증가비율

  pointX    = 0;   //마지막으로 움직인 마우스 x위치
  pointY    = 0;   //마지막으로 움직인 마우스 y위치
  
  imgPosX   = 0;   //초기 이미지 x위치
  imgPosY   = 0;   //초기 이미지 y위치
  imgWidth  = 500; //초기 이미지 width
  imgHeight = 500; //초기 이미지 height
  canvasWrapper.style.left = 0 + 'px';
  canvasWrapper.style.top = 0 + 'px';
  canvasWrapper.style.width = imgWidth + 'px';
  canvasWrapper.style.height = imgHeight + 'px';
  dragged   = false; //이미지 드래그 시작
  move      = false; //이미지 움직일 수 있는지
  line      = false; //라인 표시
  lineWidth = 2;
  penWidth = 6;
  eraserWidth = 10;
  moveBtn.style.backgroundColor = '';
  ctx.drawImage(gkhead, 0, 0, canvas.width, canvas.height);

  penIcon.style.display = 'none';
  penIcon.style.left = pointX - (penWidth/2) + 'px';
  penIcon.style.top = pointY - (penWidth/2) + 'px';
  penIcon.style.width = penWidth + 'px';
  penIcon.style.height = penWidth + 'px';

  eraserIcon.style.display = 'none';
  eraserIcon.style.left = pointX - eraserWidth/2 + 'px';
  eraserIcon.style.top = pointY - eraserWidth/2 + 'px';
  eraserIcon.style.width = eraserWidth + 'px';
  eraserIcon.style.height = eraserWidth + 'px';





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

canvasWrapper.onmousedown = (e) => {
  if(type === 'cursor'){
    pointX = e.offsetX || (e.pageX - canvas.offsetLeft);
    pointY = e.offsetY || (e.pageY - canvas.offsetTop);
    dragged = true;
    rate = 1;
  }
}

canvasWrapper.onmousemove = (e) => {

  if(type === 'cursor'){
    if(dragged && move){
      const movePointX = e.offsetX || (e.pageX - canvas.offsetLeft); //움직이는 마우스 x좌표
      const movePointY = e.offsetY || (e.pageY - canvas.offsetTop);  //움직이는 마우스 y좌표

      const diffWidth = movePointX - pointX;
      const diffHeight = movePointY - pointY;

      
      //아래 처럼 하면 문제가 있음
      // imgPosX = imgPosX + diffWidth;
      // imgPosY = imgPosY + diffHeight;

      // canvasWrapper.style.left = imgPosX + 'px';
      // canvasWrapper.style.top = imgPosY + 'px';


      const left1 = canvasWrapper.style.left;
      const left2 = left1.substring(0, left1.length-2);

      const top1 = canvasWrapper.style.top;
      const top2 = top1.substring(0, top1.length-2);

      const left3 = Number(left2) + Number(diffWidth);
      const top3 = Number(top2) + Number(diffHeight);

      canvasWrapper.style.left = left3 + 'px';
      canvasWrapper.style.top = top3 + 'px';
      imgPosX   = left3;
      imgPosY   = top3;

    }
  }
}

canvasWrapper.onmouseup = () => {
  dragged = false;
}

imageWrapper.onwheel = (e) => {

  const rateBtn = document.getElementById("rate");

  if(rateBtn.value !== null
      && rateBtn.value !== undefined
      && !Number.isNaN(rateBtn.value)
      && rateBtn.value > 0 && rateBtn.value <100){
    per = Number(rateBtn.value) / 100;
  }else{
    per = 0.08;
  }

  if(e.target.id === 'imageWrapper'){
    pointX = e.offsetX;
    pointY = e.offsetY;
  }else if(e.target.id === 'myCanvas' || e.target.id === 'canvasWrapper'){
    pointX = imgPosX + e.offsetX;
    pointY = imgPosY + e.offsetY;
  }

  if(e.deltaY < 0){ //스크롤 up
    rate = Math.round((1 + per) * 100) / 100;
  }else{ //스크롤 down
    rate = Math.round((1 - per) * 100) / 100;
  }
  areaRate = areaRate * rate;
  imgPosX = rate * (imgPosX - pointX) + pointX;
  imgPosY = rate * (imgPosY - pointY) + pointY;
  imgWidth = imgWidth * rate;
  imgHeight = imgHeight * rate;


  eraserWidth = rate * eraserWidth;
  eraserIcon.style.width = eraserWidth + 'px';
  eraserIcon.style.height = eraserWidth + 'px';

  const eraLeft1 = eraserIcon.style.left;
  const eraLeft2 = eraLeft1.substring(0, eraLeft1.length-2);
  eraserIcon.style.left = (rate * eraLeft2) + 'px';
  const eraTop1 = eraserIcon.style.top;
  const eraTop2 = eraTop1.substring(0, eraTop1.length-2);
  eraserIcon.style.top = (rate * eraTop2) + 'px';


  penWidth = rate * penWidth;
  penIcon.style.width = rate * penWidth + 'px';
  penIcon.style.height = rate * penWidth + 'px';

  const penLeft1 = penIcon.style.left;
  const penLeft2 = penLeft1.substring(0, penLeft1.length-2);
  penIcon.style.left = rate * penLeft2 + 'px';
  const penTop1 = penIcon.style.top;
  const penTop2 = penTop1.substring(0, penTop1.length-2);
  penIcon.style.top = rate * penTop2 + 'px';






  canvasWrapper.style.left = imgPosX + 'px';
  canvasWrapper.style.top = imgPosY + 'px';

  canvasWrapper.style.width = imgWidth + 'px';
  canvasWrapper.style.height = imgHeight + 'px';

  draw();
}

//마우스 다운
canvas.onmousedown = (e) => {
  if(type === 'pen'){
    dragged = true;
    pointX = e.offsetX || (e.pageX - canvas.offsetLeft);
    pointY = e.offsetY || (e.pageY - canvas.offsetTop);
    path.push({
      uuid: ++uuid ,
      color: color,
      width: lineWidth,
      path: [pointX, pointY],
      startPoint: [pointX, pointY],
      endPoint: [],
      xMin: 0,
      xMax: 0,
      yMin: 0,
      yMax: 0,
    });
    ctx.beginPath();
    ctx.arc(pointX, pointY, lineWidth, 0, 2 * Math.PI);
    ctx.fill();
  }else if(type === 'eraser'){
    dragged = true;
    pointX = e.offsetX || (e.pageX - canvas.offsetLeft);
    pointY = e.offsetY || (e.pageY - canvas.offsetTop)


    //점 하나를 찍기는 어려우므로 지우개 사각형 넓이를 구하고 그 넓이 안의 점이 라인에 들어가면 된다.
    let lineHalf = Math.floor(eraserWidth/2);

    console.log('ddd');

    // const startX = pointX - lineHalf < 0 ? 0 : pointX - lineHalf;
    // const endX = pointX + lineHalf > 500 ? 500 : pointX + lineHalf;
    //
    // const startY = pointY - lineHalf < 0 ? 0 : pointY - lineHalf;
    // const endY = pointY + lineHalf > 500 ? 500 : pointY + lineHalf;

    const startX = pointX - lineHalf;
    const endX = pointX + lineHalf;

    const startY = pointY - lineHalf;
    const endY = pointY + lineHalf;



    // let xArea = [];
    // for (let i = startX; i <= endX; i++) {
    //   xArea.push(i);
    // }
    //
    // let yArea = [];
    // for (let i = startY; i <= endY; i++) {
    //   yArea.push(i);
    // }
    //
    // let area = [];
    //
    // for (let i = 0; i <xArea.length; i++) {
    //   for (let j = 0; j < yArea.length; j++) {
    //     area.push(xArea[i]);
    //     area.push(yArea[j]);
    //   }
    // }

    //최대최소 밖인 경우 빼기
    let removePath = null;
    for (let i = path.length-1; i >= 0; i--) {
      if(endX < path[i].xMin || path[i].xMax < startX
          || endY < path[i].yMin || path[i].yMax < startY){
      }else{
        for (let k = 0; k < path[i].path.length; k += 2) {
          if(path[i].path[k] >= startX && path[i].path[k] <= endX &&
             path[i].path[k+1] >= startY && path[i].path[k+1] <= endY){
            removePath = i;
            break;
          }
        }
      }
      if(removePath !== null){
        break;
      }
    }

    console.log('removePath ; ', removePath);
    if(removePath !== null){
      path.splice(removePath, 1);
      rate = 1;
      draw();
    }
  }
}

//마우스 움직임
canvas.onmousemove = (e) => {
  const movePointX = e.offsetX < 0 ? 0 : e.offsetX; //움직이는 마우스 x좌표
  const movePointY = e.offsetY < 0 ? 0 : e.offsetY;  //움직이는 마우스 y좌표

  document.getElementById('posX').innerText = movePointX; //x좌표
  document.getElementById('posY').innerText = movePointY; //y좌표

  const rgb = ctx.getImageData(movePointX, movePointY, 1, 1).data;
  document.getElementById('rgbR').innerText = rgb[3] === 0? 255: rgb[0]; //RGB R
  document.getElementById('rgbG').innerText = rgb[3] === 0? 255: rgb[1]; //RGB G
  document.getElementById('rgbB').innerText = rgb[3] === 0? 255: rgb[2]; //RGB B

    if(type === 'pen'){
      penIcon.style.display = 'block';
      penIcon.style.left = movePointX - (penWidth/2) + 'px';
      penIcon.style.top = movePointY - (penWidth/2) + 'px';
      if(dragged){
        mousemoveDraw(pointX, pointY, movePointX, movePointY);
        pointX = movePointX;
        pointY = movePointY;
        path[path.length-1].path.push(movePointX);
        path[path.length-1].path.push(movePointY);
      }
    }else if(type === 'eraser'){
      eraserIcon.style.display = 'block';
      eraserIcon.style.left = movePointX - eraserWidth/2 + 'px';
      eraserIcon.style.top = movePointY - eraserWidth/2 + 'px';
    }
}

//마우스 업
canvas.onmouseup = () => {
  dragged = false;
  if(type === 'pen') {
    ctx.beginPath();
    ctx.arc(pointX, pointY, lineWidth, 0, 2 * Math.PI);
    ctx.fill();

    const curPath = path[path.length - 1];
    curPath.endPoint.push(pointX);
    curPath.endPoint.push(pointY);

    const stX = curPath.startPoint[0];
    const stY = curPath.startPoint[1];
    const edX = curPath.endPoint[0];
    const edY = curPath.endPoint[1];

    let addArr = [];

    if (stX !== edX && stY !== edY){

      if(stX > edX){
        const diff = stX - edX;
        for (let i = 0; i <= diff; i++) {
          const newX = edX + i;
          addArr.push(newX);
          const newY = ((edY - stY)/(edX - stX))*(newX - stX) + stY;
          addArr.push(newY);
        }
      }else{
        const diff = edX - stX;
        for (let i = 0; i <= diff; i++) {
          const newX = edX - i;
          addArr.push(newX);
          const newY = ((edY - stY)/(edX - stX))*(newX - stX) + stY;
          addArr.push(Math.floor(newY));
        }
      }
    }else if(stX === edX && stY !== edY){
      if(stY > edY){
        const diff = stY - edY;
        for (let i = 0; i <= diff; i++) {
          addArr.push(edX);
          addArr.push(edY + i);
        }
      }else{
        const diff = edY - stY;
        for (let i = 0; i <= diff; i++) {
          addArr.push(edX);
          addArr.push(edY - i);
        }
      }
    }else if(stX !== edX && stY === edY){
      if(stX > edX){
        const diff = stX - edX;
        for (let i = 0; i <= diff; i++) {
          addArr.push(edX + i);
          addArr.push(edY);
        }
      }else{
        const diff = edX - stX;
        for (let i = 0; i <= diff; i++) {
          addArr.push(edX - i);
          addArr.push(edY);
        }
      }
    }

    for (let i = 0; i < addArr.length; i += 2) {
      mousemoveDraw(addArr[i], addArr[i+1], addArr[i+2], addArr[i+3]);
    }
    curPath.path = [...curPath.path, ...addArr];

    console.log('curPath.path : ', curPath.path);

    let xArr =[];
    let yArr =[];

    for (let i = 0; i < curPath.path.length; i++) {
      let path = curPath.path[i];
      if(i % 2 === 0){
        xArr.push(path);
      }else{
        yArr.push(path);
      }
    }
    curPath.xMax = Math.max(...xArr);
    curPath.xMin = Math.min(...xArr);
    curPath.yMax = Math.max(...yArr);
    curPath.yMin = Math.min(...yArr);

  }
}

function mousemoveDraw(pointX, pointY, movePointX, movePointY){
  ctx.globalCompositeOperation="source-over";
  //https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
  //마지막에 그린 그림이 제일 위로 올라 온다.
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.arc(pointX, pointY, lineWidth/2, 0, 2 * Math.PI);

  const startPoints = circlePoints(lineWidth, pointX, pointY, movePointX, movePointY);
  const endPoints = circlePoints(lineWidth, movePointX, movePointY, pointX, pointY );

  ctx.moveTo(startPoints[0], startPoints[1]);
  ctx.lineTo(startPoints[2], startPoints[3]);
  ctx.lineTo(endPoints[2], endPoints[3]);
  ctx.lineTo(endPoints[0], endPoints[1]);

  ctx.lineTo(startPoints[0], startPoints[1]);
  ctx.stroke();
  ctx.fill();
}

function circlePoints(lineWidth, pointX1, pointY1, pointX2, pointY2){
  let r = lineWidth/2;
  r = Math.round(r * 100) / 100;
  let m = 0;
  if((pointY2 - pointY1) === 0){
    m = -10000;
  }else{
    m = -(pointX2 - pointX1)/(pointY2 - pointY1);
    m = Math.round(m * 100)/100;
  }

  const x1 =  pointX1 + (r / Math.sqrt(1 + (m**2)));
  const y1 = m * (x1 - pointX1) + pointY1;
  const x2 = pointX1 - (r / Math.sqrt(1 + (m**2)));
  const y2 = m * (x2 - pointX1) + pointY1;


  return [x1,y1,x2,y2];
}

const btns = Array.from(document.querySelectorAll('.toolbar_button'));

function buttonRemoveActive(index){
  const findBtn = btns.find((item) => item.classList.contains('active'));
  findBtn.classList.remove('active');
  btns[index].classList.add('active');
}

document.getElementById("tool_pointer").addEventListener('click', (e) => {
  type = 'cursor';
  eraserIcon.style.display = 'none';
  penIcon.style.display = 'none';
  buttonRemoveActive(0);
});

document.getElementById("tool_pen").addEventListener('click', (e) => {
  type = 'pen';
  eraserIcon.style.display = 'none';
  let display = penIcon.style.display;
  if(display === 'block'){
    display = 'none';
  }
  buttonRemoveActive(1);
});

document.getElementById("tool_line").addEventListener('click', (e) => {
  buttonRemoveActive(2);
});

document.getElementById("tool_square").addEventListener('click', (e) => {
  buttonRemoveActive(3);
});

document.getElementById("tool_circle").addEventListener('click', (e) => {
  buttonRemoveActive(4);
});

document.getElementById("tool_star").addEventListener('click', (e) => {
  buttonRemoveActive(5);
});

document.getElementById("tool_eraser").addEventListener('click', (e) => {
  type = 'eraser';
  penIcon.style.display = 'none';
  let display = eraserIcon.style.display;
  if(display === 'block'){
    display = 'none';
  }
  buttonRemoveActive(6);
});

document.getElementById("tool_eraser_all").addEventListener('click', (e) => {
  path = [];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas.width = imgWidth;
  canvas.height = imgHeight;
  ctx.drawImage(gkhead, 0, 0, canvas.width, canvas.height);


  buttonRemoveActive(7);
});

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
  canvasWrapper.style.left = imgPosX + 'px';
  canvasWrapper.style.top = imgPosY + 'px';
  canvasWrapper.style.width = imgWidth + 'px';
  canvasWrapper.style.height = imgHeight + 'px';
  draw();
});

//minus버튼
minus.addEventListener('click', () => {
  settingZoom('m');
  canvasWrapper.style.left = imgPosX + 'px';
  canvasWrapper.style.top = imgPosY + 'px';
  canvasWrapper.style.width = imgWidth + 'px';
  canvasWrapper.style.height = imgHeight + 'px';
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

  penWidth = rate * penWidth;
  penIcon.style.width = rate * penWidth + 'px';
  penIcon.style.height = rate * penWidth + 'px';

  const penLeft1 = penIcon.style.left;
  const penLeft2 = penLeft1.substring(0, penLeft1.length-2);
  penIcon.style.left = rate * penLeft2 + 'px';
  const penTop1 = penIcon.style.top;
  const penTop2 = penTop1.substring(0, penTop1.length-2);
  penIcon.style.top = rate * penTop2 + 'px';

  eraserWidth = rate * eraserWidth;
  eraserIcon.style.width = eraserWidth + 'px';
  eraserIcon.style.height = eraserWidth + 'px';

  const eraLeft1 = eraserIcon.style.left;
  const eraLeft2 = eraLeft1.substring(0, eraLeft1.length-2);
  eraserIcon.style.left = (rate * eraLeft2) + 'px';
  const eraTop1 = eraserIcon.style.top;
  const eraTop2 = eraTop1.substring(0, eraTop1.length-2);
  eraserIcon.style.top = (rate * eraTop2) + 'px';



}

//그리기
function draw() {

  //이미지 그리기
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas.width = imgWidth;
  canvas.height = imgHeight;
  ctx.drawImage(gkhead, 0, 0, canvas.width, canvas.height);

  lineWidth = lineWidth * rate;

  path = path.map((pa, idx) => {
    pa.path = pa.path.map((p,i) => {
      const result = rate * p;
      return result;
    });
    pa.startPoint = [rate * pa.startPoint[0], rate * pa.startPoint[1]];
    pa.endPoint = [rate * pa.endPoint[0], rate * pa.endPoint[1]];
    pa.xMin = rate * pa.xMin;
    pa.xMax = rate * pa.xMax;
    pa.yMin = rate * pa.yMin;
    pa.yMax = rate * pa.yMax;

    return pa;
  });

  //이미지 내부 그림 그리기
  for (let i = 0; i < path.length; i++) {
    let p = path[i];
    for (let index = 0; index < p.path.length; index += 2) {
      let p1 = p.path[index];
      let p2 = p.path[index+1];
      let p3 = p.path[index+2];
      let p4 = p.path[index+3];
      if(p3 && p4){
        mousemoveDraw(p1, p2, p3, p4);
      }
    }
    //mousemoveDraw(p.startPoint[0], p.startPoint[1], p.endPoint[0], p.endPoint[1]);
  }

}
