
class Room {
  constructor(name) {
    this.name = name;
    this.numUsers = 0;
    this.players = {};
  }
}

module.exports = Room;
