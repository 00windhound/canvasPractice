console.log("hi");

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
var canrect = canvas.getBoundingClientRect();
const allparticles=[];
let hue = 0;

const mouse={
    x: undefined,
    y: undefined,
}

canvas.addEventListener('click', function(event){
    mouse.x= event.clientX - canrect.left;
    mouse.y= event.clientY - canrect.top;
    console.log("x=",mouse.x,"y=",mouse.y)
    for(let y=0; y<10;y++){
    allparticles.push(new particle())
    }
   // drawcircle(); //this one works when you click
})   

canvas.addEventListener('mousemove',function(event){
    mouse.x = event.clientX - canrect.left; 
    mouse.y = event.clientY - canrect.top;
    for(let y=0; y<5;y++){
        allparticles.push(new particle())
    }
    //drawcircle()  // they work!!!
})



/*function drawcircle(){
    ctx.fillStyle ='white';
    ctx.strokeStyle ='red';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(mouse.x,mouse.y,5,0, Math.PI*2 );
    ctx.fill();
    ctx.stroke();
    console.log(ctx)
}*/

class particle{
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
       // this.x = Math.random()*canvas.width;
       // this.y = Math.random()*canvas.height;
        this.size = Math.random()*10+1;
        this.speedx = Math.random()*3-1.5;
        this.speedy = Math.random()*3-1.5;
    }
    update(){
        this.x += this.speedx;
        this.y += this.speedy;
        if(this.size>0.2){
            this.size-=0.1;
        }
    }
    draw(){
        ctx.fillStyle = 'white'
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
        ctx.fill();
    }
}

/*function init(){
    for(let i=0; i<100; i++){
        allparticles.push(new particle())
    }
}

init();*/

console.log(allparticles);

function handleparticles(){
    for(let j=0; j<allparticles.length; j++){
        allparticles[j].update();
        allparticles[j].draw();
        if(allparticles[j].size<= 0.3){
            allparticles.splice(j,1);
            j--;
            //console.log(allparticles)
        }
    }
}

function animate(){
   // ctx.clearRect(0,0,canvas.width, canvas.height);
   ctx.fillStyle = 'rgba(0,0,0,0.01';
   ctx.fillRect(0,0,canvas.clientWidth,canvas.height);
    handleparticles();
    requestAnimationFrame(animate);
}
animate();
