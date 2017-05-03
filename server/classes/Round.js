
class Round {


  constructor(question, answer) {
    this.question = question;
    this.correctAnswer = answer;
    this.correctIndex = 0;
    this.answers = [];
    this.unanswered = 0;//number of players yet to answer
  }
}

/* const sortAnswers = (round) => {
  // shuffle(round.answers);

  // insert correct answer at random index
  // round.correctIndex = Math.floor(Math.random() * round.answers.length);
  // const newAnswer = new Answer("RIGHT ANSWER", round.correctAnswer);
  // round.answers.splice(round.correctIndex, 0, round.newAnswer);
};

// https://github.com/Daplie/knuth-shuffle
// Fisher Yates shuffle
const shuffle = (array) => {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};*/


module.exports = Round;
// module.exports.sortAnswers = sortAnswers;
