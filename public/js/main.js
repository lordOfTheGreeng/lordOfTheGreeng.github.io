var windowW = window.innerWidth;
var windowH = window.innerHeight;

function randomizer(num, secondNum = 1){
	return(Math.floor(Math.random() * (num - secondNum) + secondNum));
}
// подключение мобильного или комп хедера
// функция подключения css файлов
function includeCss(href){
	var link = document.createElement('link');
    link.href = href;
    link.rel = "stylesheet";
    document.querySelector("head").appendChild(link);
};
// функция подключения js файлов
function includeJs(url){
	var script = document.createElement('script');
    script.src = url;
    document.body.append(script);
};

if(windowW < 1000){
	includeCss("public/css/mobile-style.css");
	includeJs("public/js/characters.js");
	includeJs("public/js/starterScripts.js");
}else{
	let headerBtnsHTML = '<header>'
	+ '<div class="header-btn" id="first-section"><p>1</p></div>'
	+ '<div class="header-btn" id="second-section"><p>2</p></div>'
	+ '<div class="header-btn" id="third-section"><p>3</p></div>'
	+ '<div class="header-btn" id="fourth-section"><p>4</p></div>'
	+ '<div class="header-btn" id="fifth-section"><p>5</p></div>'
	+ '<div class="header-btn" id="sixth-section"><p>6</p></div>'
	+ '</header>';

	let sectionTitlesHTML = '<div id="sections-title"><h2 id="sections-title-text">ГЛАВНАЯ</h2></div>';

	let canvasHTML = '<canvas id="particles"></canvas>';

	let HTMLMerge = headerBtnsHTML;
		HTMLMerge += sectionTitlesHTML;

	let iframeContainerHTML = '<div class="container">'
	+ '<iframe style="width: 100vw; height:100vh;" src="https://www.youtube.com/embed/DvVjkqB3LH0?autoplay=1&loop=1&playlist=DvVjkqB3LH0&disablekb=1&mute=1" autoplay="1" frameborder="0" allowfullscreen></iframe>'
	+ '<div class="glitch"></div><div class="border-bottom"></div>'
	+ '</div>';

	let sliderBtnsHTML = '<div class="slider-buttons left-button"><span></span></div>'
	+ '<div class="slider-buttons right-button"><span></span></div>';

	document.querySelector(".scroll-container").insertAdjacentHTML("afterbegin", HTMLMerge);
	document.querySelector(".scrolling-wheel").insertAdjacentHTML("afterbegin", canvasHTML);
	document.querySelector(".first-section").insertAdjacentHTML("afterbegin", iframeContainerHTML);
	document.querySelector(".slider-wheel").insertAdjacentHTML("beforeEnd", sliderBtnsHTML);

	includeCss("public/css/style.css")
	includeJs("public/js/header.js");
	includeJs("public/js/slider.js");
	includeJs("public/js/noise-slider.js");
	includeJs("public/js/particles.js");
	includeJs("public/js/characters.js");
	includeJs("public/js/starterScripts.js");
}