let canvas;
let ctx;
let socket; 
let hash;


const init = () => {
  canvas = document.querySelector('#canvas');
  ctx = canvas.getContext('2d');
  
  socket = io.connect();

  socket.on('joined', addUser); 
};



window.onload = init;