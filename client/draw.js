//I hate myself, and this function
const drawCreateGame = () => {
  let contentBox = document.querySelector('#state-content');
  //Clear content box
  contentBox.innerHTML = "";
  
  let container = document.createElement("div");
  container.id = "create-form";
  

  
  
  //Game Room Name Form Group
  let formGroup1 = document.createElement("div");
  formGroup1.classList.add("form-group");
  //Game Room Name label
  let roomLabel = document.createElement("label");
  roomLabel.htmlFor = "roomName";
  roomLabel.innerText = "Game Room Name";
  //Game Room Name Text Field
  let roomName = document.createElement("INPUT");
  roomName.id = "roomName";
  roomName.type = "text";
  roomName.placeholder = "Room Name";
  roomName.classList.add("form-control");

  
  formGroup1.appendChild(roomLabel);
  formGroup1.appendChild(roomName);
  container.appendChild(formGroup1);
  
  //User Name Form Group
  let formGroup2 = document.createElement("div");
  formGroup2.classList.add("form-group");
  //User Name Name label
  let userLabel = document.createElement("label");
  userLabel.htmlFor = "userName";
  userLabel.innerText = "Your Name";
  //User Name Text Field
  let userName = document.createElement("INPUT");
  userName.id = "userName";
  userName.type = "text";
  userName.placeholder = "User Name";
  userName.classList.add("form-control");
  
  formGroup2.appendChild(userLabel);
  formGroup2.appendChild(userName);
  container.appendChild(formGroup2);
  
  
  let newQuestionsBox = document.createElement("div");
  newQuestionsBox.id = "new-questions";
  
  let addQABtn = document.createElement("BUTTON");
  addQABtn.classList.add("btn");
  addQABtn.classList.add("btn-default");
  addQABtn.classList.add("btn-custom");
  addQABtn.id = "addQABtn";
  addQABtn.addEventListener("click", addQA);
  addQABtn.innerHTML = "Add Question";
  
  newQuestionsBox.appendChild(addQABtn);
  
  // Name Help Span
  let helpSpan = document.createElement("span");
  helpSpan.id = "nameHelp";
  helpSpan.classList.add("help-block");
  helpSpan.innerHTML = "test span";
  
  let createBtn = document.createElement("BUTTON");
  createBtn.classList.add("btn");
  createBtn.classList.add("btn-lg");
  createBtn.classList.add("btn-custom");
  createBtn.classList.add("btn-block");
  createBtn.addEventListener("click", checkCreateRoom);
  createBtn.innerHTML = "Create and Join Game";
  
  container.appendChild(newQuestionsBox);
  container.appendChild(helpSpan);
  container.appendChild(createBtn);
  
  contentBox.appendChild(container);
  
  addQA();
};




const addQA = () => {
  let newQuestionBox = document.createElement("div");
  newQuestionBox.classList.add("new-qa");
  newQuestionBox.classList.add("well");
  newQuestionBox.classList.add("form-group");
  
  //Question label
  let questionLabel = document.createElement("label");
  questionLabel.htmlFor = "question-input"+document.getElementById("new-questions").childElementCount;
  questionLabel.innerText = "Question";
  questionLabel.classList.add("new-q-label");
  //Question textfield
  let question = document.createElement("textarea");
  question.innerHTML = "Write your new question";
  question.id = "question-input"+document.getElementById("new-questions").childElementCount;
  question.classList.add("new-question");
  question.classList.add("form-control");
  question.classList.rows = '3';
  
  
  //Answer label
  let answerLabel = document.createElement("label");
  answerLabel.htmlFor = "answers-input"+document.getElementById("new-questions").childElementCount;
  answerLabel.innerText = "Answer";

  //Answer textfield
  let answer = document.createElement("textarea");
  answer.innerHTML = "Write your new answer";
  answer.id = "answer-input"+document.getElementById("new-questions").childElementCount;
  answer.classList.add("new-answer");
  answer.classList.add("form-control");
  answer.classList.rows = '3';
  
  let deleteQABtn = document.createElement("BUTTON");
  deleteQABtn.classList.add("btn");
  deleteQABtn.classList.add("btn-danger");
  deleteQABtn.classList.add("btn-custom");
  deleteQABtn.addEventListener("click", function(){
    document.getElementById("new-questions").removeChild(newQuestionBox);
  });
  deleteQABtn.innerHTML = '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>';
  
  newQuestionBox.appendChild(questionLabel);
  newQuestionBox.appendChild(deleteQABtn);
  newQuestionBox.appendChild(question);
  newQuestionBox.appendChild(answerLabel);
  newQuestionBox.appendChild(answer);

  
  //Insert before "Add Question" button
  let addQABtn = document.getElementById("addQABtn")
    document.getElementById("new-questions").insertBefore(newQuestionBox, addQABtn);
};

const deleteQA = (element) => {
  //Remove "new-qa" div, which is parent of the deleteBtn
  //Have the "new-questions" div remove the "new-qa" div
  console.log('checkdelete');
  element.parentNode.removeChild(element);
};

const updateWaitingUsers = () => {
  let playerBox = document.getElementById("current-users");
  for(let i = 0; i < players.length; i++){
    let header = document.createElement("h4");
    header.appendChild(document.createTextNode(players[i].name));
    playerBox.appendChild(header);
  }
}
let test = 0;

const drawLoginWait = (roomName) => {
  console.log('test');
  let contentBox = document.querySelector('#state-content');
  //Clear content box
  contentBox.innerHTML = "";
  
  let header = document.createElement("h3");
  header.appendChild(document.createTextNode("Players in " + roomName));
  
  let playerBox = document.createElement("div");
  playerBox.id = "current-users";
  
  //Add start button
  let startBtn = document.createElement("BUTTON");
  startBtn.classList.add("btn");
  startBtn.classList.add("btn-lg");
  startBtn.classList.add("btn-custom");
  startBtn.addEventListener("click",onStartClick);
  startBtn.innerHTML = "START GAME";
  
  contentBox.appendChild(header);
  contentBox.appendChild(playerBox);
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
  submitBtn.classList.add("btn-custom");
  submitBtn.addEventListener("click",onAnswerSubmit);
  submitBtn.innerHTML = "SUBMIT";
  answersElement.appendChild(submitBtn);
  
  contentBox.appendChild(answersElement);
};

//Display waiting screen while other players answer
const drawRoundWait = () => {
  let contentBox = document.querySelector('#answers');
    let content = document.querySelector('#state-content');
    if(contentBox == null){
        let answersElement = document.createElement("div");
        answersElement.setAttribute("id", "answers");
        content.appendChild(answersElement);
        contentBox = document.querySelector('#answers');
    }
    if(document.querySelector(".loader") == null){
    let wheel = document.createElement("div");
    wheel.setAttribute("class", "loader");
    content.appendChild(wheel);
    }
  contentBox.innerHTML = "PLEASE WAIT FOR ROUND TO FINISH";
};

//Display submitted choices and allow player to choose one
const drawShowChoices = (data) => {
    if(document.querySelector(".loader") != null){
    document.querySelector(".loader").setAttribute("class", "");
    }
  //add question
    var question = data.question;
    var answers = data.answers;
  let questionElement = document.querySelector('#question');
    questionElement.innerHTML = question;
    
  //Add all of the answer buttons
  let answersElement = document.querySelector('#answers');
  answersElement.innerHTML = "";
  
  for(let i = 0; i < answers.length; i++){
    let answerBtn = document.createElement("BUTTON");
    
    //Create styling
    answerBtn.classList.add("btn");
    answerBtn.classList.add("btn-lg");
    answerBtn.classList.add("btn-custom");
    answerBtn.classList.add("answer-btn");
    
    answerBtn.innerHTML = answers[i];
    answerBtn.value = i;
    
    answerBtn.addEventListener("click",onAnswerClick);
    
    answersElement.appendChild(answerBtn);
  }
    
    //final round progress
    /*let progWrap;
    let progBar;
    if(data.progress != null){
        if(document.querySelector(".progress") == null){
        let content = document.querySelector('#state-content');
        let progWrap = document.createElement("div");
        progWrap.classList.add("progress");
        let progBar = document.createElement("div");
        progBar.classList.add("progress-bar");
        progBar.setAttribute("role", "progressbar");
        }
        else{
            progWrap = document.querySelector(".progress");
            progBar = document.querySelector(".progress-bar");
        }

        progBar.style.width = data.progress+"%";
        progWrap.appendChild(progBar);
        content.appendChild(progWrap);

    }*/
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
const drawGameEnd = (players) => {
  let questionElement = document.querySelector('#question');
  questionElement.innerHTML = "FINAL RESULTS";
    let answersElement = document.querySelector('#answers');
    answersElement.innerHTML = "";
  
  console.log('players: '+JSON.stringify(players));
  const keys = Object.keys(players);
  for(let i = 0; i < keys.length; i++){
    let player = players[keys[i]];
    answersElement.innerHTML += "<h4>"+player.hash+": "+player.score+" points</h4>";
  }
};

//looping with requestAnimationFrame
const drawContinuous = (time) => {
  
  //call next animation frame
  animationFrame = requestAnimationFrame(draw);
}