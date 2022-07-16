const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const start = {x:0, y:0}, offset = {x: canvas.offsetLeft, y: canvas.offsetTop},
      mouseDown = false, selection = false;
/*텍스트 영역을 클릭했는지 판단하는 함수*/
const textSelection = function(x, y, text){
	const tx = text.x, ty = text.y, tWidth = text.width, tHeight = text.height;
	return (x >= tx - tWidth/2 && x <= tx + tWidth/2 && y >= ty - tHeight && y <= ty);
}
/*Canvas 내 filltext 추가 함수*/
const drawText = function(text){
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = text.fillStyle;
	ctx.font = text.font;
	ctx.textAlign = "center";
	ctx.fillText(text.text, text.x, text.y);
	text.width = Number(ctx.measureText(text.text).width.toFixed(0));
}
canvas.addEventListener("mousedown", function(e){
	e.preventDefault();
	e.stopPropagation();
	const winScrollTop = window.scrollY;
	start.x = parseInt(e.clientX - offset.x);
	start.y = parseInt(e.clientY - offset.y + winScrollTop);
	if(textSelection(start.x, start.y, text)){
		selection = true;
	}
	mouseDown = true;
});
canvas.addEventListener("mousemove", function(e){
	e.preventDefault();
	if(mouseDown && selection){
		const winScrollTop = window.scrollY,
			  mouseX = parseInt(e.clientX - offset.x),
			  mouseY = parseInt(e.clientY - offset.y + winScrollTop);
		const dx = mouseX - start.x, dy = mouseY - start.y;
			
		start.x = mouseX;
		start.y = mouseY;
        
		text.x += Number(dx.toFixed(0));
		text.y += Number(dy.toFixed(0));
		drawText(text);
	}
});
canvas.addEventListener("mouseup", function(e){
	mouseDown = false;
	selection = false;
});
const text = {
  text: "알짜배기 프로그래머",
  font: "26px nanumBold",
  fillStyle: "#ff0000",
  x: canvas.width/2,
  y: canvas.height/2,
  width: 0,
  height: 26
}
drawText(text);
