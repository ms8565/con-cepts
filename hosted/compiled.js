"use strict";

//I hate myself, and this function
var drawCreateGame = function drawCreateGame() {
  var contentBox = document.querySelector('#state-content');
  //Clear content box
  contentBox.innerHTML = "";

  var container = document.createElement("div");
  container.id = "create-form";

  //Game Room Name Form Group
  var formGroup1 = document.createElement("div");
  formGroup1.classList.add("form-group");
  //Game Room Name label
  var roomLabel = document.createElement("label");
  roomLabel.htmlFor = "roomName";
  roomLabel.innerText = "Game Room Name";
  //Game Room Name Text Field
  var roomName = document.createElement("INPUT");
  roomName.id = "roomName";
  roomName.type = "text";
  roomName.placeholder = "Room Name";
  roomName.classList.add("form-control");

  formGroup1.appendChild(roomLabel);
  formGroup1.appendChild(roomName);
  container.appendChild(formGroup1);

  //User Name Form Group
  var formGroup2 = document.createElement("div");
  formGroup2.classList.add("form-group");
  //User Name Name label
  var userLabel = document.createElement("label");
  userLabel.htmlFor = "userName";
  userLabel.innerText = "Your Name";
  //User Name Text Field
  var userName = document.createElement("INPUT");
  userName.id = "userName";
  userName.type = "text";
  userName.placeholder = "User Name";
  userName.classList.add("form-control");

  formGroup2.appendChild(userLabel);
  formGroup2.appendChild(userName);
  container.appendChild(formGroup2);

  var newQuestionsBox = document.createElement("div");
  newQuestionsBox.id = "new-questions";

  var addQABtn = document.createElement("BUTTON");
  addQABtn.classList.add("btn");
  addQABtn.classList.add("btn-default");
  addQABtn.classList.add("btn-custom");
  addQABtn.id = "addQABtn";
  addQABtn.addEventListener("click", addQA);
  addQABtn.innerHTML = "Add Question";

  newQuestionsBox.appendChild(addQABtn);

  // Name Help Span
  var helpSpan = document.createElement("span");
  helpSpan.id = "nameHelp";
  helpSpan.classList.add("help-block");
  helpSpan.innerHTML = "test span";

  var createBtn = document.createElement("BUTTON");
  createBtn.classList.add("btn");
  createBtn.classList.add("btn-lg");
  createBtn.classList.add("btn-custom");
  createBtn.classList.add("btn-block");
  createBtn.addEventListener("click", checkCreateRoom);
  createBtn.innerHTML = "Create and Join Game";

  container.appendChild(newQuestionsBox);
  container.appendChild(helpSpan);
  container.appendChild(createBtn);

  contentBox.appendChild(container);

  addQA();
};

var addQA = function addQA() {
  var newQuestionBox = document.createElement("div");
  newQuestionBox.classList.add("new-qa");
  newQuestionBox.classList.add("well");
  newQuestionBox.classList.add("form-group");

  //Question label
  var questionLabel = document.createElement("label");
  questionLabel.htmlFor = "question-input" + document.getElementById("new-questions").childElementCount;
  questionLabel.innerText = "Question";
  questionLabel.classList.add("new-q-label");
  //Question textfield
  var question = document.createElement("textarea");
  question.innerHTML = "Write your new question";
  question.id = "question-input" + document.getElementById("new-questions").childElementCount;
  question.classList.add("new-question");
  question.classList.add("form-control");
  question.classList.rows = '3';

  //Answer label
  var answerLabel = document.createElement("label");
  answerLabel.htmlFor = "answers-input" + document.getElementById("new-questions").childElementCount;
  answerLabel.innerText = "Answer";

  //Answer textfield
  var answer = document.createElement("textarea");
  answer.innerHTML = "Write your new answer";
  answer.id = "answer-input" + document.getElementById("new-questions").childElementCount;
  answer.classList.add("new-answer");
  answer.classList.add("form-control");
  answer.classList.rows = '3';

  var deleteQABtn = document.createElement("BUTTON");
  deleteQABtn.classList.add("btn");
  deleteQABtn.classList.add("btn-danger");
  deleteQABtn.classList.add("btn-custom");
  deleteQABtn.addEventListener("click", function () {
    document.getElementById("new-questions").removeChild(newQuestionBox);
  });
  deleteQABtn.innerHTML = '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>';

  newQuestionBox.appendChild(questionLabel);
  newQuestionBox.appendChild(deleteQABtn);
  newQuestionBox.appendChild(question);
  newQuestionBox.appendChild(answerLabel);
  newQuestionBox.appendChild(answer);

  //Insert before "Add Question" button
  var addQABtn = document.getElementById("addQABtn");
  document.getElementById("new-questions").insertBefore(newQuestionBox, addQABtn);
};

var deleteQA = function deleteQA(element) {
  //Remove "new-qa" div, which is parent of the deleteBtn
  //Have the "new-questions" div remove the "new-qa" div
  console.log('checkdelete');
  element.parentNode.removeChild(element);
};

var updateWaitingUsers = function updateWaitingUsers() {
  var playerBox = document.getElementById("current-users");
  for (var i = 0; i < players.length; i++) {
    var header = document.createElement("h4");
    header.appendChild(document.createTextNode(players[i].name));
    playerBox.appendChild(header);
  }
};
var test = 0;

var drawLoginWait = function drawLoginWait(roomName) {
  console.log('test');
  var contentBox = document.querySelector('#state-content');
  //Clear content box
  contentBox.innerHTML = "";

  var header = document.createElement("h3");
  header.appendChild(document.createTextNode("Players in " + roomName));

  var playerBox = document.createElement("div");
  playerBox.id = "current-users";

  //Add start button
  var startBtn = document.createElement("BUTTON");
  startBtn.classList.add("btn");
  startBtn.classList.add("btn-lg");
  startBtn.classList.add("btn-custom");
  startBtn.addEventListener("click", onStartClick);
  startBtn.innerHTML = "START GAME";

  contentBox.appendChild(header);
  contentBox.appendChild(playerBox);
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
  console.log("contentBox: " + answersElement);

  //Add text box
  var textElement = document.createElement("input");
  textElement.type = "text";
  textElement.setAttribute("id", "answer-input");
  answersElement.appendChild(textElement);

  //Add submit button
  var submitBtn = document.createElement("BUTTON");
  submitBtn.classList.add("btn");
  submitBtn.classList.add("btn-lg");
  submitBtn.classList.add("btn-custom");
  submitBtn.addEventListener("click", onAnswerSubmit);
  submitBtn.innerHTML = "SUBMIT";
  answersElement.appendChild(submitBtn);

  contentBox.appendChild(answersElement);
};

//Display waiting screen while other players answer
var drawRoundWait = function drawRoundWait() {
  var contentBox = document.querySelector('#answers');
  var content = document.querySelector('#state-content');
  if (contentBox == null) {
    var answersElement = document.createElement("div");
    answersElement.setAttribute("id", "answers");
    content.appendChild(answersElement);
    contentBox = document.querySelector('#answers');
  }
  if (document.querySelector(".loader") == null) {
    var wheel = document.createElement("div");
    wheel.setAttribute("class", "loader");
    content.appendChild(wheel);
  }
  contentBox.innerHTML = "PLEASE WAIT FOR ROUND TO FINISH";
};

//Display submitted choices and allow player to choose one
var drawShowChoices = function drawShowChoices(data) {
  if (document.querySelector(".loader") != null) {
    document.querySelector(".loader").setAttribute("class", "");
  }
  //add question
  var question = data.question;
  var answers = data.answers;
  var questionElement = document.querySelector('#question');
  questionElement.innerHTML = question;

  //Add all of the answer buttons
  var answersElement = document.querySelector('#answers');
  answersElement.innerHTML = "";

  for (var i = 0; i < answers.length; i++) {
    var answerBtn = document.createElement("BUTTON");

    //Create styling
    answerBtn.classList.add("btn");
    answerBtn.classList.add("btn-lg");
    answerBtn.classList.add("btn-custom");
    answerBtn.classList.add("answer-btn");

    answerBtn.innerHTML = answers[i];
    answerBtn.value = i;

    answerBtn.addEventListener("click", onAnswerClick);

    answersElement.appendChild(answerBtn);
  }

  //final round progress
  /*let progWrap;
  let progBar;
  if(data.progress != null){
      if(document.querySelector(".progress") == null){
      let content = document.querySelector('#state-content');
      let progWrap = document.createElement("div");
      progWrap.classList.add("progress");
      let progBar = document.createElement("div");
      progBar.classList.add("progress-bar");
      progBar.setAttribute("role", "progressbar");
      }
      else{
          progWrap = document.querySelector(".progress");
          progBar = document.querySelector(".progress-bar");
      }
        progBar.style.width = data.progress+"%";
      progWrap.appendChild(progBar);
      content.appendChild(progWrap);
    }*/
};

//Display correct answer and player points
var drawRoundEnd = function drawRoundEnd(answers, players) {
  var answersElement = document.querySelector('#answers');
  answersElement.innerHTML = "";

  for (var i = 0; i < answers.length; i++) {
    var answerSection = document.createElement("div");
    answerSection.innerHTML += "<h4>" + answers[i].text + "</h4>";
    answerSection.innerHTML += "<p>" + answers[i].author + "</p>";
    answersElement.appendChild(answerSection);
  }
  answersElement.innerHTML += "<hr/>";

  console.log('players: ' + JSON.stringify(players));
  var keys = Object.keys(players);
  for (var _i = 0; _i < keys.length; _i++) {
    var player = players[keys[_i]];
    answersElement.innerHTML += "<h4>" + player.hash + ": " + player.score + " points</h4>";
  }
};

//Display player point totals
var drawGameEnd = function drawGameEnd(players) {
  var questionElement = document.querySelector('#question');
  questionElement.innerHTML = "FINAL RESULTS";
  var answersElement = document.querySelector('#answers');
  answersElement.innerHTML = "";

  console.log('players: ' + JSON.stringify(players));
  var keys = Object.keys(players);
  for (var i = 0; i < keys.length; i++) {
    var player = players[keys[i]];
    answersElement.innerHTML += "<h4>" + player.hash + ": " + player.score + " points</h4>";
  }
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
  GAME_END: 8,
  FINAL_RESULT: 9,
  CREATE_GAME: 10
};

var currentState = APP_STATES.LOGIN;

var changeState = function changeState(newState, data) {
  currentState = newState;

  switch (currentState) {
    case APP_STATES.LOGIN_WAIT:
      drawLoginWait(data.roomName);
      break;
    case APP_STATES.CREATE_GAME:
      console.log("check");
      drawCreateGame();
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
      drawRoundEnd(data.answers, data.players);
      break;
    case APP_STATES.SHOW_CHOICES:
      drawShowChoices(data);
      break;
    case APP_STATES.GAME_END:
      drawGameEnd(data.players);
      break;
    case APP_STATES.FINAL_RESULT:
      drawGameEnd(data.players);
      break;
  }
};

var onCreateClick = function onCreateClick(e) {
  changeState(APP_STATES.CREATE_GAME);
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

var checkJoinRoom = function checkJoinRoom() {
  var roomInput = document.querySelector("#roomName").value;
  var usernameInput = document.querySelector("#userName").value;
  socket.emit('checkJoin', { roomName: roomInput, userName: usernameInput });
};
var checkCreateRoom = function checkCreateRoom() {
  var roomInput = document.querySelector("#roomName").value;
  var usernameInput = document.querySelector("#userName").value;

  //get all questions and answers
  var qaElements = document.getElementsByClassName("new-qa");
  var QAs = [];
  for (var i = 0; i < qaElements.length; i++) {
    var _question = qaElements[i].getElementsByClassName("new-question")[0];
    var answer = qaElements[i].getElementsByClassName("new-answer")[0];
    QAs.push({ question: _question.value, answer: answer.value });
  }
  console.log(QAs);
  if (QAs.length > 0) {
    socket.emit('checkCreate', { roomName: roomInput, userName: usernameInput, rounds: QAs });
  }
};

var setupCanvas = function setupCanvas() {
  canvas = document.querySelector('#canvas');
  ctx = canvas.getContext('2d');
};

var init = function init() {
  document.getElementById("createFormBtn").onclick = function () {
    changeState(APP_STATES.CREATE_GAME);
  };
  document.getElementById("joinBtn").onclick = checkJoinRoom;

  socket = io.connect();

  setupSocket();
};

var setupSocket = function setupSocket() {
  socket.on('joinRoom', function (data) {
    //addUser(data.player);
    players.push(data.player);
    console.log("joining: " + data.roomName);
    if (data.currentState == 6) {
      changeState(APP_STATES.ROUND_WAIT);
    } else {
      changeState(APP_STATES.LOGIN_WAIT, data);
    }
  });
  socket.on('denyRoom', function (data) {
    var errorText = document.querySelector("#nameHelp");
    errorText.innerHTML = data.message;
  });
  socket.on('addOtherPlayer', function (data) {
    players.push(data.otherPlayer);
    updateWaitingUsers();
  });

  socket.on('drawRound', function (data) {
    answers = data.answers;
    question = data.question;
    ansNum = data.ansNum;

    drawRoundStart();
  });

  socket.on('changeState', function (data) {
    console.log("data hash: " + data.hash + ", this hash: " + hash);
    if (data.hash == hash || data.hash == null) changeState(data.newState, data);
  });
};

window.onload = init;
"use strict";

var addUser = function addUser(data) {
  //hash = data.player;
  //players[hash] = data;
};
