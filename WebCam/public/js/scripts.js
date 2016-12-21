const player = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snapAudio = document.querySelector('.snap');
const takePhotoBtn = document.querySelector('#take-photo-btn');
let src;


function getVideo(){
	navigator.mediaDevices.getUserMedia({video:true, audio: false})
		.then(localMediaStream => {
			src = window.URL.createObjectURL(localMediaStream);
			player.src = window.URL.createObjectURL(localMediaStream);
			player.play();
		})
		.catch(err => console.error(err));
}

function paintToCanvas(){
	const width = player.videoWidth;
	const height = player.videoHeight;

	canvas.width = width;
	canvas.height = height;

	return setInterval(() => {

		ctx.drawImage(player, 0, 0, width, height);

	}, 16);
	
}

function takePhoto(){
	snapAudio.currentTime = 0;
	snapAudio.play();

	const data = canvas.toDataURL('image/jpeg');
	const link = document.createElement('a');
	link.href = data;
	link.setAttribute('download', 'photo');
	link.innerHTML = `<img src=${data} alt="cam photo"/>`;
	strip.insertBefore(link, strip.firstChild)
}

function toggleFullscreen(){
	if (player.requestFullscreen) {
	  player.requestFullscreen();
	} else if (player.mozRequestFullScreen) {
	  player.mozRequestFullScreen();
	} else if (player.webkitRequestFullscreen) {
	  player.webkitRequestFullscreen();
	}
}

function drag(e){
	// DON'T USE window.event because not compatible in firefox
	const posX = e.clientX;
  const posY = e.clientY;
    
  player.style.left = (posX - offsetInsideX) + 'px';
  player.style.top = (posY - offsetInsideY) + 'px';
}

getVideo();

player.addEventListener('canplay', paintToCanvas);
player.addEventListener('dblclick', toggleFullscreen);

let isDown = false;
let initialX;
let initialY;
player.addEventListener('mousedown', (e) => {
	isDown = true;
	offsetInsideX = e.offsetX;
	offsetInsideY = e.offsetY;
	console.log(e.offsetX, e.offsetY);
});
window.addEventListener('mouseup', () => isDown = false);
window.addEventListener('mousemove', (e) => isDown && drag(e))

takePhotoBtn.addEventListener('click', takePhoto);

