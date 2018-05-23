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
		
		// Preserve current context state, such as fillStyle
		ctx.save();

		ctx.clearRect(0,0,300,300);

		// Create a gradient background
    var grd = ctx.createLinearGradient(0,0,200,0);
		grd.addColorStop(0, "red");
		grd.addColorStop(1, "white");
		ctx.fillStyle = grd;
		ctx.fillRect(0,0,300,300);

    ctx.restore();

    // Create a square moving down
		ctx.fillRect(25,25+timeDiff,100,100);

		// Create a cross
		ctx.moveTo(0,0);
		ctx.lineTo(300,300);
		ctx.moveTo(0,300);
		ctx.lineTo(300,0);
		ctx.stroke();

		// Create a half circle
		ctx.beginPath();
		ctx.arc(150,150,100,0,Math.PI);
		ctx.stroke();

		ctx.font = "30px Arial";
		ctx.fillText("Henry", 100, 100);
		ctx.strokeText("Rebecca", 200, 100);

	}
	window.requestAnimationFrame(function() {draw(startTime)});

}