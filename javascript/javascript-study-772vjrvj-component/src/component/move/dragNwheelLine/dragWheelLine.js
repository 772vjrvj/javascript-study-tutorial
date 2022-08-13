var box = document.getElementById('box');
var container = document.getElementById('container');
var btn = document.querySelector('.btn');
var activeLine = false;

var line1 = document.getElementById('line1');
var line2 = document.getElementById('line2');
var line3 = document.getElementById('line3');
var line4 = document.getElementById('line4');

var line5 = document.getElementById('line5');
var line6 = document.getElementById('line6');
var line7 = document.getElementById('line7');
var line8 = document.getElementById('line8');


var focusLine = document.querySelector('.focusLine');


btn.onclick = (e) => {
    const active = btn.classList.contains('active');


    if(active){
        btn.classList.remove('active');
        activeLine = false;
    }else{
        btn.classList.add('active');
        activeLine = true;
    }

}



var drag = false;
pointX = 0;
pointY = 0;
imgPosX = 150;
imgPosY = 150;
imgWidth = 300;
imgHeight = 300;
rate = 0.08;

box.onmousedown = (e) => {
    drag = true;
    pointX = e.offsetX || (e.pageX - canvas.offsetLeft);
    pointY = e.offsetY || (e.pageY - canvas.offsetTop);
}


container.onmousemove = (e) => {
    if(!drag && activeLine){
        if(e.target.id === 'container'){
            pointX = e.offsetX;
            pointY = e.offsetY;
        }else if(e.target.id === 'box'||e.target.id === 'svgIn'){
            pointX = imgPosX + e.offsetX;
            pointY = imgPosY + e.offsetY;
        }

        // lineIn();
        // lineOut();



        // const pow = (imgPosX - pointX) ** 2 + (imgPosY - pointY) ** 2;
        // const diff = Math.sqrt(pow);

        // line1.style.width = diff + 'px';
        // line1.style.height = '2px';
        // line1.style.backgroundColor = 'red';

    }
}

function lineOut(){
    line1.setAttribute('x1',imgPosX);
    line1.setAttribute('y1',imgPosY);
    line1.setAttribute('x2',pointX);
    line1.setAttribute('y2',pointY);

    line2.setAttribute('x1',imgPosX + imgWidth);
    line2.setAttribute('y1',imgPosY);
    line2.setAttribute('x2',pointX);
    line2.setAttribute('y2',pointY);

    line3.setAttribute('x1',imgPosX);
    line3.setAttribute('y1',imgPosY + imgHeight);
    line3.setAttribute('x2',pointX);
    line3.setAttribute('y2',pointY);

    line4.setAttribute('x1',imgPosX + imgWidth);
    line4.setAttribute('y1',imgPosY + imgHeight);
    line4.setAttribute('x2',pointX);
    line4.setAttribute('y2',pointY);
}

function lineIn(){
    line5.setAttribute('x1',imgPosX - 150);
    line5.setAttribute('y1',imgPosY - 150);
    line5.setAttribute('x2',pointX - 150);
    line5.setAttribute('y2',pointY - 150);

    line6.setAttribute('x1',imgPosX - 150 + imgWidth);
    line6.setAttribute('y1',imgPosY - 150);
    line6.setAttribute('x2',pointX - 150);
    line6.setAttribute('y2',pointY - 150);

    line7.setAttribute('x1',imgPosX - 150);
    line7.setAttribute('y1',imgPosY - 150 + imgHeight);
    line7.setAttribute('x2',pointX - 150);
    line7.setAttribute('y2',pointY - 150);

    line8.setAttribute('x1',imgPosX - 150 + imgWidth);
    line8.setAttribute('y1',imgPosY - 150 + imgHeight);
    line8.setAttribute('x2',pointX - 150);
    line8.setAttribute('y2',pointY - 150);
}



box.onmousemove = (e) => {

    if(drag && !activeLine){
        const movePointX = e.offsetX; //움직이는 마우스 x좌표
        const movePointY = e.offsetY;  //움직이는 마우스 y좌표
        const diffWidth = movePointX - pointX;
        const diffHeight = movePointY - pointY;

        box.style.left = imgPosX + diffWidth + 'px';
        box.style.top = imgPosY + diffHeight + 'px';

        imgPosX = imgPosX + diffWidth;
        imgPosY = imgPosY + diffHeight;

    }
}

box.onmouseup = (e) => {
    drag = false;
}


container.onwheel = (e) => {

    if(e.target.id === 'container'){
        pointX = e.offsetX;
        pointY = e.offsetY;
    }else if(e.target.id === 'box'||e.target.id === 'svgIn'){
        pointX = imgPosX + e.offsetX;
        pointY = imgPosY + e.offsetY;
    }


    if(e.deltaY < 0){ //스크롤 up
        rate = 1 + 0.08;
    }else{ //스크롤 down
        rate = 1 - 0.08;
    }
    
    //직선 방정식 점대칭 이용
    imgPosX = rate * (imgPosX - pointX) + pointX;
    imgPosY = rate * (imgPosY - pointY) + pointY;

    box.style.left = imgPosX + 'px';
    box.style.top = imgPosY + 'px';

    imgWidth = imgWidth * rate;
    imgHeight = imgHeight * rate;

    box.style.width = imgWidth + 'px';
    box.style.height = imgHeight + 'px';

    // lineIn();
    // lineOut();
}
