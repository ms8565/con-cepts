let canvas;
let ctx;
let socket; 
let hash;

let players = [];
let answers = [];
let question = "Question text";
let ansNum = 0;

//handler for mouse clicks
const clickHandler = (e) => {
    console.log("x: " + e.x + ", y: " + e.y);
    var choice;
    if(e.x >= 563 && e.y >= 271 && e.x <= 843 && e.y <= 370){
            console.log("answer 0");
            choice = 0;
       }
    else if(e.x >= 563 && e.y >= 440 && e.x <= 843 && e.y <= 540){
            console.log("answer 1");
            choice = 1;
       }
    else if(e.x >= 1093 && e.y >= 271 && e.x <= 1373 && e.y <= 370){
            console.log("answer 2");
            choice = 2;
       }
    else if(e.x >= 1093 && e.y >= 440 && e.x <= 1373 && e.y <= 540){
            console.log("answer 3");
            choice = 3;
       }
    if(choice == ansNum){
        question = "You Win!";
        draw();
    }
    socket.emit("pick", choice);
};

const init = () => {
  canvas = document.querySelector('#canvas');
  ctx = canvas.getContext('2d');
  
  socket = io.connect();

  socket.on('joined', addUser); 
    
  socket.on('drawRound', (data) =>{
      answers = data.answers;
      question = data.question;
      ansNum = data.ansNum;
      
      draw();
  });
    
    document.body.addEventListener('mouseup', clickHandler);
};



window.onload = init;