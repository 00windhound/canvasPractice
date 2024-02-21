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
// if i scroll then reload it forgets that i scrolled
// now its spawning on either side of my mouse 
let hue;
class circle{
    constructor(){
        this.x = Math.random()*1500;
        this.y = Math.random()*1500;
        //this.x = Math.random()*canvas.Width 
        //this.y = Math.random()*canvas.height 
        this.size = Math.random()*30+1;
        this.speedx = Math.random()*3-1.5
        this.speedy = Math.random()*3-1.5
        this.hue = 1;
        this.color = 'hsl('+this.hue +', 90%, 40%)';
        this.age = 0;
    }
    update(){
        this.x += this.speedx;  
        this.y += this.speedy;
      //  wallcolision();
       // explode(); // said this is not a function
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0, Math.PI*2);
        ctx.fill();
    }
}
// maybe they constantly grow and when they hit a certan size they explode into babies
// they also shrink or eat smaller circles when they touch
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
        // i want to adjust it so the edge of the circle bounces not the middle
        // also at some point the circles are spawning way below the click
    }
}
let j
function explode(){
    for(let j=0; j<allcircles.length; j++){
        allcircles[j].size += 0.02;//0.002
        if(allcircles[j].size > 50){
            allcircles[j].size = 4;

            let baby1 = new circle();
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
            
            allcircles.push(baby1, baby2, baby3, baby4);
        }  
    }
}

function circlecolision (){
    for(j=0; j < allcircles.length -1; j++){
        for(k=0; k < allcircles.length; k++){
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
    }
}

function aging(){
    for(l= 0; l< allcircles.length; l++){
       // console.log(allcircles)
        allcircles[l].age = allcircles[l].age+ 1;
    }
}
// first i need to fix their collision so its not just from the center
// ill make them kill eachother off if they collide. if they collide then figure out which is smaller and delete it. 

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
