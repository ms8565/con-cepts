
const demoQuest = ['', '', ''];
const demoAns = ['', '', ''];

class Round {


  constructor(answers, players) {
    const questNum = Math.floor(Math.random * 4);
    this.quest = demoQuest[questNum];
    this.answers = answers;
    this.ansNum = questNum;
    this.correctAns = demoAns[questNum];
    this.players = players;
  }
}

module.exports = Round;
