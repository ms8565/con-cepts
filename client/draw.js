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
    console.log("contentBox: " + answersElement);
  
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
  let contentBox = document.querySelector('#answers');
    if(contentBox == null){
        let content = document.querySelector('#state-content');
        let answersElement = document.createElement("div");
        answersElement.setAttribute("id", "answers");
        content.appendChild(answersElement);
        contentBox = document.querySelector('#answers');
    }
  contentBox.innerHTML = "PLEASE WAIT FOR ROUND TO FINISH";
};

//Display submitted choices and allow player to choose one
const drawShowChoices = (question, answers) => {
  
  //Add all of the answer buttons
  let answersElement = document.querySelector('#answers');
  answersElement.innerHTML = "";
  
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
  
};

//Display correct answer and player points
const drawRoundEnd = (answers, players) => {
  let answersElement = document.querySelector('#answers');
  answersElement.innerHTML = "";
  
  for(let i = 0; i < answers.length; i++){
    let answerSection = document.createElement("div");
    answerSection.innerHTML += "<h4>"+answers[i].text+"</h4>";
    answerSection.innerHTML += "<p>"+answers[i].author+"</p>"
    answersElement.appendChild(answerSection);
    
  }
  answersElement.innerHTML+="<hr/>";
  
  console.log('players: '+JSON.stringify(players));
  const keys = Object.keys(players);
  for(let i = 0; i < keys.length; i++){
    let player = players[keys[i]];
    answersElement.innerHTML += "<h4>"+player.hash+": "+player.score+" points</h4>";
  }
};

//Display player point totals
const drawGameEnd = () => {
  
};

//looping with requestAnimationFrame
const drawContinuous = (time) => {
  
  //call next animation frame
  animationFrame = requestAnimationFrame(draw);
}