console.log("hi");

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const ctx2 = canvas.getContext("2d");

ctx2.fillStyle = 'white';
// ctx2.strokeStyle = 'red';
// ctx2.lineWidth = '8';
ctx2.fillRect(10,10, 7, 7);
// ctx2.stroke();  did nothing


ctx.fillStyle= 'red';
ctx.strokeStyle = 'red';
ctx.lineWidth = 15;
ctx.beginPath();
ctx.arc(300, 300, 50, 0, Math.pi*2, true);
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
    ctx.arc(mouse.x,mouse.y,5,0, Math.PI*2);
    ctx.fill();
}
drawcircle();

canvas.addEventListener('click', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    console.log(event);
    drawcircle();
})

