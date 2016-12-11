const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.lineWidth = 12;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.strokeStyle = "#BADA55"


let isDrawing = false;
let last = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e){
	if(!isDrawing) return;

	ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
	// use begin path to start
	ctx.beginPath();
	ctx.moveTo(lastX, lastY);
	ctx.lineTo(e.offsetX, e.offsetY);
	ctx.stroke();
	[lastX, lastY] = [e.offsetX, e.offsetY];
	
	hue++ % 360;

	if (ctx.lineWidth >= 30 || ctx.lineWidth <= 1) {
    direction = !direction;
  }
  direction ? ctx.lineWidth++ : ctx.lineWidth--;
  // if(direction) {
  //   ctx.lineWidth++;
  // } else {
  //   ctx.lineWidth--;
  // }
}

canvas.addEventListener('mousedown', (e) => {
	isDrawing = true;
	[lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing=false);
canvas.addEventListener('mouseover', () => isDrawing=false);