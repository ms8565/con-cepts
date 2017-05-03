let canvas;
let ctx;
let socket; 
let hash;

let players = [];
let answers = [];
let question = "Question text";
let ansNum = 0;

const APP_STATES = {
  LOGIN: 1,
  LOGIN_WAIT: 2,
  GAME_START: 3,
  ROUND_START: 4,
  ROUND_WAIT: 5,
  SHOW_CHOICES: 6,
  ROUND_END: 7,
  GAME_END: 8
};

let currentState = APP_STATES.LOGIN;

const changeState = (newState, data) => {
  currentState = newState;
  
  switch(currentState){
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

const onStartClick = (e) => {
  let state = APP_STATES.GAME_START;
  socket.emit('changeState', { newState: state });
};

const onAnswerClick = (e) => {
  const questionNum = e.target.value;
  console.log("Question num is: "+questionNum);
  
  //Send chosen answer to server
  socket.emit('chooseAnswerNum', { question: questionNum });
  //Wait for other players to finish
  changeState(APP_STATES.ROUND_WAIT);
};
const onAnswerSubmit = () => {
  const answerInput = document.getElementById("answer-input").value;
  
  //Send submitted answer text to server
  socket.emit('submitAnswerText', { answer: onAnswerSubmit });
  //Wait for other players to finish
  changeState(APP_STATES.ROUND_WAIT);
};

const drawLoginWait = () => {
  console.log('test');
  let contentBox = document.querySelector('#state-content');
  //Clear content box
  contentBox.innerHTML = "";
  
  //Add start button
  let startBtn = document.createElement("BUTTON");
  startBtn.classList.add("btn");
  startBtn.classList.add("btn-lg");
  startBtn.addEventListener("click",onStartClick);
  startBtn.innerHTML = "START GAME";
  
  contentBox.appendChild(startBtn);
};

//Display onboarding information and game rules
const drawGameStart = () => {
  let contentBox = document.querySelector('#state-content');
  //Clear content box
  contentBox.innerHTML = "GAME IS ABOUT TO START";
};

//Display initial question and text prompt
const drawRoundStart = (question) => {
  let contentBox = document.querySelector('#state-content');
  //Clear content box
  contentBox.innerHTML = "";
  
  //Add the question
  let questionElement = document.createElement("H3");
  questionElement.setAttribute("id", "question");
  let questionText = document.createTextNode(question);
  questionElement.appendChild(questionText);
  contentBox.appendChild(questionElement);
  
  //Add answer section
  let answersElement = document.createElement("div");
  answersElement.setAttribute("id", "answers");
  
  //Add text box
  let textElement = document.createElement("input");
  textElement.type = "text";
  textElement.setAttribute("id", "answer-input");
  answersElement.appendChild(textElement);
  
  //Add submit button
  let submitBtn = document.createElement("BUTTON");
  submitBtn.classList.add("btn");
  submitBtn.classList.add("btn-lg");
  submitBtn.addEventListener("click",onAnswerSubmit);
  submitBtn.innerHTML = "SUBMIT";
  answersElement.appendChild(submitBtn);
  
  contentBox.appendChild(answersElement);
};

//Display waiting screen while other players answer
const drawRoundWait = () => {
  let contentBox = document.querySelector('#state-content');
  //Clear content box
  contentBox.innerHTML = "PLEASE WAIT FOR ROUND TO FINISH";
};

//Display submitted choices and allow player to choose one
const drawShowChoices = (question, answers) => {
  
  let contentBox = document.querySelector('#state-content');
  //Clear content box
  contentBox.innerHTML = "";
  
  //Add the question
  let questionElement = document.createElement("H3");
  questionElement.setAttribute("id", "question");
  let questionText = document.createTextNode(question);
  questionElement.appendChild(questionText);
  contentBox.appendChild(questionElement);
  
  //Add all of the answer buttons
  let answersElement = document.createElement("div");
  answersElement.setAttribute("id", "answers");
  
  for(let i = 0; i < answers.length; i++){
    let answerBtn = document.createElement("BUTTON");
    
    //Create styling
    answerBtn.classList.add("btn");
    answerBtn.classList.add("btn-lg");
    answerBtn.classList.add("answer-btn");
    
    answerBtn.innerHTML = answers[i];
    answerBtn.value = i;
    
    answerBtn.addEventListener("click",onAnswerClick);
    
    answersElement.appendChild(answerBtn);
  }
  
  //Add answers box to content box
  contentBox.appendChild(answersElement);
};

//Display correct answer and player points
const drawRoundEnd = () => {
  
};

//Display player point totals
const drawGameEnd = () => {
  
};

const setupCanvas = () => {
  canvas = document.querySelector('#canvas');
  ctx = canvas.getContext('2d');
}

const init = () => {
  socket = io.connect();

  socket.on('joined', (data) => {
    addUser(data);
    changeState(APP_STATES.LOGIN_WAIT);
  }); 
    
  socket.on('drawRound', (data) =>{
      answers = data.answers;
      question = data.question;
      ansNum = data.ansNum;
      
      drawRoundStart();
      //drawRound();
  });
  
  socket.on('changeState', (data) => {
    changeState(data.newState, data);
  });
    
    
};



window.onload = init;