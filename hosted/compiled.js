"use strict";

var draw = function draw() {

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
var drawContinuous = function drawContinuous(time) {

  //call next animation frame
  animationFrame = requestAnimationFrame(draw);
};
"use strict";

var canvas = void 0;
var ctx = void 0;
var socket = void 0;
var hash = void 0;

var players = [];
var answers = [];
var question = "Question text";
var ansNum = 0;

//handler for mouse clicks
var clickHandler = function clickHandler(e) {
    console.log("x: " + e.x + ", y: " + e.y);
    var choice;
    if (e.x >= 563 && e.y >= 271 && e.x <= 843 && e.y <= 370) {
        console.log("answer 0");
        choice = 0;
    } else if (e.x >= 563 && e.y >= 440 && e.x <= 843 && e.y <= 540) {
        console.log("answer 1");
        choice = 1;
    } else if (e.x >= 1093 && e.y >= 271 && e.x <= 1373 && e.y <= 370) {
        console.log("answer 2");
        choice = 2;
    } else if (e.x >= 1093 && e.y >= 440 && e.x <= 1373 && e.y <= 540) {
        console.log("answer 3");
        choice = 3;
    }
    if (choice == ansNum) {
        question = "You Win!";
        draw();
    }
    socket.emit("pick", choice);
};

var init = function init() {
    canvas = document.querySelector('#canvas');
    ctx = canvas.getContext('2d');

    socket = io.connect();

    socket.on('joined', addUser);

    socket.on('drawRound', function (data) {
        answers = data.answers;
        question = data.question;
        ansNum = data.ansNum;

        draw();
    });

    document.body.addEventListener('mouseup', clickHandler);
};

window.onload = init;
"use strict";

var addUser = function addUser(data) {
  hash = data.hash;
  players[hash] = data;
};
