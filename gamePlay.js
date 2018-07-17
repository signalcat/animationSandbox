var myGamePiece;
var myObstacles = [];

function startGame() {


    myGamePiece = new rectComponent(30, 30, "red", 10, 120);
    myObstacle = new rectComponent(10, 200, "green", 300, 120);
    myGameArea.start();


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
        },

        everyinterval : function(n) {
            return ((this.frameNo / n) % 1 == 0);
        }
}

function rectComponent(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;

    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);	
    }
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



function updateGameArea() {

    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            myGameArea.stop();
            return;
        }
    }
    
    myGameArea.clear();
    myGameArea.frameNo += 1;
    
    // At the first frame or every 150(frame) * 20 ms (approx.),
    // create a new obstacle
    if (myGameArea.frameNo == 1 || myGameArea.everyinterval(150)) {
        x = myGameArea.canvas.width;
        y = myGameArea.canvas.height - 200;
        myObstacles.push(new rectComponent(10, 200, "green", x, y));
    }

    while (myObstacles.length > 0 && myObstacles[0].x < 0) {
        myObstacles.shift();
    }

    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -1;
        myObstacles[i].update();
    }
    
    myGamePiece.newPos();
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
