const canvas = document.getElementById('mycanvas2');
var ctx = canvas.getContext('2d');
var canvasrect = canvas.getBoundingClientRect();
let allcircles = [];
var savedcircles = JSON.parse(localStorage.getItem("savedcircles")) || []
let box1 = document.getElementById('box1');
let box2 = document.getElementById('box2');
let box3 = document.getElementById('box3');
let box4 = document.getElementById('box4');
let group;
let j;
let k;
// populate with saved circles on load 
// constantly save circles



const mouse ={
    x: undefined,
    y: undefined,
}
const e ={
    x:undefined,
    y:undefined
}

canvas.addEventListener('mousemove', function(event){
    mouse.x = event.clientX - canvasrect.left + window.scrollX;
    mouse.y = event.clientY - canvasrect.top + window.scrollY;
    player1.x = mouse.x;
    player1.y = mouse.y;
    e.x = event.clientX;
    e.y = event.clientY;
} )


// if i scroll then reload it forgets that i scrolled and spawns way below the click 

class player{
    constructor(){
       this.x = 10;
       this.y = 10;
       this.size = 10;
       this.color = 'white';
    }
    drawplayer(){
        ctx.moveTo(this.x, this.y)
        ctx.fillstyle = this.color;
        //ctx.beginPath();
        ctx.arc(this.x, this.y, this.size,0,Math.PI*2);
        ctx.fill();
        ctx.stroke();
    }
    playerwalls(){
        if((this.x - this.size )< 0){
            this.x = 0 + this.size; 
        }
        else if((this.x + this.size) > 1500){
            this.x = 1500 - this.size;
        }
        else if((this.y - this.size) < 0){
            this.y = 0 + this.size;
        }
        else if((this.y + this.size)> 1500){
            this.y = 1500 - this.size;
        }
    }
    playercolision(){
        let dx = player1.x - allcircles[j].x;
        let dy= player1.y - allcircles[j].y;
        let distance = Math.sqrt(dx* dx + dy* dy);
        let radii = player1.size + allcircles[j].size

        if(allcircles[j].age > 20){
            if(distance > radii){}
            else if(distance < radii || distance === radii){
                if(player1.size < allcircles[j].size){
                if(player1.size > 3){ 
                        player1.size = player1.size - 3;
                        allcircles[j].size = allcircles[j].size +1;
                    }
                    else{
                        player1.size = 3;
                    }
                }
                else{
                    player1.size = player1.size + 1;
                    allcircles[j].size = allcircles[j].size - 3;
                    if(allcircles[j].size < 1){
                        allcircles.splice(j,1);
                    }
                }
            }
        }
    }
    // player doesnt grow automatically
    // fix the colors so i can start keeping track of them better
    playersplosion(){
        if(this.size > 60){
            this.size = 10
            for(let x=0; x<5; x++){
                playerbabies();
            }
        }
    }
}

function playerbabies (){
    let baby1 = new circle();
    baby1.x = player1.x;
    baby1.y = player1.y;
    baby1.size = Math.random()*3
    baby1.group = 4;
    baby1.color = 'white';

    allcircles.push(baby1)
}
// fix the player color
// make counter clickable so you can bring back colors
// parents stay big babies spawn at the edge to stay alive


let player1 = new player(); // changing based on other circles

class circle{
    constructor(){
        this.x = Math.random()*1500;
        this.y = Math.random()*1500;
        this.size = Math.random()*60+1;
        this.speedx = Math.random()*3-1.5
        this.speedy = Math.random()*3-1.5
        this.group = this.group;
        this.color = this.color;
        this.age = 0;
    }
    update(){
        this.x += this.speedx;  
        this.y += this.speedy;
        this.age += 1;
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0, Math.PI*2);
        ctx.fill();
    }
}

function scrolling (){
    if(e.y < 150){
     window.scrollBy(0,-3)
    }
    else if(e.y > 550){
     window.scrollBy(0, 3)
    }
     // the scroll should happen as long as the mouse is in range
     // no just on move
}


function wallcolision(){
    if((allcircles[j].x - allcircles[j].size) < 0){
        allcircles[j].speedx = allcircles[j].speedx * -1;
        allcircles[j].x = 0 + allcircles[j].size;
    }
    else if((allcircles[j].x + allcircles[j].size)> 1500){
        allcircles[j].speedx = allcircles[j].speedx * -1;
        allcircles[j].x = 1500 - allcircles[j].size;
    }
    else if((allcircles[j].y - allcircles[j].size) < 0){
        allcircles[j].speedy = allcircles[j].speedy * -1;
        allcircles[j].y = 0 + allcircles[j].size;
    }
    else if((allcircles[j].y + allcircles[j].size) > 1500){
        allcircles[j].speedy = allcircles[j].speedy * -1;
        allcircles[j].y = 1500 - allcircles[j].size;
    }
}

function explode(){
    allcircles[j].size += 0.02;//0.002
    if(allcircles[j].size > 60){
        allcircles[j].size = 15;
        for(a=0; a<6; a++){
            babies(allcircles[j].x, allcircles[j].y, allcircles[j].group, allcircles[j].color);
        }
    }
}
// if group 2 yellow then pop when still small
// when red or blue pop they stay big and babies spawn at edge of circle

function babies (x,y,group,color){
    let baby1 = new circle();
    baby1.x = x//allcircles[j].x;
    baby1.y = y // allcircles[j].y;
    baby1.size = Math.random()*2
    baby1.group = group //allcircles[j].group;
    baby1.color = color //allcircles[j].color;

    allcircles.push(baby1)
}

function circlecolision (){
    if(j === k){}
    else if(allcircles[j].age > 20 && allcircles[k].age > 20){ // stops here
        let dx = allcircles[j].x - allcircles[k].x;
        let dy = allcircles[j].y - allcircles[k].y;
        let distance = Math.sqrt(dx* dx + dy* dy);
        let radii = allcircles[j].size + allcircles[k].size;

        if(distance > radii){} // not touhcing
        else if(distance === radii || distance < radii){       
            if(allcircles[j].size < allcircles[k].size){
                if(allcircles[j].size > 3){
                    allcircles[j].size = allcircles[j].size - 3;
                    allcircles[k].size = allcircles[k].size + 1;
                }
                else{
                    allcircles.splice(j,1);
                }
            }
            else{
                if(allcircles[k].size > 3){
                    allcircles[k].size = allcircles[k].size - 3;
                    allcircles[j].size = allcircles[j].size + 1; 
                }
                else{
                    allcircles.splice(k,1);
                }
            }
        }
    }
}
//yellow will gradually slow down and stop. pop when it stops
//red has to eat to grow 
//blue
//white only gets killed by player but shrinks down by other circles


//group 2 will stop if not ontop of another circle but travels as babies
//make the color have more impact like they wont eat their own color, 
//have to eat other colors to reproduce?
 
function tinybrain (){
    if(j === allcircles.length){j = j-1}
    if(k === allcircles.length){k = k-1}
    if(j === k){}
    else{
        let dx = allcircles[j].x - allcircles[k].x;
        let dy = allcircles[j].y - allcircles[k].y;
        let distance = Math.sqrt(dx* dx + dy* dy);
        if(distance < allcircles[j].size* 5){
            //allcircles[j].color = 'white';
            if(allcircles[j].size > allcircles[k].size){
                //figure out what direction it is
                //go after it without changing speed
            }
        }
    }
    // spawn babies at edge so the buttons work when player is big
    // measure distance and any circles that are close enough to be in view they react to,
    // view grows as the circle grows
    //if its within view then check if its bigger or smaller and then move towards or away.
    // maybe have a new animal or shape that will do this
}

let red= 0;
let yellow= 0;
let blue= 0;
let white= 0;

function counter(){
    if(j === 0){
        red = 0;
        yellow = 0;
        blue = 0;
        white = 0;
    }
    if(allcircles[j].group === 1){
        red = red += 1;
    }
    else if(allcircles[j].group === 2){
        yellow = yellow += 1;
    }
    else if(allcircles[j].group === 3){
        blue = blue += 1;
    }
    else if(allcircles[j].group === 4){
        white = white += 1;
    }
    box1.innerHTML = red;
    box2.innerHTML = yellow;
    box3.innerHTML = blue;
    box4.innerHTML = white;
}

function clickbabies(l){
    switch(l){
        case 1:
            babies(player1.x, player1.y, 1, 'red');
            break;
        case 2:
            babies(player1.x, player1.y, 2, 'yellow');
            break;
        case 3:
            babies(player1.x, player1.y, 3, 'blue');
            break;
        case 4:
            babies(player1.x, player1.y, 4, 'white');
            break;
    }
}

function itterate (){
    for(j=0; j< allcircles.length; j++){
        allcircles[j].update();
        allcircles[j].draw();
        wallcolision();
        explode();
        counter();
        player1.playercolision();
        player1.playersplosion();
        for(k=0; k< allcircles.length; k++){
            tinybrain();
            circlecolision();
        }
    }
    scrolling();
    localStorage.setItem("savedcircles",JSON.stringify(allcircles));
}

function init(){
   /* for(let i=0; i<1; i++){
        mouse.x = Math.random()*1500;
        mouse.y = Math.random()*canvas.height
        allcircles.push(new circle());
    }*/
    let red1 = new circle();
    let red2 = new circle();
    let yellow1 = new circle();
    let yellow2 = new circle();
    let blue1 = new circle();
    let blue2 = new circle();

    red1.group = 1; 
    red1.color = 'red';
    red2.group = 1; 
    red2.color = 'red';
    yellow1.group = 2; 
    yellow1.color = 'yellow';
    yellow2.group = 2; 
    yellow2.color = 'yellow';
    blue1.group = 3; 
    blue1.color = 'blue';
    blue2.group = 3; 
    blue2.color = 'blue';

    allcircles.push(red1, red2, yellow1, yellow2, blue1, blue2);
    console.log(allcircles);
}


function animate(){
    ctx.clearRect(0,0, canvas.clientWidth, canvas.height);
    itterate();
    player1.drawplayer();
    requestAnimationFrame(animate);
}
animate()

function reset(){
    allcircles = []
    localStorage.setItem("savedcircles",JSON.stringify(allcircles));
    init();
   // animate();
   // reset is working the problem is the reload its not saving as circles just as objects
}

for(let l=0; l< savedcircles.length; l++){
    var saved = new circle();
    saved.x = savedcircles[l].x
    saved.y = savedcircles[l].y
    saved.size = savedcircles[l].size
    saved.speedx = savedcircles[l].speedx
    saved.speedy = savedcircles[l].speedy
    saved.group = savedcircles[l].group
    saved.color = savedcircles[l].color
    saved.age = savedcircles[l].age
    allcircles.push(saved)
} 
// its producing extra circles on each load