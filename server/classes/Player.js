

// Player class
class Player {
  constructor(hash) {
    this.hash = hash; // character's unique id

    // last time this character was updated
    this.lastUpdate = new Date().getTime();
  }
}

module.exports = Player;
