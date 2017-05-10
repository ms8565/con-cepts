

// Player class
class Player {
  constructor(hash) {
    this.hash = hash; // character's unique id

    this.score = 0;// player score

    // last time this character was updated
    this.lastUpdate = new Date().getTime();

    // random number array for final round
    this.randNums = [];
  }
}

module.exports = Player;
