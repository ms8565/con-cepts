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
  socket.emit('submitAnswerText', { answer: answerInput });
  //Wait for other players to finish
  changeState(APP_STATES.ROUND_WAIT);
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
  });
  
  socket.on('changeState', (data) => {
    changeState(data.newState, data);
  });
    
    
};



window.onload = init;