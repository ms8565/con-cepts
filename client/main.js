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


const checkJoinRoom = () => {
    let roomInput = document.querySelector("#roomName").value;
    let usernameInput = document.querySelector("#userName").value;
    socket.emit('checkJoin', { roomName: roomInput, userName: usernameInput});
}
const checkCreateRoom = () => {
    let roomInput = document.querySelector("#roomName").value;
    let usernameInput = document.querySelector("#userName").value;
  
    //get all questions and answers
    let qaElements = document.getElementsByClassName("new-qa");
    let QAs = [];
    for(let i = 0; i < qaElements.length; i++){
      let question = qaElements[i].getElementsByClassName("new-question")[0];
      let answer = qaElements[i].getElementsByClassName("new-answer")[0];
      QAs.push({question: question.value, answer: answer.value});
    }
  console.log(QAs);
    if(QAs.length > 0){
       socket.emit('checkCreate', { roomName: roomInput, userName: usernameInput, rounds: QAs});
    }
   
}


const setupCanvas = () => {
  canvas = document.querySelector('#canvas');
  ctx = canvas.getContext('2d');
}

const init = () => {
  document.getElementById("createFormBtn").onclick = function(){
    changeState(APP_STATES.CREATE_GAME);
  }
  document.getElementById("joinBtn").onclick = checkJoinRoom;
  
  socket = io.connect();
  
  setupSocket();


    
    
};

const setupSocket = () => {
    socket.on('joinRoom', (data) => {
    //addUser(data.player);
    players.push(data.player);
      console.log("joining: "+data.roomName);
      if(data.currentState == 6){
          changeState(APP_STATES.ROUND_WAIT);
      }
      else{
        changeState(APP_STATES.LOGIN_WAIT, data);
      }
    });
    socket.on('denyRoom', (data) => {
        let errorText = document.querySelector("#nameHelp");
        errorText.innerHTML = data.message;
    });
    socket.on('addOtherPlayer', (data) => {
      players.push(data.otherPlayer);
      updateWaitingUsers();
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
}



window.onload = init;