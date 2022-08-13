var box = document.getElementById('box');
var container = document.getElementById('container');



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

box.onmousemove = (e) => {
    if(drag){
        const movePointX = e.offsetX || (e.pageX - canvas.offsetLeft); //움직이는 마우스 x좌표
        const movePointY = e.offsetY || (e.pageY - canvas.offsetTop);  //움직이는 마우스 y좌표
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
    }else if(e.target.id === 'box'){
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
    
}
