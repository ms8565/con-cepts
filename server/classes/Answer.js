

class Answer {
  constructor(author, text) {
    this.author = author;
    this.text = text;
    this.pickedBy = [];
  }
}

/* const getAnswerValues = () => {
  var doubles = numbers.map(function(answer) {
  return answer.text;
});
};*/


module.exports = Answer;
