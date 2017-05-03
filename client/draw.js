const drawLoginWait = () => {
  console.log('test');
  let contentBox = document.querySelector('#state-content');
  //Clear content box
  contentBox.innerHTML = "";
  
  //Add start button
  let startBtn = document.createElement("BUTTON");
  startBtn.classList.add("btn");
  startBtn.classList.add("btn-lg");
  startBtn.addEventListener("click",onStartClick);
  startBtn.innerHTML = "START GAME";
  
  contentBox.appendChild(startBtn);
};

//Display onboarding information and game rules
const drawGameStart = () => {
  let contentBox = document.querySelector('#state-content');
  //Clear content box
  contentBox.innerHTML = "GAME IS ABOUT TO START";
};

//Display initial question and text prompt
const drawRoundStart = (question) => {
  let contentBox = document.querySelector('#state-content');
  //Clear content box
  contentBox.innerHTML = "";
  
  //Add the question
  let questionElement = document.createElement("H3");
  questionElement.setAttribute("id", "question");
  let questionText = document.createTextNode(question);
  questionElement.appendChild(questionText);
  contentBox.appendChild(questionElement);
  
  //Add answer section
  let answersElement = document.createElement("div");
  answersElement.setAttribute("id", "answers");
  
  //Add text box
  let textElement = document.createElement("input");
  textElement.type = "text";
  textElement.setAttribute("id", "answer-input");
  answersElement.appendChild(textElement);
  
  //Add submit button
  let submitBtn = document.createElement("BUTTON");
  submitBtn.classList.add("btn");
  submitBtn.classList.add("btn-lg");
  submitBtn.addEventListener("click",onAnswerSubmit);
  submitBtn.innerHTML = "SUBMIT";
  answersElement.appendChild(submitBtn);
  
  contentBox.appendChild(answersElement);
};

//Display waiting screen while other players answer
const drawRoundWait = () => {
  let contentBox = document.querySelector('#state-content');
  //Clear content box
  contentBox.innerHTML = "PLEASE WAIT FOR ROUND TO FINISH";
};

//Display submitted choices and allow player to choose one
const drawShowChoices = (question, answers) => {
  
  let contentBox = document.querySelector('#state-content');
  //Clear content box
  contentBox.innerHTML = "";
  
  //Add the question
  let questionElement = document.createElement("H3");
  questionElement.setAttribute("id", "question");
  let questionText = document.createTextNode(question);
  questionElement.appendChild(questionText);
  contentBox.appendChild(questionElement);
  
  //Add all of the answer buttons
  let answersElement = document.createElement("div");
  answersElement.setAttribute("id", "answers");
  
  for(let i = 0; i < answers.length; i++){
    let answerBtn = document.createElement("BUTTON");
    
    //Create styling
    answerBtn.classList.add("btn");
    answerBtn.classList.add("btn-lg");
    answerBtn.classList.add("answer-btn");
    
    answerBtn.innerHTML = answers[i];
    answerBtn.value = i;
    
    answerBtn.addEventListener("click",onAnswerClick);
    
    answersElement.appendChild(answerBtn);
  }
  
  //Add answers box to content box
  contentBox.appendChild(answersElement);
};

//Display correct answer and player points
const drawRoundEnd = () => {
  
};

//Display player point totals
const drawGameEnd = () => {
  
};

//looping with requestAnimationFrame
const drawContinuous = (time) => {
  
  //call next animation frame
  animationFrame = requestAnimationFrame(draw);
}