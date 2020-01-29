// хедер переменные
var beforeHeaderBtnActivated = document.getElementsByClassName("header-btn")[0];
	sectionTitles = ["ГЛАВНАЯ", "CYBERPRANK", "ПРЕДЗАКАЗ", "СКРИНШОТЫ", "ПЕРСОНАЖИ", "НОВОСТИ"];
	sectionCount = 6;
	maxSectionSlideDown = -((sectionCount - 1) * 100);
	slidePageCounter = 0;
	translateYPage = 0;
	blockSectionSliding = false;
	blockScroll = 0;


// функции хедера
function getHeaderBtnNum(){
	var btnNum = translateYPage/100;
	btnNum = Math.abs(btnNum);
	btnNum = Math.floor(btnNum);
	return btnNum;
}


function changeSectionTitle(){
	var btnNum = getHeaderBtnNum();
		element = document.getElementById("sections-title-text");

	element.style.opacity = "0";

	setTimeout(function(){
		element.innerHTML = sectionTitles[btnNum];
		element.style.opacity = "1";
	}, 500);
};
function changeHeaderBtnColor(){
	var num = getHeaderBtnNum();
		headerBtns = document.getElementsByClassName("header-btn");

	for(i=0; i<headerBtns.length; i++) headerBtns[i].style.color = "#00437AFF";

	headerBtns[num].style.color = "#51DFFFFF";
};


function changeHeader(){
	changeHeaderBtnColor();
	changeSectionTitle();
};
function scrollSection(){
	document.querySelector(".scrolling-wheel").style.transform = "translateY("+translateYPage+"vh)";
	document.querySelector("#particles").style.top = Math.abs(translateYPage) + "vh";
};


// прокрутка страницы колесом мыши
function sectionWheel(e){

	if(blockSectionSliding === false){
		// отключаем и
		blockSectionSliding = true;

		e = e || window.event;

		// получаем направление прокрутки
		var delta = e.deltaY || e.detail || e.wheelDelta;


		// спуск вниз
		if(delta > 0){
			if(translateYPage === maxSectionSlideDown){
			}else{
				translateYPage -= 100;
				changeHeader();
				scrollSection();
			};
		}
		// подъем вверх
		else{
			if(translateYPage === 0){
			}
			else{
				translateYPage += 100;
				changeHeader();
				scrollSection();
			};
		};

		// включаем прокрутку в операторе if, чтобы точно все срабатывало как надо
		setTimeout(function(){
			blockSectionSliding = false;
		}, 600);
	};

};


// прокрутка страницы кнопками
function sectionBtnsWheel(){
	var elementId = this.getAttribute("id");
		topMargin = document.getElementsByClassName(elementId)[0].offsetTop;
		topMarginVh = -((topMargin/window.innerHeight) * 100);
	

	translateYPage = topMarginVh;
	
	changeHeader();
	scrollSection();
};