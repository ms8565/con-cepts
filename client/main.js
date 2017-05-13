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
  GAME_END: 8,
  FINAL_RESULT: 9,
  CREATE_GAME: 10
};

let currentState = APP_STATES.LOGIN;

const changeState = (newState, data) => {
  currentState = newState;
  
  switch(currentState){
    case APP_STATES.LOGIN_WAIT:
      drawLoginWait();
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

const onCreateClick = (e) => {
  changeState(APP_STATES.CREATE_GAME);
}

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


const checkCreateRoom = () => {
  
};

const checkJoinRoom = () => {
  
};


const setupCanvas = () => {
  canvas = document.querySelector('#canvas');
  ctx = canvas.getContext('2d');
}

const init = () => {
  document.getElementById("createBtn").onclick = function(){
    changeState(APP_STATES.CREATE_GAME);
  }
  
  socket = io.connect();

  socket.on('joined', (data) => {
    addUser(data.hash);
      if(data.currentState == 6){
          changeState(APP_STATES.ROUND_WAIT);
      }
      else{
       // changeState(APP_STATES.LOGIN_WAIT);
      }
  }); 
    
  socket.on('drawRound', (data) =>{
      answers = data.answers;
      question = data.question;
      ansNum = data.ansNum;
      
      drawRoundStart();
  });
  
  socket.on('changeState', (data) => {
      console.log("data hash: " + data.hash + ", this hash: " + hash);
      if(data.hash == hash || data.hash == null) changeState(data.newState, data);
  });
    
    
};



window.onload = init;