var sliderCounter = 0;
var imgMarketingCounter = 0;
	imgMarketingStorage = [
	'public/img/third-section/cyber2.jpg',
	'public/img/third-section/126419-noch-video-artist-elektronnye_tablo-zhivopis-2048x1152.jpg',
	'public/img/third-section/a-conversation-with-the-artist-behind-that-cyberpunk-2077-poster-1560377034698.jpg',
	'public/img/third-section/151820.jpg'];

// создания изображения помех в 3 секции
function noiseTimer(){
	if(imgMarketingCounter > 3){
		imgMarketingCounter = 0;
	}
	setTimeout(function(){

		for( var i=0; i<document.getElementsByClassName("noise").length; i++){
			var noise = document.getElementsByClassName("noise")[i];
			noise.style.animation = "makingSomeNoise .2s infinite";
			noise.style.animationDuration = (i/1000) + "s";
			noise.style.display = "block";
		}

		setTimeout(function(){

			for( var i=0; i<document.getElementsByClassName("noise").length; i++){
				var noise = document.getElementsByClassName("noise")[i];
				noise.style.backgroundImage = "url('"+imgMarketingStorage[imgMarketingCounter]+"')";
			};

		}, 350);
		setTimeout(function(){
			marketingBlock.style.backgroundImage = "url('" + imgMarketingStorage[imgMarketingCounter] + "')";
		}, 400);
		setTimeout(function(){

			for( var i=0; i<document.getElementsByClassName("noise").length; i++){
				var noise = document.getElementsByClassName("noise")[i];
					noise.style.display = "none";
					noise.style.animation = "none";
			};

		}, 700);

		imgMarketingCounter++;
		noiseTimer();
	}, 6000);
}
function noiseMaker(){
	var	stripsHeight = 1;
		countNoiseStrips = Math.floor(100/stripsHeight/2);
		noiseHTML = "<div class='noise'></div>";
		marketingBlock = document.getElementsByClassName("marketing-block")[0];

	marketingBlock.style.backgroundImage = "url('"+imgMarketingStorage[imgMarketingCounter]+"')";

	for( var i=0; i<countNoiseStrips; i++){
		marketingBlock.insertAdjacentHTML("beforeEnd", noiseHTML);

		var noise = document.getElementsByClassName("noise")[i];
			topStripsPosition = i*stripsHeight*2;
			topStripsBgPosition = topStripsPosition;

		noise.style.height = stripsHeight + "%";
		noise.style.top = topStripsPosition + "%";
		noise.style.backgroundImage = "url('"+imgMarketingStorage[imgMarketingCounter]+"')";
		noise.style.backgroundPosition = "center " + (topStripsBgPosition) + "%";
		noise.style.display = "none";
	}
	noiseTimer();
}