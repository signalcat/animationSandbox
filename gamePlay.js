var redGamePiece, blueGamePiece, yellowGamePiece;
var myGamePieces = []

function startGame() {
    myGameArea.start();
    blueGamePiece = new rectComponent(80, 80, "blue", 10, 120);
    redGamePiece = new rectComponent(80, 80, "red", 100, 120);
    yellowGamePiece = new rectComponent(80, 80, "yellow", 50, 120);
    
    myGamePieces.push(blueGamePiece);
    myGamePieces.push(redGamePiece);
    myGamePieces.push(yellowGamePiece);
}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
    	this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
    }
}

function rectComponent(width, height, color, x, y) {
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
	this.update = function() {
		ctx = myGameArea.context;
		ctx.fillStyle = color;
		ctx.fillRect(this.x, this.y, this.width, this.height);	
	}
}


function updateGameArea() {
	myGameArea.clear();
	
	redGamePiece.x += 1;
  yellowGamePiece.x += 1;
  yellowGamePiece.y += 1;
  blueGamePiece.x += 1;
  blueGamePiece.y -= 1;
  for (let i = 0; i < myGamePieces.length; i++)
	   myGamePieces[i].update();
}


