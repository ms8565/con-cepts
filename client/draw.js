const draw = () => {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  


};

//looping with requestAnimationFrame
const drawContinuous = (time) => {
  
  //call next animation frame
  animationFrame = requestAnimationFrame(draw);
}