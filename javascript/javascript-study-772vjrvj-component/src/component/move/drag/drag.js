var box = document.querySelector('.box');
var drag = false;
pointX = 0;
pointY = 0;
imgPosX = 0;
imgPosY = 0;

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

        const left1 = box.style.left;
        const left2 = left1.substring(0, left1.length-2);

        const top1 = box.style.top;
        const top2 = top1.substring(0, top1.length-2);

        const left3 = Number(left2) + Number(diffWidth);
        const top3 = Number(top2) + Number(diffHeight);

        box.style.left = left3 + 'px';
        box.style.top = top3 + 'px';

    }
}

box.onmouseup = (e) => {
    drag = false;
}