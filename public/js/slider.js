//slidersection
function slideShow(value){
	if(value){
		document.getElementsByClassName("slide")[sliderCounter].classList.add("show");
	} else{
		document.getElementsByClassName("slide")[sliderCounter].classList.remove("show");
	};
}

function sliderBack(){
	if(sliderCounter == 0){
		slideShow(false);
		sliderCounter = 9;
		slideShow(true);
	}else{
		slideShow(false);
		sliderCounter--;
		slideShow(true);
	};
}

function sliderForward(){
	if(sliderCounter == 9){
		slideShow(false);
		sliderCounter = 0;
		slideShow(true);
	}else{
		slideShow(false);
		sliderCounter++;
		slideShow(true);
	};
}

function timingSlide(){
	window.timingslider = setTimeout(function(){
		sliderForward();
		timingSlide();
	}, 3000);
};

function timingSlideStop(){
	clearTimeout(timingslider);
};