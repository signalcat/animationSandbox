var myGamePiece;

function startGame() {
    myGameArea.start();
    myGamePiece = new rectComponent(30, 30, "red", 10, 120);
}

function getOffsetLeft( elem )
{
    var offsetLeft = 0;
    do {
      if ( !isNaN( elem.offsetLeft ) )
      {
          offsetLeft += elem.offsetLeft;
      }
    } while( elem = elem.offsetParent );
    return offsetLeft;
}

function getOffsetTop( elem )
{
    var offsetTop = 0;
    do {
      if ( !isNaN( elem.offsetTop ) )
      {
          offsetTop += elem.offsetTop;
      }
    } while( elem = elem.offsetParent );
    return offsetTop;
}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.canvas.style.cursor = "none";
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function(e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = true;
        });
        window.addEventListener('keyup', function(e) {
            if (myGameArea.keys) {
                myGameArea.keys[e.keyCode] = false;
            }
        });
        // window.addEventListener('mousemove', function(e){
        //   myGameArea.x = e.pageX;
        //   myGameArea.y = e.pageY;
        // })
        window.addEventListener('touchmove', function(e) {
          myGameArea.x = e.touches[0].pageX - getOffsetLeft(myGameArea.canvas);
          myGameArea.y = e.touches[0].pageY - getOffsetTop(myGameArea.canvas);
        })
    },
    clear : function() {
    	this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
    }
}

function rectComponent(width, height, color, x, y) {
	this.width = width;
	this.height = height;
    this.speedX = 0;
    this.speedY = 0;
	this.x = x;
	this.y = y;
	this.update = function() {
		ctx = myGameArea.context;
		ctx.fillStyle = color;
		ctx.fillRect(this.x, this.y, this.width, this.height);	
	}
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
}


function updateGameArea() {
    myGameArea.clear();
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
    if (myGameArea.keys && myGameArea.keys[37]) {myGamePiece.speedX = -1; }
    if (myGameArea.keys && myGameArea.keys[39]) {myGamePiece.speedX = 1; }
    if (myGameArea.keys && myGameArea.keys[38]) {myGamePiece.speedY = -1; }
    if (myGameArea.keys && myGameArea.keys[40]) {myGamePiece.speedY = 1; }
    myGamePiece.newPos();

    if (myGameArea.x && myGameArea.y) {
      myGamePiece.x = myGameArea.x;
      myGamePiece.y = myGameArea.y;
    }

    myGamePiece.update();
}

function moveup() {
    myGamePiece.speedY -= 1;
}
function movedown() {
    myGamePiece.speedY += 1;
}
function moveleft() {
    myGamePiece.speedX -= 1;
}
function moveright() {
    myGamePiece.speedX += 1;
}

function stopMove() {
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
}
