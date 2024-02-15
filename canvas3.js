const canvas = document.getElementById('mycanvas3');
const ctx = canvas.getContext('2d');
const canvaswidth = canvas.width = 1000;
const canvasheight = canvas.wiidth = 650;

const playerimg = new Image();
playerimg.src = 'pics/tutorialdog.png';
const spritewidth = 575;
const spriteheight = 523;
let framex = 0;
let framey = 0;
let gameframe = 0;
const staggarframe =5;
const spriteanimation = [];
const animationstates = [
    {
        name: 'idle',
        frames: 7,
    }
    {
        name: 'jump',
        frames: 7,
    }
]
animationstates.forEach(() => {})
function animate(){
    ctx.clearRect(0,0, canvaswidth, canvasheight);
    //ctx.fillRect(50, 50, 70, 80);
    //ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh)
    ctx.drawImage(playerimg,framex* spritewidth,framey* spriteheight,spritewidth, spriteheight,
        0, 0, spritewidth, spriteheight );
    
    if(gameframe % staggarframe == 0){
        if (framex <6) framex++;
        else (framex = 0);
    }

    gameframe++;




    requestAnimationFrame(animate);
}
animate();
