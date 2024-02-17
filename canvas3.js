const canvas = document.getElementById('mycanvas3');
const ctx = canvas.getContext('2d');
const canvaswidth = canvas.width = 1000;
const canvasheight = canvas.wiidth = 650;

const playerimg = new Image();
playerimg.src = 'pics/tutorialdog.png';
const spritewidth = 575; //how many px is each frame
const spriteheight = 523;
let framex = 0; //which frame
let framey = 0;
let gameframe = 0;
const staggarframe =5; // how quickly it loops
const spriteanimation = [];
const animationstates = [
    {
        name: 'idle',
        frames: 7,
    },
    {
        name: 'jump',
        frames: 7,
    },
]
animationstates.forEach((state,index) => {
    let frames = {
        loc: [],
    }
    for(let j =0; j<state.frames; j++){
        let positionx = j* spritewidth;
        let positiony = j* spriteheight;
        
    }
})
function animate(){
    ctx.clearRect(0,0, canvaswidth, canvasheight);
    //ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh)
    ctx.drawImage(playerimg,framex* spritewidth,framey* spriteheight,spritewidth, spriteheight,
        0, 0, spritewidth, spriteheight );
    //let position = Math.floorloor(gameframe/staggarframe)%6; //does the below in one line
    if(gameframe % staggarframe == 0){
        if (framex <6) framex++;
        else (framex = 0);
    }

    gameframe++;

    requestAnimationFrame(animate);
}
animate();
