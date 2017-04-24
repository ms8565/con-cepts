const draw = () => {

  ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle("#216800");
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  


};

//looping with requestAnimationFrame
const drawContinuous = (time) => {
  
  //call next animation frame
  animationFrame = requestAnimationFrame(draw);
}