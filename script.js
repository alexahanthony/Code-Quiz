var myHeading = document.body.querySelector(".myHeading");
var viewHighScores = document.body.querySelector(".button");
var timeEl = document.body.querySelector(".time")
var questionPrompt = document.body.querySelector(".questions");
var optionsPrompt = document.body.querySelector(".options");
var answerPrompt = document.querySelector(".answers");

var secondsLeft = 0;
var nextQuestion = 0;
var currentAnswer = "";

function quizBtn () {
  var aButton = document.createElement("button");
  aButton.textContent = "Start Quiz!";
  aButton.className = "quiz-button"
  questionPrompt.appendChild(aButton);
  aButton.addEventListener("click", function(){startQuiz()});
}

function startQuiz () {
  // console.log("start quiz");
  myHeading.innerHTML = "";
  secondsLeft = 75;
  setTime();
  //askQuestions();
  renderQuestion();
}


function setTime() {
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = ("Time: " + secondsLeft);

    if(secondsLeft === 0) {
      clearInterval(timerInterval);
      endGame();
    }

  }, 1000);
}

// function askQuestions() {
//   // console.log(myQuestions)
//   for (var i = 0; i < myQuestions.length; i++) {
//     renderQuestion(i);
//   }
// }

function renderQuestion() {
  if(nextQuestion >= myQuestions.length) {
    endGame();
  }
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

function endGame() {
alert("You're done!");
}


//
//
//main
//
//

timeEl.textContent = ("Time: " + secondsLeft);
questionPrompt.textContent = ("Try to answer the following code-related questins within the time limit. Keep in mind that incorrect answers will penalize your score by 15 seconds!")
quizBtn();

optionsPrompt.addEventListener("click", function(event) {
  var element = event.target;
  if (element.matches("button")===true) {
    var answer = element.textContent;
    console.log(answer);
    if(currentAnswer===answer) {
      // console.log("correct")
      answerPrompt.textContent = "correct!"
    } else {
      answerPrompt.textContent = "wrong!"
    }
    console.log(nextQuestion);
    nextQuestion++;
    renderQuestion();
  }
})
