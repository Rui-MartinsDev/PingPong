const board= document.querySelector('canvas');
const ctx= board.getContext('2d');
const btn=document.querySelector('button')
const score=document.querySelector('#score')
const winer=document.querySelector('#whowon')


let Bwidth= board.width, Bheight =board.height;
let bgColor='gray';
let p1Color='red';
let p2Color='blue'
let pBorder='white'
let ballColor='green'
let ballBorder='black'
let ballRadius=15;
let paddleSpeed=0
let intervalId;
let ballspeed=1;
let ballx= Bwidth/2;
let bally= Bheight/2;
let ballXDirection=1;
let ballYDirection =0;
let p1score=0;
let p2score=0;
let pHeight=50, pWidth=15;
let runing= false;
let paddle1={
    width:pWidth,
    height:pHeight,
    x:0,
    y:Bheight/2 - pHeight/2
}
let paddle2={
    width:pWidth,
    height:pHeight,
    x:Bwidth-pWidth,
    y:Bheight/2 - (pHeight/2)
}
window.addEventListener('keydown',changeDirection)
btn.addEventListener('click',resetGame)

gamestart()
function gamestart(){
    runing=true;
    ballx=Bwidth/2;
    bally=Bheight/2;
    ballspeed=1;
    createball();
    clearTimeout(intervalId)
    nexttick();
}


function nexttick(){
    if(runing){
    intervalId= setTimeout(()=>{
        clearboard();
        drawpaddle();
        moveball();
        drawball();
        checkcolision();
        console.log(paddle1.y,bally)
        nexttick();
    },20)
    }
}

function clearboard(){
    ctx.fillStyle=bgColor;
    ctx.fillRect(0,0,Bwidth,Bheight)
}

function drawpaddle(){
    ctx.strokeStyle=pBorder;
    //first paddle
    ctx.fillStyle= p1Color
    ctx.fillRect(paddle1.x,paddle1.y,paddle1.width,paddle1.height)
    ctx.strokeRect(paddle1.x,paddle1.y,paddle1.width,paddle1.height)
    //second paddle
    ctx.fillStyle= p2Color
    ctx.fillRect(paddle2.x,paddle2.y,paddle2.width,paddle2.height)
    ctx.strokeRect(paddle2.x,paddle2.y,paddle2.width,paddle2.height)
    
}

function createball(){
    ballspeed=1;
    ((Math.random())>=0.5)? ballXDirection=1:ballXDirection=-1;
    ((Math.random())>=0.5)? ballYDirection=1:ballYDirection=-1;
    
}

function moveball(){
    ballx+= ballspeed*ballXDirection;
    bally+= ballspeed*ballYDirection;

}


function drawball(){
    ctx.beginPath();
    ctx.fillStyle =ballColor;
    ctx.strokeStyle=ballBorder;
    ctx.lineWidth=0.5;
    ctx.arc(ballx,bally,ballRadius,0,2*Math.PI);
    ctx.stroke();
    ctx.fill();
}

function checkcolision(){
    if(ballx<=pWidth+ballRadius && bally>=paddle1.y && bally<=paddle1.y+paddle1.height){ //enters left
        ballx= (paddle1.x +paddle1.width) +ballRadius;
        ballXDirection*=-1 
        ballspeed++       
    }if(bally<=ballRadius || bally>=Bheight-ballRadius){ //top/bot
        ballYDirection*=-1;
    }if (ballx>=(Bwidth-ballRadius-paddle2.width) && bally>=paddle2.y && bally<=paddle2.y+paddle2.height){
        ballx=paddle2.x-ballRadius;
        ballXDirection*=-1
        ballspeed++
    }if(ballx<=0){
        p2score++;
        winer.textContent=`Player ${p2Color.toUpperCase()} wins the round!`
        updatescore();
    }if (ballx>=Bwidth){
        p1score++;
        winer.textContent=`Player ${p1Color.toUpperCase()} wins the round!`
        updatescore();
    }
}

function changeDirection(e){
    const key= e.keyCode;
    switch(true){
        case(key==87 && paddle1.y>0): //W key
            paddle1.y-=15
            break;
        case(key==83 && paddle1.y<Bheight-pHeight): //S key
            paddle1.y+=15
            break;
        case(key==38 && paddle2.y>0): //up key
            paddle2.y-=15
            break;
        case(key==40 && paddle2.y<Bheight-pHeight): //down key
            paddle2.y+=15
            break;
    }
}

function updatescore(){
    runing=false;
    score.textContent=`${p1score}:${p2score}`
}

function resetGame(){
    
    setTimeout(()=>{
        gamestart();
    },500);
}