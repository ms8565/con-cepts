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

//Add new user to a room
const addUserToRoom = (sock) => {
  const socket = sock;
    
    const roomName = "room1";
    socket.roomName = roomName;
    rooms[roomName] = new Room(roomName);
  /*let added = false;

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
