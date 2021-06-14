let colors = ['red','green','blue','yellow','violet'];
let body = document.body;
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let scors = document.querySelectorAll('.score');
let num = 0;
let total = 100;
let gameOver = false;
let totalShadow = document.querySelector('.total-shadow');

let currentBalloon = 0;

function createBalloons(){
	let div = document.createElement('div');
	let rand = Math.floor(Math.random() * colors.length);
	console.log(div);
	div.className = 'balloon balloon-'+ colors[rand];

	rand= Math.floor(Math.random() * (windowWidth - 100));
	div.style.left = rand + 'px';

	div.dataset.number = currentBalloon;
	currentBalloon++;

	body.appendChild(div);
	animateBalloon(div);

}

function animateBalloon(elem){
	let pos = 0;
	let random = Math.floor(Math.random() * 6 - 3);
	let interval = setInterval(frame, 10 -Math.floor(num/10) + random);

	function frame(){
		//console.log(pos);
		if((pos>= windowHeight + 200) && (document.querySelector('[data-number="'+elem.dataset.number+'"]'))!= null){
			clearInterval(interval);
			gameOver= true;		}
		else{
			pos++;
			elem.style.top = windowHeight - pos + 'px';
		}
	}
}

function deleteBalloon(elem){
	elem.remove();
	num++;
	palyBallSound();
	updateScore();

}

function palyBallSound(){
	let audio = document.createElement('audio');
	audio.src = 'sounds/pop.mp3';
	audio.play();
}
function updateScore(){
	for(let i =0; i<scors.length ; i++){
		scors[i].textContent = num;
	}
}
function startGame(){
	restartGame();
	let timeout=0;
	let loop = setInterval(function(){
		timeout = Math.floor(Math.random() * 600 - 100)
		if(!gameOver && num!==total){
			createBalloons();
		}else if(num!== total){
			clearInterval(loop);
			totalShadow.style.display = 'flex';
			totalShadow.querySelector('.lose').style.display = 'block';
		}else{
			clearInterval(loop);
			totalShadow.style.display =  'flex';
			totalShadow.querySelector('.win').style.display = 'block';
		}
		
	}, 800 + timeout)
}

function restartGame(){
	let forRemoving = document.querySelectorAll('.balloon');
	for(let i = 0 ; i<forRemoving.length ; i++){
		forRemoving[i].remove();
	}
	gameOver = false;
	num = 0;
	updateScore();
}

/*
//dosen't work because we cann't add a eventlistener which is not in html
//solution: event dalication (work on those which is in html and not in html),add event to the hole web page
let balloons = document.querySelectorAll('.balloon');
for(let i = 0 ; i < balloons.length ; i++){
	balloons[i].addEventListener('click',function(){
		deleteBalloon(balloons[i]);
	})
}*/
//add event listener to the whole web page
/*document.addEventListener('click', function(){
	console.log('click');
})*/

//this approach called 'Event Deligation in javaSctipt'
document.addEventListener('click',function(event){//this event object keep track on all user event
	if(event.target.classList.contains('balloon')){
		deleteBalloon(event.target);
	}
	//console.log(event);
})
document.querySelector('.restart').addEventListener('click',function(){
	totalShadow.style.display = 'none';
	totalShadow.querySelector('.win').style.display = 'none';
	totalShadow.querySelector('.lose').style.display = 'none';
	startGame();
})
document.querySelector('.cancle').addEventListener('click',function(){
	totalShadow.style.display = 'none';
})
startGame();
