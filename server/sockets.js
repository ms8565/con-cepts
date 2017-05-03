

// fast hashing library
const xxh = require('xxhashjs');
// Player class
const Player = require('./classes/Player.js');
// Room class
const Room = require('./classes/Room.js');
// Round class
const Round = require('./classes/Round.js');
// Answer class
const Answer = require('./classes/Answer.js');

// List of player rooms
const rooms = {};

// our socketio instance
let io;

// demo junk
const demoQuestion = 'What is the best kind of graph?';
const demoAnswer = 'bar graph';

const rounds = [];
let currentRound = 0;
rounds.push(new Round('question', 'answer'));
rounds.push(new Round(demoQuestion, demoAnswer));


const APP_STATES = {
  LOGIN: 1,
  LOGIN_WAIT: 2,
  GAME_START: 3,
  ROUND_START: 4,
  ROUND_WAIT: 5,
  SHOW_CHOICES: 6,
  ROUND_END: 7,
  GAME_END: 8,
};

let currentState = APP_STATES.LOGIN_WAIT;

const changeState = (newState) => {
  currentState = newState;
  const currentQuestion = rounds[currentRound].question;
  const currentAnswers = rounds[currentRound].answers;
  let data;


  switch (currentState) {
    case APP_STATES.GAME_START: {
      // Tell all users to start the game and show onboarding
      io.sockets.in('room1').emit('changeState', currentState);

      // After 10 seconds, start the first round
      setTimeout(() => {
        changeState(APP_STATES.ROUND_START);
      }, 1000);

      break;
    }
    case APP_STATES.ROUND_START: {
      // Tell all users to start the round, send them the current question
      data = { newState: currentState, question: currentQuestion };
      io.sockets.in('room1').emit('changeState', data);
      
      break;
    }
    case APP_STATES.ROUND_END: {
      // Send the users the point totals
      io.sockets.in('room1').emit('changeState', currentState);
        
      rounds[currentRound].answers[rounds[currentRound].correctIndex].pickedBy.forEach(function(e){
          rooms["room1"].players[e].score += 100;
      })
        
      currentRound++;
      // After 10 seconds, start the next round
      setTimeout(() => {
        changeState(APP_STATES.ROUND_START);
      }, 1000);

      break;
    }
    case APP_STATES.SHOW_CHOICES: {
      // shuffle round answers
      const newAnswer = new Answer('ANSWER', rounds[currentRound].correctAnswer);
      rounds[currentRound].answers.push(newAnswer);

      // Get authorless answers
      const choices = currentAnswers.map((answer) => answer.text);

      // Send users the entered answers
      data = { newState: currentState, question: currentQuestion, answers: choices };
      io.sockets.in('room1').emit('changeState', data);
      break;
    }
    case APP_STATES.GAME_END:

      break;
    default:
      break;
  }
};

// Add new user to a room
const addUserToRoom = (sock) => {
  const socket = sock;

  const roomName = 'room1';
  socket.roomName = roomName;
    if(rooms[roomName] == null){
        rooms[roomName] = new Room(roomName);
    }
  /* let added = false;

  const keys = Object.keys(rooms);

  for (let i = 0; i < keys.length; i++) {

    // Check if a room has an open spot
    if (rooms[keys[i]].numUsers < 2) {
      socket.roomName = keys[i];
      rooms[keys[i]].numUsers++;

      added = true;
    }
  }
  // If there weren't any rooms open, make a new one
  if (!added) {
    // create unqiue roomname based on time
    const roomName = xxh.h32(`${new Date().getTime()}`, 0xCAFEBABE).toString(16);
    socket.roomName = roomName;
    rooms[roomName] = new Room(roomName);
  }*/
};

// setup socket server
const setupSockets = (ioServer) => {
  // set our io server instance
  io = ioServer;


  // on socket connections
  io.on('connection', (sock) => {
    const socket = sock;


    // create a unique id for the user based on the socket id and time
    const hash = xxh.h32(`${socket.id}${new Date().getTime()}`, 0xCAFEBABE).toString(16);

    // add the id to the user's socket object for quick reference
    socket.hash = hash;

    addUserToRoom(socket);

    socket.join(socket.roomName);

    const room = rooms[socket.roomName];

    // create a new character and store it by its unique id
    room.players[hash] = new Player(hash);
    // emit joined event to the user
    socket.emit('joined', room.players[hash]);

    socket.on('chooseAnswerNum', (data) => {
      rounds[currentRound].answers[data.question].pickedBy.push(socket.hash);
        rounds[currentRound].unanswered--;
        if(rounds[currentRound].unanswered <= 0) changeState(APP_STATES.ROUND_END);
      console.log(`choice: ${data.question}`);
    });
    socket.on('submitAnswerText', (data) => {
      const answer = new Answer(socket.hash, data.answer);
      rounds[currentRound].answers.push(answer);
        rounds[currentRound].unanswered++;
        if(rounds[currentRound].unanswered == Object.keys(rooms["room1"].players).length) changeState(APP_STATES.SHOW_CHOICES);
    });
    socket.on('changeState', (data) => {
      changeState(data.newState);
    });

    socket.on('disconnect', () => {
      io.sockets.in(socket.roomName).emit('left', room.players[socket.hash]);

      delete room.players[socket.hash];
      room.numUsers--;

      // if the room is now empty, delete it
      if (room.numUsers <= 0) {
        delete rooms[socket.roomName];
      }


      socket.leave(socket.roomName);
    });
  });
};

module.exports.setupSockets = setupSockets;
