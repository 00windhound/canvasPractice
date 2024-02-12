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
    for(let y=0; y<5;y++){
    allparticles.push(new particle())
    }
   // drawcircle(); //this one works when you click
})   

canvas.addEventListener('mousemove',function(event){
    mouse.x = event.clientX - canrect.left; 
    mouse.y = event.clientY - canrect.top;
    for(let y=0; y<1;y++){
        allparticles.push(new particle())
    }
    //drawcircle()  // they work!!!
})

/*function nomouse(){
    if(allparticles.length < 8){
        mouse.x =Math.random()*canvas.width
        mouse.y =Math.random()*canvas.height;
        allparticles.push(new particle());
        handleparticles();
    }
}*/
function nomouse(){
    
        setTimeout(()=>{
            mouse.x =Math.random()*canvas.width;
            mouse.y = Math.random()*canvas.height;
            allparticles.push(new particle());
            handleparticles();
            nomouse();
        },100)
    
}
nomouse();



class particle{
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
       //this.x = Math.random()*canvas.width;
       // this.y = Math.random()*canvas.height;
        this.size = Math.random()*10+1;
        this.speedx = Math.random()*3-1.5;
        this.speedy = Math.random()*3-1.5;
        this.color = 'hsl('+hue+',100%, 50%';
    }
    update(){
        this.x += this.speedx;
        this.y += this.speedy;
        if(this.size>0.2){
            this.size-=0.1;
        }
    }
    draw(){
        ctx.fillStyle = this.color;
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
       
        for(let k = j; k< allparticles.length; k++){
            const dx = allparticles[j].x - allparticles[k].x;
            const dy = allparticles[j].y - allparticles[k].y;
            const distance = Math.sqrt(dx * dx * dy * dy);
            if (distance<150000){
                ctx.beginPath();
                ctx.strokeStyle = allparticles[j].color;
                ctx.lineWidth = allparticles[j].size/5;
                ctx.moveTo(allparticles[j].x, allparticles[j].y);
                ctx.lineTo(allparticles[k].x, allparticles[k].y);
                ctx.stroke();
            }
        }
        if(allparticles[j].size<= 0.3){
            allparticles.splice(j,1);
            j--;
           // nomouse();
            //console.log(allparticles)
        }
    }
}

function animate(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
  // ctx.fillStyle = 'rgba(0,0,0,0.01';
  // ctx.fillRect(0,0,canvas.clientWidth,canvas.height);
    handleparticles();
    hue+=2;
    requestAnimationFrame(animate);
}
animate();