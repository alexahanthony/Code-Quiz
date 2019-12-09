var myHeading = document.body.querySelector(".myHeading");
var viewHighScores = document.body.querySelector(".btn");
var timeEl = document.body.querySelector(".time")
var questionPrompt = document.body.querySelector(".questions");
var optionsPrompt = document.body.querySelector(".options");
var answerPrompt = document.querySelector(".answers");

var secondsLeft = 0;
var nextQuestion = 0;
var currentAnswer = "";
var inputBox;
var timerInterval;
var scoreList = [];

//start quiz button
function quizBtn() {
  var aButton = document.createElement("button");
  aButton.textContent = "Start Quiz!";
  aButton.className = "quiz-button"
  questionPrompt.appendChild(aButton);
  aButton.addEventListener("click", function () { startQuiz() });
}
//clears page and starts timer at 75sec
function startQuiz() {
  // console.log("start quiz");
  myHeading.innerHTML = "";
  secondsLeft = 75;
  setTime();
  //askQuestions();
  renderQuestion();
}
//timer, counts down from 75 and when at 0, ends game
function setTime() {
  timerInterval = setInterval(function () {
    secondsLeft--;
    timeEl.textContent = ("Time: " + secondsLeft);

    if (secondsLeft <= 0) {
      endGame();
    }

  }, 1000);
}

//clears page and asks next question - using for loop
function renderQuestion() {
  if (nextQuestion >= myQuestions.length) {
    endGame();
  } else {
    questionPrompt.innerHTML = "";
    optionsPrompt.innerHTML = "";
    questionPrompt.textContent = myQuestions[nextQuestion].title;
    currentAnswer = myQuestions[nextQuestion].answer;
    // console.log(myQuestions[i].title);
    for (var i = 0; i < myQuestions[nextQuestion].choices.length; i++) {
      var li = document.createElement("ul");
      var button = document.createElement("button");
      button.textContent = myQuestions[nextQuestion].choices[i];
      li.appendChild(button);
      optionsPrompt.appendChild(li);
    }
  }
}
//end of quiz, clears page, presents user with done, score, initials
function endGame() {
  // var initials = prompt("You're done! Score: " + secondsLeft + " Please provide your initials here.");
  //clear page
  clearInterval(timerInterval);
  console.log("end game");
  console.log(questionPrompt);
  questionPrompt.innerHTML = "";
  optionsPrompt.innerHTML = "";
  answerPrompt.innerHTML = "";
  //header - All Done
  questionPrompt.textContent = "All Done!";
  //shows user score
  optionsPrompt.textContent = "Your final score is " + secondsLeft;
  //enter initials and submit
  answerPrompt.textContent = "Enter initials:";
  inputBox = document.createElement("input");
  answerPrompt.append(inputBox);
  var finalSubmit = document.createElement("button");
  finalSubmit.textContent = "Submit";
  answerPrompt.append(finalSubmit);
  renderScores();
}

//view high scores page
function highScores() {
  questionPrompt.innerHTML = "";
  optionsPrompt.innerHTML = "";
  answerPrompt.innerHTML = "";
  //header - Highscores
  questionPrompt.textContent = "Highscores";
  //show user list of scores
  answerPrompt.textContent = inputBox.value + " " + secondsLeft;
  var goBack = document.createElement("button");
  goBack.textContent = "Go Back";
  answerPrompt.appendChild (document.createElement("br"));
  answerPrompt.appendChild(goBack);
  var clearHighscores = document.createElement("button");
  clearHighscores.textContent = "Clear Highscores";
  answerPrompt.append(clearHighscores);
}

function reStartQuiz() {
  //defining timer top right
  timeEl.textContent = ("Time: " + secondsLeft);
  myHeading.textContent = "Coding Quiz"
  //defining text on page load
  questionPrompt.textContent = ("Try to answer the following code-related questins within the time limit. Keep in mind that incorrect answers will penalize your score by 15 seconds!")
  //call quiz start
  quizBtn();
  answerPrompt.innerHTML = "";
}


function renderScores() {
  // Clear scores
  optionsPrompt.innerHTML = "";
  // Render a new li for each score
  for (var i = 0; i < scoreList.length; i++) {
    var score = score[i];

    var li = document.createElement("li");
    li.textContent = score;
    optionsPrompt.appendChild(li);
  }
}

//main

reStartQuiz();

//add event listener for clicking on answers
optionsPrompt.addEventListener("click", function (event) {
  var element = event.target;
  if (element.matches("button") === true) {
    var answer = element.textContent;
    // console.log(answer);
    if (currentAnswer === answer) {
      // console.log("correct")
      answerPrompt.textContent = "correct!"
    } else {
      answerPrompt.textContent = "wrong!"
      secondsLeft = secondsLeft - 15;
    }
    console.log(nextQuestion);
    nextQuestion++;
    renderQuestion();
  }
})

//add event listener for final submit button
answerPrompt.addEventListener("click", function (event) {
  var element = event.target;
  if (element.matches("button") === true) {
    console.log(element.textContent);
    if (element.textContent == "Submit") {
      var initials = inputBox.value;
      localStorage.setItem("Highscore", initials +' '+ secondsLeft);
      console.log(localStorage.getItem(initials));
      highScores();
    } else if (element.textContent == "Go Back") {
      reStartQuiz();
      console.log("should restart");
    } else if ("Clear Highscores"){
      answerPrompt.innerHTML = "";
    }
  }
})



//add event listener to View High Scores
viewHighScores.addEventListener("click", function (event) {
  var element = event.target;
  highScores();
  // if (element.matches("button") === true) {
  // }
})