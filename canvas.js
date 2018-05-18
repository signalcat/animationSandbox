function init() {
	var startTime = new Date().getTime()/1000;
	window.requestAnimationFrame(function() {draw(startTime)});
}

function draw(startTime) {
	var time = new Date().getTime()/1000;
	var timeDiff = (time-startTime)*10;
	// console.log(timeDiff);
	//console.log(time);
	console.log(startTime);
	var canvas = document.getElementById('canvas');
	if (canvas.getContext) {
		var ctx = canvas.getContext('2d');
		ctx.clearRect(0,0,150,150);
		ctx.fillRect(25,25+timeDiff,100,100);
	}
	window.requestAnimationFrame(function() {draw(startTime)});

}