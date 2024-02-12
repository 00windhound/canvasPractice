console.log("hi");

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
var canrect = canvas.getBoundingClientRect();
const allparticles=[];

const mouse={
    x: undefined,
    y: undefined,
}

canvas.addEventListener('click', function(event){
    mouse.x= event.clientX - canrect.left;
    mouse.y= event.clientY - canrect.top;
    console.log("x=",mouse.x,"y=",mouse.y)
   // drawcircle(); //this one works when you click
})   

canvas.addEventListener('mousemove',function(event){
    mouse.x = event.clientX - canrect.left; 
    mouse.y = event.clientY - canrect.top;
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
        /*this.x = mouse.x;
        this.y = mouse.y;*/
        this.x = Math.random()*canvas.width;
        this.y = Math.random()*canvas.height;
        this.size = Math.random()*30+1;
        this.speedx = Math.random()*3-1.5;
        this.speedy = Math.random()*3-1.5;
    }
    update(){
        this.x += this.speedx;
        this.y += this.speedy;
    }
    draw(){
        ctx.fillStyle = 'white'
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
        ctx.fill();
    }
}

function init(){
    for(let i=0; i<100; i++){
        allparticles.push(new particle())
    }
}
init();
console.log(allparticles);

function handleparticles(){
    for(let j=0; j<allparticles.length; j++){
        allparticles[j].update();
        allparticles[j].draw();
    }
}

function animate(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    handleparticles();
    requestAnimationFrame(animate);
}
animate();

/*const ctx2 = canvas.getContext("2d");

ctx2.fillStyle = 'white';
// ctx2.strokeStyle = 'red';
// ctx2.lineWidth = '8';
ctx2.fillRect(10,10, 7, 7);
// ctx2.stroke();  did nothing


ctx.fillStyle= 'red';
ctx.strokeStyle = 'red';
ctx.lineWidth = 15;
ctx.beginPath();
ctx.arc(430, 240, 50, 0, Math.PI*2, true);
ctx.fill();
ctx.stroke();
console.log(ctx);
console.log(ctx2);

const mouse ={
    x: null,
    y: null,
}

function drawcircle(){
    ctx.fillStyle= 'red';
    ctx.beginPath();
    ctx.arc(300,359,5,0, Math.PI*2);
    ctx.fill();
}
drawcircle();

canvas.addEventListener('click', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    console.log(event);
    drawcircle();
})*/

