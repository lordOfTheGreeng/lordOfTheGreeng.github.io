// подключение canvas
var cvs = document.getElementById("particles");
	ctx = cvs.getContext("2d");

// массив партиклов;
var particle = [];
const dotsCount = 40;

class Particles{

	constructor(){
		this.particleColor = "red";
		this.px = randomizer(windowW);
		this.py = randomizer(windowH);
		this.w = randomizer(4);
		this.h = randomizer(4);
		this.speed = randomizer(3);
	}

	particleSpawn(){
		ctx.fillStyle = this.particleColor;
		return(ctx.fillRect( this.px,this.py, this.w, this.h));
	}

	particleDirection(x,y){
		this.px = x;
		this.py = y;
	}

};



function particleMoves(){
	ctx.clearRect(0,0, windowW,windowH);

	for(var i = 0; i<dotsCount; i++){

		let direction = randomizer(3);
			x = particle[i].px;
			y = particle[i].py;

		switch (direction) {
			case 1:
				y += particle[i].speed;
				break;
			case 2:
				x += particle[i].speed;
				break;
			case 3:
				x += particle[i].speed;
				y += particle[i].speed;
				break;
		};

		// легкая функция ограничивающая выход за canvas
		if(x>windowW) x=0;
		if(y>windowH) y=0;

		particle[i].particleDirection(x,y);
		particle[i].particleSpawn();
		
	}
	requestAnimationFrame(particleMoves);
};

function createParticleCanvas(){
	cvs.width = windowW;
	cvs.height = windowH;

	for(var i = 0; i<dotsCount; i++){
		particle[i] = new Particles();
		particle[i].particleSpawn();
	};

	particleMoves();
}