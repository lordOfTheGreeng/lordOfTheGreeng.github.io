//секция персонажей переменные
var	beforeCharacterBtnActiveId = "";
	wasCharacterActivatedBeforeCheck = false;
	wasErrorCharacter = false;

var	charactersList = {
	blue: {
		color: "#00F9FF",
		name: "V(протагонист)",
		description: "Персанаж V впервые был показан CD Project Red на E3 2018 на первой презентации Cyberpunk 2077   "  +
		"с 2013 года. Имя персонажа V является созвучным с we(мы), так разработчики стирают грань между нами и персонажем " +
		"заставляя нас еще сильнее проникнуть жизнью ночного города киберпанка.",
		img: "public/img/characters/first-character.png"
	},
	yellow: {
		color: "#FFF500FF",
		name: "Джеки Уэллс",
		description: "Наёмник Джеки очень опытный убийца. Если бы история происходила на "  +
		"Диком Западе, он точно был бы стрелком или охотником за головами. " +
		"В 2077 очутился в мире киберпанка за пределами высшей лиги. " +
		"И он хочет ворваться в игру по-настоящему. ",
		img: "public/img/characters/second-character.png"
	},
	green: {
		color: "#00FF00FF",
		name: "blocked",
		img: "public/img/characters/third-character.jpg"
	},
	purple: {
		color: "#FF00FBFF",
		name: "blocked",
		img: "public/img/characters/fourth-character.jpg"
	},
	red: {
		color: "#FF0000FF",
		name: "Майор Пэйн",
		description: "Рожденный чтобы убивать, Майор Пэйн и его КИБЕРПАРОВОЗИК уничтожали противников одного за другим, пока он не " +
		"получает внезапную отставку. Теперь бывшему спецназовцу предстоит воспитать из КИБЕРКАДЕТОВ настоящих КИБЕРЛЮДЕЙ.",
		img: "public/img/characters/fifth-character.png"
	},
	orange: {
		color: "#FF5400FF",
		name: "Maelstorm",
		description: "Это относительно молодая группировка, сформированная из разгромленных банд Metal Warriors, Red Chrome Legion и Ironsights.",
		img: "public/img/characters/sixth-character.png"
	}
};







// создаем функции, что будем использовать, для избежания излишнего кода
function changeBlockShadow(characterElem, color1, color2, color3, color4){

	characterElem.style.border = "2px solid" + color1;
	characterElem.style.boxShadow = "2px 0 5px 0px "+ color2 +"," + 
		 "-2px 0 5px 0px "+ color2 +"," + 
		 "0px 2px 5px 0px "+ color2 +"," + 
		 "0px -2px 5px 0px "+ color2 +"," + 
		 "inset 2px 0 10px 2px "+ color3 +"," +
		 "inset -2px 0 10px 2px "+ color3 +"," +
		 "inset 0px 2px 10px 2px "+ color3 +"," +
		 "inset 0px -2px 10px 2px "+ color3 +"," +
		 "inset 7px 0 10px 2px "+ color4 +"," +
		 "inset -7px 0 10px 2px "+ color4 +"," +
		 "inset 0px 7px 10px 2px "+ color4 +"," +
		 "inset 0px -7px 10px 2px "+ color4 +"";

}
function getNoHoverBlockShadow(characterId){
	let characterElem = document.getElementById(characterId);
	changeBlockShadow(characterElem, "#0C0C0CFF", "#111", "#222", "#252525");
};

function getActiveBlockShadow(characterId){
	let characterElem = document.getElementById(characterId);
	changeBlockShadow(characterElem, charactersList[characterId].color, charactersList[characterId].color, "#222", "#252525");
};


function characterBtnsHoverEnter(){
	if(this.classList.contains("active")){
		return false;
	}else{
		characterId = this.id;
		getActiveBlockShadow(characterId);
	};
};
function characterBtnsHoverLeave(){
	if(this.classList.contains("active")){
		return false;
	}else{
		characterId = this.id;
		getNoHoverBlockShadow(characterId);
	};
};




function getBg(elem, url, bgSizeVal){
	elem.style.backgroundImage = url;
	elem.style.backgroundRepeat = "no-repeat";
	elem.style.backgroundSize = bgSizeVal;
}
function getCharacters(characterId){
	let url;
	switch(characterId){
		case "blue":
		case "orange":
		case "red":
		case "yellow":
			url = "url('" + charactersList[characterId].img + "')";

			characterSide.insertAdjacentHTML("afterbegin", characterBlockHTML);

			getBg(characterSide, url, "contain");

			characterSide.style.color = charactersList[characterId].color;
			characterSide.style.opacity = "1";
		break;
		default:
			url = "url('" + charactersList[characterId].img + "')";

			getBg(characterSide, url, "cover");

			document.getElementsByClassName("error")[0].style.display = "flex";
			wasErrorCharacter = true;	
		}
};


function characterBtnsActive(){

	var	characterId = this.id;
		characterBlockHTML = "<div class='character-block'><div class='character-name'><h3>"+ charactersList[characterId].name +"</h3></div>" +
			"<div class='character-description'><p>"+ charactersList[characterId].description + "</p></div></div>";
		characterSection = document.getElementsByClassName("character-section")[0];
		characterSide = document.getElementsByClassName("character-side")[0];

	if(wasCharacterActivatedBeforeCheck === false){

		this.classList.add("active");
		beforeCharacterBtnActiveId = this.id;
		wasCharacterActivatedBeforeCheck = true;

		getActiveBlockShadow(characterId);
		getCharacters(characterId);

	}
	else{

		if( this.id === beforeCharacterBtnActiveId){
			return false;
		}else{
			document.getElementById(beforeCharacterBtnActiveId).classList.remove("active");
			getNoHoverBlockShadow(beforeCharacterBtnActiveId);

			this.classList.add("active");
			beforeCharacterBtnActiveId = this.id;
			getActiveBlockShadow(characterId);

			characterSide.style.opacity = "0";
			setTimeout(function(){
				if(document.getElementsByClassName("character-block")[0]){
					document.getElementsByClassName("character-block")[0].remove();
				}
				if(wasErrorCharacter === true){
					characterSection.style.backgroundImage = "none";
					document.getElementsByClassName("error")[0].style.display = "none";
				}
				characterSide.style.backgroundImage = "none";
				getCharacters(characterId);
			}, 300);
		};

	};

};