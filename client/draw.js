const drawQuestion = () => {
  
}
const drawOptions = () => {
  
}

const drawRound = () => {

  ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#216800";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.font = "30px Architects Daughter";
  
    ctx.fillStyle = "#6eb74d";
    ctx.fillRect(250, 30, 480, 100);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(question, 260, 85);
    
    ctx.fillStyle = "#6eb74d";
  ctx.fillRect(100, 180, 280, 100);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(answers[0], 110, 230);
    
    ctx.fillStyle = "#6eb74d";
    ctx.fillRect(100, 350, 280, 100);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(answers[1], 110, 400);
    
    ctx.fillStyle = "#6eb74d";
    ctx.fillRect(630, 180, 280, 100);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(answers[2], 640, 230);
    
    ctx.fillStyle = "#6eb74d";
    ctx.fillRect(630, 350, 280, 100);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(answers[3], 640, 400);

};

//looping with requestAnimationFrame
const drawContinuous = (time) => {
  
  //call next animation frame
  animationFrame = requestAnimationFrame(draw);
}