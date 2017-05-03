

// fast hashing library
const xxh = require('xxhashjs');
// Player class
const Player = require('./classes/Player.js');
// Room class
const Room = require('./classes/Room.js');

// List of player rooms
const rooms = {};

// our socketio instance
let io;

// demo junk
const currentQuestion = 'What is the best kind of graph?';
const currentAnswers = ['shape', 'blue', 'applesause', 'bargraph'];
const currentAnsNum = 3;
// const currentRound = 1;

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
  let data;


  switch (currentState) {
    case APP_STATES.GAME_START:
      // Tell all users to start the game and show onboarding
      io.sockets.in('room1').emit('changeState', currentState);

      // After 10 seconds, start the first round
      setTimeout(() => {
        changeState(APP_STATES.ROUND_START);
      }, 1000);

      break;
    case APP_STATES.ROUND_START:
      // Tell all users to start the round, send them the current question
      data = { newState: currentState, question: currentQuestion };
      io.sockets.in('room1').emit('changeState', data);

      setTimeout(() => {
        changeState(APP_STATES.SHOW_CHOICES);
      }, 10000);

      break;
    case APP_STATES.ROUND_END:
      // Send the users the point totals
      // Send current state, ROUND_END
      io.sockets.in('room1').emit('changeState', currentState);

      // After 10 seconds, start the next round
      setTimeout(() => {
        changeState(APP_STATES.ROUND_START);
      }, 1000);

      break;
    case APP_STATES.SHOW_CHOICES:
      // Send users the entered answers
      data = { newState: currentState, question: currentQuestion, answers: currentAnswers };
      io.sockets.in('room1').emit('changeState', data);
      break;
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
  rooms[roomName] = new Room(roomName);
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

    socket.on('pick', (choice) => {
      console.log(`choice: ${choice}`);
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
