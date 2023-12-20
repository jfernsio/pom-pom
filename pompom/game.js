let hi;
hi = prompt("Enter Your Email and pass");
console.log(hi);

var canvas;
var canvasContext;
var ballx = 100;
var ballSpeedx = 12;
var bally = 100;
var ballSpeedy = 12;

var padelY = 250;
var pade2Y = 250;
const PADDLE_HEIGHT = 100;
const PADDLE_THICCNESS = 10; // change value to make paddle big or small

var showWinScrn = false;

var plyr1score = 0;
var plyr2score = 0;
const WINNING_SCORE = 14; 



var backGroundMusic = document.getElementById('bgMusic');
var video = document.getElementById('video');

backGroundMusic.play();

function calcMousePos(evt) {
          var rect = canvas.getBoundingClientRect();
          var root = document.documentElement;
          var mouseX = evt.clientX - rect.left - root.scrollLeft;
          var mouseY = evt.clientY - rect.top - root.scrollTop;
              return {
                 x:mouseX,
                 y: mouseY
              };
}

function handleMouseClick (evt) {
    if (showWinScrn) {
        plyr1score = 0;
        plyr2score = 0;
        showWinScrn = false;
    }
}

window.onload = function() {
   //  console.log('hellold');
      canvas=document.getElementById('gameCanvas');
       canvasContext= canvas.getContext('2d');

/*temp local variable*/
          var framesPerSecond = 30;
/*using as inline*/
            setInterval(function() {
                     moveEverything();
                     drawEyerything();
} ,              1000/framesPerSecond);

          canvas.addEventListener('mousemove', function(evt) {
                     var mousePos = calcMousePos(evt);
                     padelY= mousePos.y-(PADDLE_HEIGHT/2); 
          }
          
          );

          canvas.addEventListener('mousedown',handleMouseClick);

}

/*using as sepreate func
 function callBoth() {
    drawEyerything();
    moveEverything();
 } 
*/
function computerMovement () {

    var pade2YCenter = pade2Y + (PADDLE_HEIGHT/2);

   if (pade2YCenter < bally - 35 ) {
          pade2Y += 6;
   }  
    else if (pade2YCenter > bally + 35) {
        pade2Y -= 6;
    }

}


function moveEverything(){ 
    if (showWinScrn) {
        return;
    }  
    computerMovement();

          ballx +=  + ballSpeedx;
          bally +=  + ballSpeedy;

          if(ballx < 0) {

            if(bally > padelY &&
                bally < padelY+PADDLE_HEIGHT) {
                        ballSpeedx = -ballSpeedx;

                      var deltaY = bally -(padelY-PADDLE_HEIGHT/2);  
                           ballSpeedy = deltaY*0.35;
                }
          // ballSpeedx = -ballSpeedx;
              else{
                   plyr2score ++;    // must b brrfor ball reset
                  ballResset(); 
                 
            }
          }   

          if(ballx > canvas.width) {
            if(bally > pade2Y &&
                bally < pade2Y+PADDLE_HEIGHT) {
                        ballSpeedx = -ballSpeedx;

                        
                      var deltaY = bally -(pade2Y-PADDLE_HEIGHT/2);  
                      ballSpeedy = deltaY*0.25;
                }
          // ballSpeedx = -ballSpeedx;
         else{
            plyr1score ++;    // must b brrfor ball reset
            ballResset();  
                 
         } 
          }

          
      
          if(bally < 0) {

            ballSpeedy = -ballSpeedy;
           
          }   

          if(bally > canvas.height) {
                  ballSpeedy = -ballSpeedy;
          }

}

function drawNet () {
    for(var i=0; i < canvas.height; i+= 40) {
        colorRect(canvas.width/2-1,i,2,20,'white');
    }
}

function drawEyerything() {
  
    //next line blanks out the screen with black
    //colorRect(0,0,canvas.width,canvas.height,col
        colorRect(0,0,canvas.width,canvas.height,'black');

        if (showWinScrn) {

            canvasContext.fillStyle = 'white';

            if (plyr1score >= WINNING_SCORE ) {
                       canvasContext.fillText("Left player won!",350,200);
                       
            }
            
          else if ( plyr2score >= WINNING_SCORE){
            canvasContext.fillText("AI won!",350,200);

          }
            canvasContext.fillStyle = 'white';
            canvasContext.fillText("Click to Continue", 350,300);
            return;
        }

        drawNet();

//left player paddle
   colorRect(0,padelY,PADDLE_THICCNESS,PADDLE_HEIGHT,'red');
   //colorRect(0,100,45,25,'red');

   //right computer paddle
   colorRect(canvas.width-PADDLE_THICCNESS,pade2Y,
             PADDLE_THICCNESS,PADDLE_HEIGHT,'red');
   //colorRect(0,100,45,25,'red');

//this line draws the ball
    /* top,bottom,widh,height*/

//ball before makin it circle   colorRect(ballx,100,10,10,'white');
 
    //drawing the ball circle
       colorOfcircle(ballx,bally,10,"white");

       canvasContext.fillText(plyr1score,100,100);
       canvasContext.fillText(plyr2score,canvas.width - 100,100);


}

function colorOfcircle(centerX,centerY,radius,drawColor) {

    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX,centerY,radius,0,Math.PI*2,true);
    canvasContext.fill(); 
}


function colorRect(leftX,topY,width,height,drawColor) {
            
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX,topY,width,height);
}


function ballResset() {

    if (plyr1score >= WINNING_SCORE || 
        plyr2score >= WINNING_SCORE) {

        showWinScrn = true;

        if (plyr1score >= WINNING_SCORE ){
         
          location.href ="/video.mp4";
            
    // let value = prompt("YOU Have WON");
        }

        if (plyr2score >= WINNING_SCORE) {
          alert("YOu LOSt ASSHOLE");
        }
    }

    ballSpeedx = -ballSpeedx;

    ballx = canvas.width/2;
    bally = canvas.height/2;
   
}




//pause the muisc 

video.addEventListener('paly',function() {
    backGroundMusic.pause();
});


// resume

video.addEventListener('ended',function() {
    backGroundMusic.play();
});

// window.addEventListener('beforeunload',function() {
//     video.pause();
// });


