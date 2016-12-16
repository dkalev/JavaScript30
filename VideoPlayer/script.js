const player = document.querySelector('.player');
const video = player.querySelector('video');
const playButton = player.querySelector('.play-btn');
const ranges = player.querySelectorAll('.slider');
const backButton = player.querySelector('.skip-backward-btn');
const forwardButton = player.querySelector('.skip-forward-btn');
const fullscreenButton = player.querySelector('.fullscreen');
const progress = player.querySelector('.progress-bar');
const progressBar = player.querySelector('.progress-filled');

 progressBar.style.flexBasis = '0%';	//initialize progress bar to 0

function togglePlay(){
	if(video.paused){
		video.play();
	}else{
		video.pause();
	}
}

function toggleFullscreen(){
	if (video.requestFullscreen) {
  video.requestFullscreen();
} else if (video.mozRequestFullScreen) {
  video.mozRequestFullScreen();
} else if (video.webkitRequestFullscreen) {
  video.webkitRequestFullscreen();
}
}

function updatePlayButton(){
	const icon = this.paused ? '►' : '❚ ❚';
	playButton.textContent = icon;
}

function skip(){
	video.currentTime += parseFloat(this.dataset.skip);
}

function handleProgress(){
	const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function handleRangeUpdate(){
	video[this.name] = this.value;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updatePlayButton);
video.addEventListener('pause', updatePlayButton);
video.addEventListener('timeupdate', handleProgress);

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

playButton.addEventListener('click', togglePlay);
backButton.addEventListener('click', skip);
forwardButton.addEventListener('click', skip);
fullscreenButton.addEventListener('click', toggleFullscreen);

let isDown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousedown', (e) => isDown && scrub(e));
progress.addEventListener('mouseup', () => isDown = false);
progress.addEventListener('mousedown', () => isDown = true);