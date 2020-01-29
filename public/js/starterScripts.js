if(windowW < 1000){
	window.onload = function(){

		// 5 секция 
		for(i=0; i<document.getElementsByClassName("characters-btn").length; i++){
			var element = document.getElementsByClassName("characters-btn")[i];
			element.addEventListener("mouseenter", characterBtnsHoverEnter);
			element.addEventListener("mouseleave", characterBtnsHoverLeave);
			element.addEventListener("click", characterBtnsActive);
		};

	};
}else{
	window.onload = function(){

		// хедер
		// при прокрутке колеса мыши
		window.addEventListener("wheel", sectionWheel);
		// при нажатии на кнопки хедера
		for(i=0; i<document.getElementsByClassName("header-btn").length; i++){
			var element = document.getElementsByClassName("header-btn")[i];
			element.addEventListener("click", sectionBtnsWheel);
		};

		// 3 секция
		noiseMaker();

		// 4 секция
		timingSlide();
		document.getElementsByClassName("slider-buttons")[0].onclick = function(){
			sliderBack();
			timingSlideStop();
		};
		document.getElementsByClassName("slider-buttons")[1].onclick = function(){
			sliderForward();
			timingSlideStop();
		};

		// 5 секция 
		for(i=0; i<document.getElementsByClassName("characters-btn").length; i++){
			var element = document.getElementsByClassName("characters-btn")[i];
			element.addEventListener("mouseenter", characterBtnsHoverEnter);
			element.addEventListener("mouseleave", characterBtnsHoverLeave);
			element.addEventListener("click", characterBtnsActive);
		};

		createParticleCanvas();

	};
};