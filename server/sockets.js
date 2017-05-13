

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
// Array Randomizer
const randomize = require('./randomize.js');

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
/* rounds.push(new Round('what is the only fully evolved fire type not to learn solar beam?',
                      'Flareon'));
rounds.push(new Round('do you like jazz?', 'yes'));
rounds.push(new Round('can I sleep yet?',
                      'probably not, more questions to write'));
rounds.push(new Round('what is the meaning of life?',
                      "hope y'all come up with a better answer than I did"));
rounds.push(new Round('what does a $7 root beer taste like?',
                      'about $5 worth of root beer'));
rounds.push(new Round('Die Geschichte vom Daumenlutscher?',
                      'in schnellem Lauf Springt der Schneider'));
*/

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
};

let currentState = APP_STATES.GAME_START;

const changeState = (newState, socket) => {
  currentState = newState;
  console.log(`current state: ${currentState}`);

  const currentQuestion = rounds[currentRound].question;
  // const currentAnswers = rounds[currentRound].answers;

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
      // io.sockets.in('room1').emit('changeState', currentState);

      rounds[currentRound].answers[rounds[currentRound].correctIndex].pickedBy.forEach((e) => {
        rooms.room1.players[e].score += 100;
      });
      data = {
        newState: currentState,
        players: rooms.room1.players,
        answers: rounds[currentRound].answers,
      };
      io.sockets.in('room1').emit('changeState', data);

      // After 10 seconds, start the next round
      setTimeout(() => {
        if (rounds[currentRound + 1] != null) {
          currentRound++;
          changeState(APP_STATES.ROUND_START);
        } else changeState(APP_STATES.GAME_END, socket);
      }, 2000);

      break;
    }
    case APP_STATES.SHOW_CHOICES: {
      // shuffle round answers
      const newAnswer = new Answer('ANSWER', rounds[currentRound].correctAnswer);
      rounds[currentRound].answers.push(newAnswer);

      rounds[currentRound].answers = randomize.randomizeArray(rounds[currentRound].answers);

      rounds[currentRound].answers.forEach((e, index) => {
        console.log(`answer: ${e.text}`);

        if (e.text === rounds[currentRound].correctAnswer) {
          console.log(`correct index: ${index}`);
          rounds[currentRound].correctIndex = index;
        }
      });
        // Get authorless answers
      const choices = rounds[currentRound].answers.map((answer) => answer.text);

      // Send users the entered answers
      data = { newState: currentState, question: currentQuestion, answers: choices };
      io.sockets.in('room1').emit('changeState', data);
      break;
    }
    case APP_STATES.GAME_END: {
      const room = rooms.room1;
      room.finalTurns = Object.keys(room.players).length * rounds.length;
      console.log(`final turns: ${Object.keys(room.players).length}, rounds: ${rounds.length}`);

        // room.randNums = randomArray();
      const currentQ = rounds[0].question;
      const currentA = rounds[0].answers;

        // Get authorless answers
      const choices = currentA.map((answer) => answer.text);
      data = { newState: APP_STATES.SHOW_CHOICES,
        question: currentQ, answers: choices };

      console.log(`Question: ${data.question}`);
      io.sockets.in('room1').emit('changeState', data);

      break;
    }
    case APP_STATES.FINAL_RESULT: {
      data = {
        newState: APP_STATES.FINAL_RESULT,
        players: rooms.room1.players,
      };
      io.sockets.in('room1').emit('changeState', data);
      break;
    }
    default:
      break;
  }
};

// Add new user to a room
const addUserToRoom = (sock) => {
  const socket = sock;

  const roomName = 'room1';
  socket.roomName = roomName;
  if (rooms[roomName] == null) {
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

    //addUserToRoom(socket);

    //socket.join(socket.roomName);

    //const room = rooms[socket.roomName];
    //room.numUsers++;
    // create a new character and store it by its unique id
    //room.players[hash] = new Player(hash);
    // emit joined event to the user
    
    //const joinData = { player: room.players[hash], currentState };
    
    //socket.emit('joined', joinData);
    
    socket.on('checkJoin', (data) => {
      if (data.roomName in rooms ) {
        socket.roomName = data.roomName;
        socket.name = data.userName;
        Room.addUser(socket, rooms[socket.roomName]);
        
        const joinData = { 
          player: rooms[socket.roomName].players[hash],
          roomName: data.roomName, 
          userName: socket.name,
          currentState };
        
        socket.emit('joinRoom', joinData );
        socket.broadcast.emit('addOtherPlayer', {player: rooms[socket.roomName].players[hash]});
      } else {
        socket.emit('denyRoom', { message: 'Room does not exist' });
      }
    });
    socket.on('checkCreate', (data) => {
      if (!(data.roomName in rooms)) {
        rooms[data.roomName] = new Room(data.roomName);
        socket.roomName = data.roomName;
        socket.name = data.userName;

        Room.addUser(socket, rooms[socket.roomName]);
        
        console.log("roomName: "+socket.roomName);
        
        const joinData = { 
          player: rooms[socket.roomName].players[hash],
          roomName: socket.roomName, 
          userName: socket.name,
          currentState };
        socket.emit('joinRoom', joinData);
      } else {
        socket.emit('denyRoom', { message: 'Room already exists' });
      }
    });

    socket.on('chooseAnswerNum', (data) => {
      if (currentState !== APP_STATES.GAME_END && currentState !== APP_STATES.FINAL_RESULT) {
        rounds[currentRound].answers[data.question].pickedBy.push(socket.hash);
        console.log(`unanswered: ${rounds[currentRound].unanswered}`);
        rounds[currentRound].unanswered--;
        if (rounds[currentRound].unanswered <= 0) changeState(APP_STATES.ROUND_END, socket);
        console.log(`choice: ${data.question}`);
      }
      console.log(`gameState: ${currentState}`);
      if (currentState === APP_STATES.GAME_END) {
        console.log('Game End');
        room.finalTurns--;
        console.log(`final turns left: ${room.finalTurns}`);
        const player = room.players[socket.hash];
        console.log(`finalRoundNum: ${player.finalRoundNum}, rounds: ${rounds.length}`);
        if (parseInt(data.question, 10) === rounds[player.finalRoundNum].correctIndex) {
          console.log('correct!');
          player.finalRoundNum++;
          console.log(`finalRoundNum: ${player.finalRoundNum}, rounds: ${rounds.length}`);
        } else {
          room.finalTurns++;
          console.log(`final turns left: ${room.finalTurns}`);
        }
        if (player.finalRoundNum < rounds.length) {
            // console.log("correct index: "+rounds[player.finalRoundNum].correctIndex);
          /* if(data.question != rounds[player.finalRoundNum].correctIndex) {
              if(player.finalRoundNum > 0)player.finalRoundNum--;
              room.finalTurns++;
              console.log("failed, finalRoundNum: " + player.finalRoundNum);
              console.log("finalRoundNum: " + Object.keys(rounds));
          }*/

          const currentQuestion = rounds[player.finalRoundNum].question;
          const currentAnswers = rounds[player.finalRoundNum].answers;

                // Get authorless answers
          const choices = currentAnswers.map((answer) => answer.text);
          const progress = (player.finalRoundNum / rounds.length) * 100;
          console.log(`progress ${progress}`);
          const send = { newState: APP_STATES.SHOW_CHOICES,
            question: currentQuestion, answers: choices, hash, progress };
          socket.emit('changeState', send);
        } else {
          player.score += (Object.keys(room.players).length * 100) - (room.finalPlace * 100);
          room.finalPlace++;
        }
        if (room.finalTurns === 0) {
          console.log('final results');
          changeState(APP_STATES.FINAL_RESULT);
        }
      }
    });
    socket.on('submitAnswerText', (data) => {
      let same = true;
      console.log(`answer: ${data.answer}`);
      rounds[currentRound].answers.forEach((e) => {
        console.log(`same: ${e.text},${data.answer}`);
        if (e.text === data.answer || data.answer === '') {
          same = false;
        }
      });
      console.log(same);
      if (same) {
        const answer = new Answer(socket.hash, data.answer);
        rounds[currentRound].answers.push(answer);
        rounds[currentRound].unanswered++;
        if (rounds[currentRound].unanswered === room.numUsers) {
          changeState(APP_STATES.SHOW_CHOICES);
        } else {
              // Wait for other players to finish
          const send = { newState: APP_STATES.ROUND_WAIT };
          socket.emit('changeState', send);
        }
      }
    });
    socket.on('changeState', (data) => {
      changeState(data.newState);
    });

    socket.on('disconnect', () => {
      const room = rooms[socket.roomName];
      io.sockets.in(socket.roomName).emit('left', room.players[socket.hash]);
      console.log(`round num: ${currentState}`);

      delete room.players[socket.hash];
      room.numUsers--;
      if (currentState === 6) {
        rounds[currentRound].unanswered--;
        if (rounds[currentRound].unanswered <= 0) changeState(APP_STATES.ROUND_END);
      } else if (currentState === 4) {
        console.log(`unanswered: ${rounds[currentRound].unanswered}`);
        if (rounds[currentRound].unanswered >= room.numUsers) changeState(APP_STATES.SHOW_CHOICES);
      }

      // if the room is now empty, delete it
      if (room.numUsers <= 0) {
        delete rooms[socket.roomName];
      }


      socket.leave(socket.roomName);
    });
  });
};

module.exports.setupSockets = setupSockets;
