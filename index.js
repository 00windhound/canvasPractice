console.log("hi");

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
//const ctx2 = canvas.getContext("2d");

//ctx2.fillStyle = 'white';
//ctx2.fillRect(10,10, 50, 70);


ctx.fillStyle= 'red';
ctx.strokeStyle = 'white';
ctx.lineWidth = 15;
ctx.beginPath();
ctx.arc(300, 300, 50, 0, Math.pi*2, true);
ctx.fill();
ctx.stroke();
console.log(ctx);