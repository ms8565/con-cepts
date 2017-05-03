"use strict";

var drawQuestion = function drawQuestion() {};
var drawOptions = function drawOptions() {};

var drawRound = function drawRound() {

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

var APP_STATES = {
  LOGIN: 1,
  LOGIN_WAIT: 2,
  GAME_START: 3,
  ROUND_START: 4,
  ROUND_WAIT: 5,
  SHOW_CHOICES: 6,
  ROUND_END: 7,
  GAME_END: 8
};

var currentState = APP_STATES.LOGIN;

var changeState = function changeState(newState, data) {
  currentState = newState;

  switch (currentState) {
    case APP_STATES.LOGIN_WAIT:
      drawLoginWait();
      break;
    case APP_STATES.GAME_START:
      drawGameStart();
      break;
    case APP_STATES.ROUND_START:
      drawRoundStart(data.question);
      break;
    case APP_STATES.ROUND_WAIT:
      drawRoundWait();
      break;
    case APP_STATES.ROUND_END:
      drawRoundEnd();
      break;
    case APP_STATES.SHOW_CHOICES:
      drawShowChoices(data.question, data.answers);
      break;
    case APP_STATES.GAME_END:
      drawGameEnd();
      break;

  }
};

var onStartClick = function onStartClick(e) {
  var state = APP_STATES.GAME_START;
  socket.emit('changeState', { newState: state });
};

var onAnswerClick = function onAnswerClick(e) {
  var questionNum = e.target.value;
  console.log("Question num is: " + questionNum);

  //Send chosen answer to server
  socket.emit('chooseAnswerNum', { question: questionNum });
  //Wait for other players to finish
  changeState(APP_STATES.ROUND_WAIT);
};
var onAnswerSubmit = function onAnswerSubmit() {
  var answerInput = document.getElementById("answer-input").value;

  //Send submitted answer text to server
  socket.emit('submitAnswerText', { answer: answerInput });
  //Wait for other players to finish
  changeState(APP_STATES.ROUND_WAIT);
};

var drawLoginWait = function drawLoginWait() {
  console.log('test');
  var contentBox = document.querySelector('#state-content');
  //Clear content box
  contentBox.innerHTML = "";

  //Add start button
  var startBtn = document.createElement("BUTTON");
  startBtn.classList.add("btn");
  startBtn.classList.add("btn-lg");
  startBtn.addEventListener("click", onStartClick);
  startBtn.innerHTML = "START GAME";

  contentBox.appendChild(startBtn);
};

//Display onboarding information and game rules
var drawGameStart = function drawGameStart() {
  var contentBox = document.querySelector('#state-content');
  //Clear content box
  contentBox.innerHTML = "GAME IS ABOUT TO START";
};

//Display initial question and text prompt
var drawRoundStart = function drawRoundStart(question) {
  var contentBox = document.querySelector('#state-content');
  //Clear content box
  contentBox.innerHTML = "";

  //Add the question
  var questionElement = document.createElement("H3");
  questionElement.setAttribute("id", "question");
  var questionText = document.createTextNode(question);
  questionElement.appendChild(questionText);
  contentBox.appendChild(questionElement);

  //Add answer section
  var answersElement = document.createElement("div");
  answersElement.setAttribute("id", "answers");

  //Add text box
  var textElement = document.createElement("input");
  textElement.type = "text";
  textElement.setAttribute("id", "answer-input");
  answersElement.appendChild(textElement);

  //Add submit button
  var submitBtn = document.createElement("BUTTON");
  submitBtn.classList.add("btn");
  submitBtn.classList.add("btn-lg");
  submitBtn.addEventListener("click", onAnswerSubmit);
  submitBtn.innerHTML = "SUBMIT";
  answersElement.appendChild(submitBtn);

  contentBox.appendChild(answersElement);
};

//Display waiting screen while other players answer
var drawRoundWait = function drawRoundWait() {
  var contentBox = document.querySelector('#state-content');
  //Clear content box
  contentBox.innerHTML = "PLEASE WAIT FOR ROUND TO FINISH";
};

//Display submitted choices and allow player to choose one
var drawShowChoices = function drawShowChoices(question, answers) {

  var contentBox = document.querySelector('#state-content');
  //Clear content box
  contentBox.innerHTML = "";

  //Add the question
  var questionElement = document.createElement("H3");
  questionElement.setAttribute("id", "question");
  var questionText = document.createTextNode(question);
  questionElement.appendChild(questionText);
  contentBox.appendChild(questionElement);

  //Add all of the answer buttons
  var answersElement = document.createElement("div");
  answersElement.setAttribute("id", "answers");

  for (var i = 0; i < answers.length; i++) {
    var answerBtn = document.createElement("BUTTON");

    //Create styling
    answerBtn.classList.add("btn");
    answerBtn.classList.add("btn-lg");
    answerBtn.classList.add("answer-btn");

    answerBtn.innerHTML = answers[i];
    answerBtn.value = i;

    answerBtn.addEventListener("click", onAnswerClick);

    answersElement.appendChild(answerBtn);
  }

  //Add answers box to content box
  contentBox.appendChild(answersElement);
};

//Display correct answer and player points
var drawRoundEnd = function drawRoundEnd() {};

//Display player point totals
var drawGameEnd = function drawGameEnd() {};

var setupCanvas = function setupCanvas() {
  canvas = document.querySelector('#canvas');
  ctx = canvas.getContext('2d');
};

var init = function init() {
  socket = io.connect();

  socket.on('joined', function (data) {
    addUser(data);
    changeState(APP_STATES.LOGIN_WAIT);
  });

  socket.on('drawRound', function (data) {
    answers = data.answers;
    question = data.question;
    ansNum = data.ansNum;

    drawRoundStart();
    //drawRound();
  });

  socket.on('changeState', function (data) {
    changeState(data.newState, data);
  });
};

window.onload = init;
"use strict";

var addUser = function addUser(data) {
  hash = data.hash;
  players[hash] = data;
};
