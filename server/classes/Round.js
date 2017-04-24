class Round {
  constructor(quest, answers, players, correctAns) {
    this.quest = quest;
    this.answers = answers;
    this.ansNum = 1;
    this.correctAns = correctAns;
    this.players = players;
  }
}

module.exports = Answer;
