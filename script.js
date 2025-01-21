const startButton = document.getElementById("start");
const operatorDisplay = document.querySelector(".operators");
const questionDisplay = document.querySelector(".questions");
const quizDisplay = document.querySelector(".quiz");
const questionsCompleted = document.getElementById("questionsCompleted");
const questionsTotal = document.getElementById("questionsTotal");
const messageDisplay = document.getElementById('messageDisplay')

let operator = "";
let pram1 = 0;
let pram2 = 0;
let result = 0;
let numberOfQuestions = 0;

document.querySelectorAll(".operator-btn").forEach((button) => {
  button.addEventListener("click", () => {
    operator = button.value;
    operatorDisplay.style.display = "none";
    questionDisplay.style.display = "block";
  });
});

document.getElementById("start").addEventListener("click", () => {
  if (parseFloat(document.getElementById("questionsNum").value) > 0) {
    quizDisplay.style.display = "block";
    questionDisplay.style.display = "none";
    numberOfQuestions = parseFloat(
      document.getElementById("questionsNum").value
    );
    questionsTotal.innerHTML = numberOfQuestions;
    questionsCompleted.innerHTML = 0;

    generateQuestion();
  }
});

function generateQuestion() {
  pram1 = Math.floor(Math.random() * 100);
  pram2 = Math.floor(Math.random() * 100);
  
  document.querySelector(
    ".question"
  ).innerHTML = ` What is: ${pram1} ${operator} ${pram2} = ?`;
}

document.getElementById('next').addEventListener('click', () => {
  console.log(pram1, pram2);
  
  checkResult();
  if (result === parseFloat(document.getElementById('userAnswer').value)) {
  console.log(result);
  // alert('Correct!');
  questionsCompleted.innerHTML = parseFloat(questionsCompleted.innerHTML) + 1;
  messageDisplay.innerHTML = 'Correct !!! You are doing great';
  generateQuestion();
} else {
  // alert('Incorrect!');
  messageDisplay.innerHTML = 'Incorrect !!! Good try';
}
});

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

