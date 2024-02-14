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


class circle{
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        //this.x = Math.random()*canvas.Width //goimg from undefined to nan
        //this.y = Math.random()*canvas.height  //canvas width is undefined
        this.size = Math.random()*5+1;
        this.speedx = Math.random()*3-1.5
        this.speedy = Math.random()*3-1.5
       // this.color = 
    }
    update(){
        this.x += this.speedx;  
        this.y += this.speedy;
        wallcolision();
       /* if(this.size>0.2){   // shrinks the circles down to dust
            this.size-=0.1;
        }*/
        console.log(allcircles)
    }
    draw(){
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x,this.y,10,0, Math.PI*2);
        ctx.fill();
    }
}

function wallcolision(){
    for(let k=0; k< allcircles.length; k++){
        console.log(k)
        if(allcircles[k].x < 0){
            allcircles[k].x = 0.0001;
            allcircles[k].speedx = allcircles[k].speedx * -1;
            
        }
        else if(allcircles[k].x > 1500){
            allcircles[k].x = 1500
            allcircles[k].speedx = allcircles[k].speedx * -1;
            
        }
        else if(allcircles[k].y < 0){
            allcircles[k].y = 0.0001;
            allcircles[k].speedy = allcircles[k].speedy * -1;
           
        }
        else if(allcircles[k].y > 1500){
            allcircles[k].y = 1500
            allcircles[k].speedy = allcircles[k].speedy * -1;
            
        }
        // speed value is changing but not from negative to positive
        //



        //if(allcircles[k].x < 0 || allcircles[k].x > 1500){
         //   allcircles[k].speedx = allcircles[k].speedx * -1 /*this is working 
          //  but it switches back and forth before circle gets back in range */
           // allcircles[k].splice(k,1)
           // k--
       // }
        //else if(allcircles[k].y < 0 || allcircles[k].y > 1500){
        //    allcircles[k].speedy = allcircles[k].speedy * -1
         // allcircles[k].splice(k,1)
         // k--
       // }
       // else return;// circle is out of frame but x is 620
    }  // it works but only for the first circle tho, the for loop is not cycling
    // it works only if there is 1 circle otherwhise it breaks.
    // also at some point the circles are spawning way below the click
}

function handleparticles (){
    for(let j =0; j< allcircles.length; j++){
        allcircles[j].update();
        allcircles[j].draw();
    }
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