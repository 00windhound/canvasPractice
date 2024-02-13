const canvas2 = document.getElementById('mycanvas2');
ctx2 = canvas2.getContext('2d');
var canvasrect = canvas.getBoundingClientRect();


var x = 0;
var y = 0;
x=x-canvasrect.left;
y=y-canvasrect.top;

ctx2.fillStyle = 'white';
ctx2.beginPath();
ctx2.arc(x,y,20,0, Math.PI*2);
ctx2.fill();
