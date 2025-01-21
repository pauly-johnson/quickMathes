const startButton = document.getElementById("start");
const operatorDisplay = document.querySelector(".operators");
const questionDisplay = document.querySelector(".questions");
const quizDisplay = document.querySelector(".quiz");
const resultsDisplay = document.querySelector(".resultsDisplay");
const questionsCorrect = document.getElementById("questionsCompleted");
const questionsTotal = document.getElementById("questionsTotal");
const messageDisplay = document.getElementById("messageDisplay");
const timerDisplay = document.getElementById("timerDisplay");

let operator = "";
let pram1 = 0;
let pram2 = 0;
let result = 0;
let numberOfQuestions = 0;
let questionsAttempted = 0;
let timer;
let timeElapsed = 0;

//reset quiz
document.getElementById("restart").addEventListener("click", () => {
  operatorDisplay.style.display = "block";
  resultsDisplay.style.display = "none";
  questionsAttempted = 0;
  questionsCorrect.innerHTML = 0;
  messageDisplay.innerHTML = "";
  clearInterval(timer);
  timerDisplay.innerHTML = "";
  timeElapsed = 0;
});

//select operator
document.querySelectorAll(".operator-btn").forEach((button) => {
  button.addEventListener("click", () => {
    operator = button.value;
    operatorDisplay.style.display = "none";
    questionDisplay.style.display = "block";
  });
});
//start quiz
document.getElementById("start").addEventListener("click", () => {
  if (parseFloat(document.getElementById("questionsNum").value) > 0) {
    quizDisplay.style.display = "block";
    questionDisplay.style.display = "none";
    numberOfQuestions = parseFloat(
      document.getElementById("questionsNum").value
    );
    questionsTotal.innerHTML = numberOfQuestions;
    questionsCorrect.innerHTML = 0;
    startTimer();
    generateQuestion();
  }
});
//generate question
function generateQuestion() {
  if (questionsAttempted === numberOfQuestions) {
    // alert("Quiz Completed");
    document.getElementById("timeTaken").innerHTML = `${timeElapsed} seconds`;
    quizDisplay.style.display = "none";
    resultsDisplay.style.display = "block";
    document.getElementById("correct").innerHTML = questionsCorrect.innerHTML;
    document.getElementById("incorrect").innerHTML =
      numberOfQuestions - parseFloat(questionsCorrect.innerHTML);
    document.getElementById("accuracy").innerHTML = `${(
      (parseFloat(questionsCorrect.innerHTML) / numberOfQuestions) *
      100
    ).toFixed(1)}%`;
    clearInterval(timer);
  } else {
    pram1 = Math.floor(Math.random() * 100);
    pram2 = Math.floor(Math.random() * 100);

    if (operator === "/") {
      while (
        pram1 % pram2 !== 0 ||
        pram1 === 0 ||
        pram2 === 0 ||
        pram1 < pram2
      ) {
        pram1 = Math.floor(Math.random() * 100);
        pram2 = Math.floor(Math.random() * 100);
      }
    } else if (operator === "-") {
      while (pram1 < pram2 || pram1 === 0 || pram2 === 0) {
        pram1 = Math.floor(Math.random() * 100);
        pram2 = Math.floor(Math.random() * 100);
      }
    } else if (operator === "*") {
      while (pram1 === 0 || pram2 === 0 || pram1 > 14) {
        pram1 = Math.floor(Math.random() * 100);
        pram2 = Math.floor(Math.random() * 100);
      }
    } else if (operator === "+") {
      while (pram1 === 0 || pram2 === 0) {
        pram1 = Math.floor(Math.random() * 100);
        pram2 = Math.floor(Math.random() * 100);
      }
    }
    document.querySelector(
      ".question"
    ).innerHTML = ` What is: ${pram1} ${operator} ${pram2} = ?`;
  }
}
//next question
document.getElementById("next").addEventListener("click", () => {
  checkResult();
  if (result === parseFloat(document.getElementById("userAnswer").value)) {
    questionsCorrect.innerHTML = parseFloat(questionsCorrect.innerHTML) + 1;
    messageDisplay.innerHTML = "Correct !!! Great work";
    questionsAttempted++;
    generateQuestion();
  } else {
    messageDisplay.innerHTML = "Incorrect !!! Good try";
    questionsAttempted++;
    generateQuestion();
  }
});
//check result
function checkResult() {
  if (operator === "+") {
    result = pram1 + pram2;
  } else if (operator === "-") {
    result = pram1 - pram2;
  } else if (operator === "*") {
    result = pram1 * pram2;
  } else if (operator === "/") {
    result = pram1 / pram2;
  }
}
// Timer
function startTimer() {
  timeElapsed = 0;
  timerDisplay.innerHTML = timeElapsed;
  timer = setInterval(() => {
    timeElapsed++;
    timerDisplay.innerHTML = timeElapsed;
  }, 1000);
}
