'use strict';
class Room {
  constructor(name) {
    this.name = name;
    this.numUsers = 0;
    this.players = {};
    this.finalPlace = 0; //what the places in the final round are
    this.finalTurns = 0; //how many turns in the final round
  }
}

module.exports = Room;
