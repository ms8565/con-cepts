"use strict";

var draw = function draw() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle("#216800");
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

//looping with requestAnimationFrame
var drawContinuous = function drawContinuous(time) {

  //call next animation frame
  animationFrame = requestAnimationFrame(draw);
};
'use strict';

var canvas = void 0;
var ctx = void 0;
var socket = void 0;
var hash = void 0;

var players = [];

var init = function init() {
  canvas = document.querySelector('#canvas');
  ctx = canvas.getContext('2d');

  socket = io.connect();

  socket.on('joined', addUser);
};

window.onload = init;
"use strict";

var addUser = function addUser(data) {
  hash = data.hash;
  players[hash] = data;
};
