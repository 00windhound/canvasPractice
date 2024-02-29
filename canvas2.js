const canvas = document.getElementById('mycanvas2');
var ctx = canvas.getContext('2d');
var canvasrect = canvas.getBoundingClientRect();
const allcircles = [];
// x and y should be directly connected to the canvas

const mouse ={
    x: undefined ,
    y: undefined,
}

canvas.addEventListener('click',function(event){
    mouse.x = event.clientX - canvasrect.left + window.scrollX;
    mouse.y = event.clientY - canvasrect.top + window.scrollY;
    let mousecircle = new circle();
    mousecircle.x = mouse.x;
    mousecircle.y = mouse.y;
    //console.log(mouse)
    //console.log(allcircles)
    allcircles.push(mousecircle);
})
// if i scroll then reload it forgets that i scrolled and spawns way below the click
// now its spawning on either side of my mouse

// what if the player circle fallowed the mouse 
let hue;
class circle{
    constructor(){
        this.x = Math.random()*1500;
        this.y = Math.random()*1500;
        //this.x = Math.random()*canvas.Width 
        //this.y = Math.random()*canvas.height 
        this.size = Math.random()*50+1;
        this.speedx = Math.random()*3-1.5
        this.speedy = Math.random()*3-1.5
        this.hue = 1;
        this.color = 'hsl('+this.hue +', 90%, 40%)';
        this.age = 0;
    }
    update(){
        this.x += this.speedx;  
        this.y += this.speedy;
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0, Math.PI*2);
        ctx.fill();
    }
}

function wallcolision(){
    for(let k=0; k< allcircles.length; k++){

        if((allcircles[k].x - allcircles[k].size) < 0){
            allcircles[k].speedx = allcircles[k].speedx * -1;
            allcircles[k].x = 0 + allcircles[k].size;
        }
        else if((allcircles[k].x + allcircles[k].size)> 1500){
            allcircles[k].speedx = allcircles[k].speedx * -1;
            allcircles[k].x = 1500 - allcircles[k].size;
        }
        else if((allcircles[k].y - allcircles[k].size) < 0){
            allcircles[k].speedy = allcircles[k].speedy * -1;
            allcircles[k].y = 0 + allcircles[k].size;
        }
        else if((allcircles[k].y + allcircles[k].size) > 1500){
            allcircles[k].speedy = allcircles[k].speedy * -1;
            allcircles[k].y = 1500 - allcircles[k].size;
        }
    }
}
let j
function explode(){
    for(let j=0; j<allcircles.length; j++){
        allcircles[j].size += 0.02;//0.002
        if(allcircles[j].size > 50){
            allcircles[j].size = 10;
            // raise the parent size to retain overall sizes and more crowded circles
            for(a=0; a<4; a++){
                babies(j);
            }

            /*let baby1 = new circle();
            baby1.x = allcircles[j].x;
            baby1.y = allcircles[j].y;
            baby1.size = 1;
            baby1.hue = allcircles[j].hue + 10;
            baby1.color = 'hsl('+baby1.hue+' , 90%, 40%)';

            let baby2 =new circle();
            baby2.x = allcircles[j].x;
            baby2.y = allcircles[j].y;
            baby2.size = 2;
            baby2.hue = allcircles[j].hue + 10; 
            baby2.color = 'hsl('+baby2.hue+' , 90%, 40%)';

            let baby3 =new circle();
            baby3.x = allcircles[j].x;
            baby3.y = allcircles[j].y;
            baby3.size = 3;
            baby3.hue = allcircles[j].hue + 10; 
            baby3.color = 'hsl('+baby3.hue+' , 90%, 40%)';

            let baby4 =new circle();
            baby4.x = allcircles[j].x;
            baby4.y = allcircles[j].y;
            baby4.size = 1;
            baby4.hue = allcircles[j].hue + 10; 
            baby4.color = 'hsl('+baby4.hue+' , 90%, 40%)';
            
            allcircles.push(baby1, baby2, baby3, baby4);*/
        }  
    }
}
// make a new function that makes the babies for me
// it should make them with less code and less repetitive 
// and easy to make more or less babies
function babies (j){
    let baby1 = new circle();
    baby1.x = allcircles[j].x;
    baby1.y = allcircles[j].y;
    baby1.size = 1;
    baby1.hue = allcircles[j].hue + 10;
    baby1.color = 'hsl('+baby1.hue+' , 90%, 40%)';

    allcircles.push(baby1)
}

function circlecolision (){
    for(j=0; j < allcircles.length -1; j++){
        for(k=0; k < allcircles.length; k++){
            if(j === k){}
            else if(allcircles[j].age > 100 && allcircles[k].age > 20){ // stops here
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
    }
}
//make the color have more impact like they wont eat their own color, have to eat other colors to reproduce?
 
function tinybrain (){
    for(j=0; j< allcircles.length; j++){
        for(i=0; i< allcircles.length; i++){
            if(j === i){}
            else{
                let dx = allcircles[j].x - allcircles[i].x;
                let dy = allcircles[j].y - allcircles[i].y;
                let distance = Math.sqrt(dx* dx + dy* dy);
                if(distance < allcircles[j].size* 5){
                    //allcircles[j].color = 'white';
                    if(allcircles[j].size > allcircles[i].size){
                        //figure out what direction it is
                        //go after it without changing speed
                    }
                }
            }
            // measure distance and any circles that are close enough to be in view they react to,
            // view grows as the circle grows
            //if its within view then check if its bigger or smaller and then move towards or away.
            // maybe have a new animal or shape that will do this
        }
    }
}

function aging(){
    for(l= 0; l< allcircles.length; l++){
       // console.log(allcircles)
        allcircles[l].age = allcircles[l].age+ 1;
    }
} 

function handleparticles (){ 
    for( j =0; j< allcircles.length; j++){
        allcircles[j].update(); //throwing an error, not a function
        allcircles[j].draw();
      //  allcircles[j].explode();
        // call explode from here and pass the index
    }
    wallcolision();
    circlecolision();
    explode();
    aging();
    tinybrain();
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

    red1.hue = 0; 
    red1.color = 'hsl('+red1.hue+' , 90%, 40%)';
    red2.hue = 0; 
    red2.color = 'hsl('+red2.hue+' , 90%, 40%)';
    yellow1.hue = 60; 
    yellow1.color = 'hsl('+yellow1.hue+' , 90%, 40%)';
    yellow2.hue = 60; 
    yellow2.color = 'hsl('+yellow2.hue+' , 90%, 40%)';
    blue1.hue = 240; 
    blue1.color = 'hsl('+blue1.hue+' , 90%, 40%)';
    blue2.hue = 240; 
    blue2.color = 'hsl('+blue2.hue+' , 90%, 40%)';

    allcircles.push(red1, red2, yellow1, yellow2, blue1, blue2);
    console.log(allcircles);
}
init()

function animate(){
    ctx.clearRect(0,0, canvas.clientWidth, canvas.height);
    handleparticles();
    requestAnimationFrame(animate);
}
animate()
