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
    console.log(mouse)
    console.log(allcircles)
    allcircles.push(new circle());
})
// if i scroll then reload it forgets that i scrolled
// now its spawning on either side of my mouse 

class circle{
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        //this.x = Math.random()*canvas.Width 
        //this.y = Math.random()*canvas.height 
        this.size = Math.random()*30+1;
        this.speedx = Math.random()*3-1.5
        this.speedy = Math.random()*3-1.5
        this.color = 'white';
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

        if(allcircles[k].x < 0){
            allcircles[k].x = 0;
            allcircles[k].speedx = allcircles[k].speedx * -1;
            
        }
        else if(allcircles[k].x > 1500){
            allcircles[k].x = 1500
            allcircles[k].speedx = allcircles[k].speedx * -1;
            
        }
        else if(allcircles[k].y < 0){
            allcircles[k].y = 0;
            allcircles[k].speedy = allcircles[k].speedy * -1;
           
        }
        else if(allcircles[k].y > 1500){
            allcircles[k].y = 1500
            allcircles[k].speedy = allcircles[k].speedy * -1;
            
        }
        // i want to adjust it so the edge of the circle bounces not the middle
        // also at some point the circles are spawning way below the click
    }
}
let j
function explode(){ // l is undefined maybe declair it globally?
    for(let j=0; j<allcircles.length; j++){
        allcircles[j].size += 0.02;//0.002
        if(allcircles[j].size > 50){
            allcircles[j].size = 4;
            allcircles[j].color = 'hsl( 0, 0%, 80%)'

            let baby1 = new circle();
            baby1.x = allcircles[j].x;
            baby1.y = allcircles[j].y;
            baby1.size = 1;
            baby1.color = 'hsl( 0, 0%, 100%)';

            let baby2 =new circle();
            baby2.x = allcircles[j].x;
            baby2.y = allcircles[j].y;
            baby2.size = 2;
            baby2.color = 'hsl( 0, 0%, 100%)';

            let baby3 =new circle();
            baby3.x = allcircles[j].x;
            baby3.y = allcircles[j].y;
            baby3.size = 3;
            baby3.color = 'hsl( 0, 0%, 100%)';
            allcircles.push(baby1, baby2, baby3);
        }  
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
    explode();
}

function init(){
    for(let i=0; i<1; i++){
        mouse.x = Math.random()*1500;
        mouse.y = Math.random()*canvas.height
        allcircles.push(new circle());
    }
}
init()

function animate(){
    ctx.clearRect(0,0, canvas.clientWidth, canvas.height);
    handleparticles();
    requestAnimationFrame(animate);
}
animate()
