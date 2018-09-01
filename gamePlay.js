var myGamePiece;
var myObstacles = [];
var myScore;
var myBackground;

function startGame() {


    myGamePiece = new imageComponent(30, 30, "smiley.gif", 10, 120);

    myScore = new textComponent("30px", "Consolas", "black", 280, 40);
    myGameArea.start();

    myBackground = new backgroundComponent(656, 270, "bg.png", 0, 0);


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
            // this.canvas.style.cursor = "none";
            this.context = this.canvas.getContext("2d");
            this.frameNo = 0;
            document.body.insertBefore(this.canvas, document.body.childNodes[0]);
            this.interval = setInterval(updateGameArea, 20);
            window.addEventListener('mousedown', function(e){
                    console.log("mousedown!");
                    myGameArea.x = e.pageX - getOffsetLeft(myGameArea.canvas);
                    myGameArea.y = e.pageY - getOffsetTop(myGameArea.canvas);
                    })
            window.addEventListener('mouseup', function(e){
                    console.log("mouseup!");
                    myGameArea.x = false;
                    myGameArea.y = false;
                    })
            window.addEventListener('touchstart', function(e) {
                    myGameArea.x = e.pageX;
                    myGameArea.y = e.pageY;
                    })
            window.addEventListener('touchend', function(e) {
                    myGameArea.x = false;
                    myGameArea.y = false;
                    })
        },
        clear : function() {
                    this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
        },

        stop : function() {
            clearInterval(this.interval);
            myGamePiece.image.src = "died.jpeg";
            myGamePiece.image.onload = function() {
                myGamePiece.update();
                this.onload = null;
            }
        },

        everyinterval : function(n) {
            return ((this.frameNo / n) % 1 == 0);
        }
}

function textComponent(fontSize, fontName, color, x, y) {
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.fontSize = fontSize;
    this.fontName = fontName;

    this.update = function() {
        var ctx = myGameArea.context;
        ctx.font = this.fontSize + " " + this.fontName;
        ctx.fillStyle = color;
        ctx.fillText(this.text, this.x, this.y);
    }
}

function gameComponent(width, height, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;

    this.clicked = function() {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        return ((myGameArea.y <= mybottom) && (myGameArea.y >= mytop)
                && (myGameArea.x >= myleft) && (myGameArea.x <= myright));
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        return !((mybottom < othertop) ||
               (mytop > otherbottom) ||
               (myright < otherleft) ||
               (myleft > otherright));
    }
}

function imageComponent(width, height, image, x, y) {
    gameComponent.call(this, width, height, x, y);
    this.image = new Image();
    this.image.src = image;

    this.update = function() {
        var ctx = myGameArea.context;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

function backgroundComponent(width, height, image, x, y) {
	imageComponent.call(this, width, height, image, x, y);
	this.parentUpdate = this.update;
	this.update = function() {
		this.parentUpdate();
		ctx = myGameArea.context;
		ctx.drawImage(this.image, 
                this.x + this.width, this.y, this.width, this.height);
	}
	this.parentNewPos = this.newPos;
	this.newPos = function() {
		this.parentNewPos();
		if (this.x == -(this.width)) {
                this.x = 0;
     }
	}
}

function rectComponent(width, height, color, x, y) {
    gameComponent.call(this, width, height, x, y);
    this.update = function() {
        var ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

function updateGameArea() {
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            myGameArea.stop();
            return;
        }
    }

    myGameArea.clear();
    myBackground.speedX = -1;

    myGameArea.frameNo += 1;

    // At the first frame or every 150(frame) * 20 ms (approx.),
    // create a new obstacle
    if (myGameArea.frameNo == 1 || myGameArea.everyinterval(150)) {
        x = myGameArea.canvas.width;
        y = myGameArea.canvas.height;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight - minHeight + 1) + minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap - minGap + 1) + minGap);
        myObstacles.push(new rectComponent(10, height, "green", x, 0));
        myObstacles.push(new rectComponent(10, y - height - gap, "green", x, height + gap));
    }

    // Render background at the bottom
    myBackground.newPos();
    myBackground.update();

    // Reduce unused previous obstacles
    while (myObstacles.length > 0 && myObstacles[0].x < 0) {
        myObstacles.shift();
    }

    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -1;
        myObstacles[i].update();
    }

    myScore.text = "SCORE: " + myGameArea.frameNo;
    myScore.update();
    myGamePiece.newPos();
    myGamePiece.update();

}

function move(dir) {
    console.log("Move called!");
    myGamePiece.image.src = "angry.gif";
    if (dir == "up" )myGamePiece.speedY -= 1;
    if (dir == "down" )myGamePiece.speedY += 1;
    if (dir == "left" )myGamePiece.speedX -= 1;
    if (dir == "right" )myGamePiece.speedX += 1;
}

function stopMove() {
    myGamePiece.image.src = "smiley.gif";
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
}
