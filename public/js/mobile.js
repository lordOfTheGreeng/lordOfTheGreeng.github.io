class NewWindow{

	constructor(settings){
		this.xPos = settings.xPos,
		this.yPos = settings.yPos,
		this.focus = 0,
		this.movementStartX = 0,
		this.movementStartY = 0,

		this.class = settings.class,
		this.id = settings.id,
		this.parentId = settings.parentId,

		this.objContent = settings.objContent
	}

	windowCreate(){
		let objHTML = "<div class='" + this.class + "' id='" + this.id + "'></div>",
			objMoveField = "<div class='window-move-field'></div>",
			objCloserHTML = "<div class='standart-window-closer-block unselected'><p class='standart-window-closer'>X</p></div>";

		document.getElementById(this.parentId).insertAdjacentHTML("beforeEnd", objHTML);
		document.getElementById(this.id).insertAdjacentHTML("beforeEnd", objMoveField);
		document.getElementById(this.id).insertAdjacentHTML("beforeEnd", objCloserHTML);

		this.windowSettings();
	}

	windowSettings(){
		let obj = document.querySelector("#" + this.id),
			objMoveField = document.querySelector("#" + this.id + "> .window-move-field"),
			objCloser = document.querySelector("#" + this.id + "> .standart-window-closer-block");

		this.windowPosition(obj);
		this.windowFocus(obj);
		this.windowContent(obj);
		this.windowFunctional(obj, objMoveField, objCloser);
	}

	windowPosition(obj){
		obj.style.left = this.xPos + "px";
		obj.style.top = this.yPos + "px";
	}

	windowFocus(obj){
		obj.style.zIndex = index;
		index++;
	}

	windowContent(obj){
		this.objContent.contentCreation(this);
	}

	windowFunctional(obj, objMoveField, objCloser){
		obj.addEventListener("mousedown", this.windowFocus.bind(this, obj));

		objMoveField.addEventListener("mousedown", this.windowMovePermission.bind(this));
		objMoveField.addEventListener("mouseup", this.windowMoveLock.bind(this));
		objMoveField.addEventListener("mousemove", this.windowMove.bind(this, obj));

		objCloser.addEventListener("click", this.windowClose.bind(obj));
	}

	windowMovePermission(){
		this.focus = 1;
		this.movementStartX = window.event.pageX - this.xPos;
		this.movementStartY = window.event.pageY - this.yPos;
	}

	windowMoveLock(){
		this.focus = 0;
	}

	windowMove(obj){
		if(this.focus == 1){
			let x = window.event.clientX,
				y = window.event.clientY;

				x -= this.movementStartX;
				y -= this.movementStartY;

			this.xPos = x;
			this.yPos = y;

			this.windowPosition(obj);
		}
	}

	windowClose(){
		this.remove();
	}

}

class HTMLContent{

	contentCreation(obj){
		let HTML = HTMLContentStorage[obj.id];

		document.getElementById(obj.id).insertAdjacentHTML("beforeEnd", HTML);

		this.contentActivation(obj);
	}

	contentActivation(obj){}
}

class PagesContent extends HTMLContent{

	contentActivation(obj){

		let btns = document.querySelectorAll("#" + obj.id + " .btn");

		if(btns.length){

			btns.forEach(function(item){

				let data = item.dataset.child;

				item.addEventListener("click", function(){

					if(!document.getElementById(data)){

						let objWindow = new NewWindow({
										"xPos": 0,
										"yPos": 0,
										"class": "standart-window second-layer-window window-style-1",
										"id": data,
										"parentId": "contentContainer",
										"objContent" : new HTMLContent
									 });

						objWindow.windowCreate();
					};
				});
			});
		};
	}
}

class YaMapContent extends HTMLContent{

	contentActivation(obj){

		ymaps.ready(init);
 
   		let myMap,
   			MyPlacemark;

   		function init(){

   			myMap = new ymaps.Map("map", {
   				center: [46.315022, 44.256972],
   				zoom: 16
   			});

   			MyPlacemark = new ymaps.Placemark([46.315022, 44.256972], {
   				hintContent: "Электроник-Сервис",
   				balloonContent: "19А, 1-й микрорайон.\n Пн-Пт: 9:00-20:00"
   			});

   			myMap.geoObjects.add(MyPlacemark);

   		}
	}

}

class SettingsContent extends HTMLContent{

	contentActivation(obj){

		let colorBtns = document.querySelectorAll("#" + obj.id + " .color-changer"),
			particleBtn = document.querySelector("#" + obj.id + " #particleOffBtn");

		if(colorBtns.length){

			colorBtns.forEach(function(item){

				let data = item.dataset.color;

				item.addEventListener("change", function(){

					let cssColorVarStorage = document.querySelector("html");

					cssColorVarStorage.style.setProperty(data, this.value);

					if(data == "--second-color") particle.forEach(item => item.color = this.value);

				});
			});
		};


		if(particleBtn){

			if(particleOn == true) particleBtn.innerText = "вкл";
				else particleBtn.innerText = "выкл";

			particleBtn.addEventListener('click', function(){

				if(particleOn == true){
					particleOn = false;
					particleBtn.innerText = "выкл";
				} else{
					particleOn = true;
					particleMoves();
					particleBtn.innerText = "вкл";
				}

			});

		};


	}
}





// particles
class Particles{

	constructor(){
		this.color = "rgb(153, 64, 51)";
		this.width = Math.floor(Math.random() * (4 - 1) + 1);
		this.height = Math.floor(Math.random() * (4 - 1) + 1);

		this.xPos = Math.floor(Math.random() * (clientW - 1) + 1);
		this.yPos = Math.floor(Math.random() * (clientH - 1) + 1);
		this.speed = Math.floor(Math.random() * (3 - 1) + 1);
	}

	particleSpawn(){
		ctx.fillStyle = this.color;
		return(ctx.fillRect( this.xPos,this.yPos, this.width, this.height));
	}

	particlePath(startX, startY){
		ctx.beginPath();
		ctx.moveTo(startX, startY);
		ctx.lineTo(this.xPos,this.yPos);
		ctx.lineWidth = .1;
		ctx.strokeStyle = this.color;
		ctx.stroke();
		ctx.closePath();
	}

	particleDirection(x,y){
		this.xPos = x;
		this.yPos = y;
	}

};


// функция работы с объектами партиклов
var particleMoves = function(){

	if(particleOn === true){

		setTimeout(function(){

			ctx.clearRect(0,0, clientW,clientH);

			for(var i = 0; i<dotsCount; i++){

				let direction = Math.floor(Math.random() * (4 - 1) + 1);
					x = particle[i].xPos;
					y = particle[i].yPos;

				switch (direction) {
					case 1:
						x += particle[i].speed;
						break;
					case 2:
						y += particle[i].speed;
						break;
					case 3:
						x += particle[i].speed;
						y += particle[i].speed;
						break;
				};

				// легкая функция ограничивающая выход за canvas
				if(x>clientW) x=0;
				if(y>clientH) y=0;

				particle[i].particleDirection(x,y);
				particle[i].particleSpawn();
				particle[i].particlePath(mousex, mousey);
				
			}
			particleMoves();
		}, 20);

	} else{
		ctx.clearRect(0,0, clientW,clientH);
	};

};





// переменные
var index = 2,
	clientW = document.body.clientWidth,
	clientH = document.body.clientHeight;


// подключение canvas
var canvas = document.getElementById("cvs"),
	ctx = canvas.getContext("2d");

// координаты мыши
var mousex = -150,
	mousey = -200;

// массив партиклов;
var particle = [];
var particleOn = true;
const dotsCount = 200;




window.onload = function(){

	document.getElementById("aboutUsBtn").onclick = function(){
		if(!document.getElementById("aboutUs")){

			let aboutUsWindow = new NewWindow({
									"xPos": 0,
									"yPos": 0,
									"class": "standart-window window-style-1 about-us-window",
									"id": "aboutUs",
									"parentId": "contentContainer",
									"objContent" : new PagesContent
								 });

			aboutUsWindow.windowCreate();
		} 
	}

	document.getElementById("contactUsBtn").onclick = function(){
		if(!document.getElementById("contactUs")){

			let contactUsWindow = new NewWindow({
									"xPos": 0,
									"yPos": 0,
									"class": "standart-window contact-us-window",
									"id": "contactUs",
									"parentId": "contentContainer",
									"objContent" : new PagesContent
								 });

			contactUsWindow.windowCreate();
		}
	}

	document.getElementById("mapBtn").onclick = function(){
		if(!document.getElementById("map")){

			let mapWindow = new NewWindow({
									"xPos": 0,
									"yPos": 0,
									"class": "standart-window",
									"id": "mapContainer",
									"parentId": "contentContainer",
									"objContent" : new YaMapContent
								 });

			mapWindow.windowCreate();
		}
	}

	document.getElementById("priceListBtn").onclick = function(){
		if(!document.getElementById("priceList")){

			let priceListWindow = new NewWindow({
									"xPos": 0,
									"yPos": 0,
									"class": "standart-window",
									"id": "priceList",
									"parentId": "contentContainer",
									"objContent" : new PagesContent
								 });

			priceListWindow.windowCreate();
		}
	}

	document.getElementById("trustBtn").onclick = function(){
		if(!document.getElementById("trust")){

			let trustWindow = new NewWindow({
									"xPos": 0,
									"yPos": 0,
									"class": "standart-window trust-window",
									"id": "trust",
									"parentId": "contentContainer",
									"objContent" : new PagesContent
								 });

			trustWindow.windowCreate();
		}
	}

	document.getElementById("settingsBtn").onclick = function(){
		if(!document.getElementById("settings")){

			let settingsWindow = new NewWindow({
									"xPos": 0,
									"yPos": 0,
									"class": "standart-window window-style-1 settings-window",
									"id": "settings",
									"parentId": "contentContainer",
									"objContent" : new SettingsContent
								 });

			settingsWindow.windowCreate();
		}
	}




	// canvas
	canvas.setAttribute("width", clientW);
	canvas.setAttribute("height", clientH);

	// заполняем массив объектами
	for(var i = 0; i<dotsCount; i++){
		particle[i] = new Particles();
		particle[i].particleSpawn();
	};

	// включаем функцию
	particleMoves();

}
