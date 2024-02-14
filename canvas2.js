const canvas = document.getElementById('mycanvas2');
var ctx = canvas.getContext('2d');
var canvasrect = canvas.getBoundingClientRect();
const allcircles = [];

const mouse ={
    x: undefined,
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
        this.x += this.speedx;  // this.x is returning nan
        this.y += this.speedy;
        wallcolision();
       /* if(this.size>0.2){   // shrinks the circles down to dust
            this.size-=0.1;
        }*/
    }
    draw(){
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0, Math.PI*2);
        ctx.fill();
    }
}

function wallcolision(){
    for(let k=0; k<allcircles.length; k++){
        if(allcircles[k].x < 0 || allcircles[k].x > 1500){
            allcircles[k].speedx === -allcircles[k].speedx;
        }
        else return;
        if(allcircles[k].y < 0 || allcircles[k].y > 1500){
            allcircles[k].speedy = -allcircles[k].speedy;
        }
        else return;// circle is out of frame but x is 620
    }
}

function handleparticles (){
    for(let j =0; j< allcircles.length; j++){
        allcircles[j].update();
        allcircles[j].draw();
    }
}

function init(){
    for(let i=0; i<100; i++){
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