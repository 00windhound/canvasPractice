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
// maybe if i scroll then reload it forgets that i scrolled

class circle{
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        //this.x = Math.random()*canvas.Width 
        //this.y = Math.random()*canvas.height 
        this.size = Math.random()*30+1;
        this.speedx = Math.random()*3-1.5
        this.speedy = Math.random()*3-1.5
       // this.color = 
    }
    update(){
        this.x += this.speedx;  
        this.y += this.speedy;
        wallcolision();
        explode(); // said this is not a function
    }
    draw(){
        ctx.fillStyle = 'white';
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

function explode (){
    for(let l=0; l<allcircles.length; l++){
        allcircles[l].size += 0.002;
        if(allcircles[l].size > 50){
            allcircles[l].size = 10;

          /*  let baby1 = {
                x: allcircles[l],
                y: allcircles[l],
                size:1,
                speedx: Math.random()*3-1.5,
                speedy: Math.random()*3-1.5
            };
            let baby2 = {
                x: allcircles[l],
                y: allcircles[l],
                size:1,
                speedx: Math.random()*3-1.5,
                speedy: Math.random()*3-1.5
            };

            allcircles.push(baby1, baby2)*/
           /* for(let i=1; i<2; i++){
                let circle1={
                    x: allcircles[l],
                    y: allcircles[l],
                    size: 1,
                    speedx: Math.random()*3-1.5,
                    speedy: Math.random()*3-1.5
                   // color: 
                }; // idk how to do this. i need to make more small circles here
               // allcircles.push(circle1);
            }*/
        }  
    }
}
// first i need to fix their collision so its not just from the center
// ill make them kill eachother off if they collide. if they collide then figure out which is smaller and delete it. 

function handleparticles (){ 
    for(let j =0; j< allcircles.length; j++){
        allcircles[j].update(); //throwing an error, not a function
        allcircles[j].draw();
        // call explode from here and pass the index
    }
}

function init(){
    for(let i=0; i<15; i++){
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
