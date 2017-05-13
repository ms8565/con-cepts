
// Player class
const Player = require('./Player.js');

class Room {
  constructor(name) {
    this.name = name;
    this.numUsers = 0;
    this.players = {};
    this.randNums = []; // random number array for final round
    this.finalPlace = 0; // what the places in the final round are
    this.finalTurns = 0; // how many turns in the final round
  }
}
const addUser = (sock, room) => {
  const socket = sock;
  socket.join(room);
  room.players[socket.hash] = new Player(socket.hash);
  room.numUsers += 1;
}
const removeUser = (sock, room) => {
  const socket = sock;
  socket.leave(room);
  
  delete players[socket.hash];

  if (room.numUsers <= 0) {
    return true;
  }
  return false;
}

module.exports = Room;
module.exports.addUser = addUser;
module.exports.removeUser = removeUser;
