const startButton = document.getElementById("start");
const operatorDisplay = document.querySelector(".operators");
const questionDisplay = document.querySelector(".questions");
const quizDisplay = document.querySelector(".quiz");
const resultsDisplay = document.querySelector(".resultsDisplay");
const questionsCorrect = document.getElementById("questionsCompleted");
const questionsTotal = document.getElementById("questionsTotal");
const messageDisplay = document.getElementById("messageDisplay");
const timerDisplay = document.getElementById("timerDisplay");
const userAnswerInput = document.getElementById("userAnswer");
const difficultyDisplay = document.querySelector(".difficulty");

let operator = "";
let pram1 = 0;
let pram2 = 0;
let result = 0;
let numberOfQuestions = 0;
let questionsAttempted = 0;
let timer;
let timeLeft = 5;
let difficulty = "hard";

async function saveScore(score) {
  try {
    const response = await fetch('/.netlify/functions/save-score', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(score),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data.message);
  } catch (error) {
    console.error('Error saving score:', error);
  }
}

//reset quiz
document.getElementById("restart").addEventListener("click", () => {
  difficultyDisplay.style.display = "flex";
  resultsDisplay.style.display = "none";
  questionsAttempted = 0;
  questionsCorrect.innerHTML = 0;
  messageDisplay.innerHTML = "";
  clearInterval(timer);
  timerDisplay.innerHTML = "";
  timeLeft = 5;
});

//select operator
document.querySelectorAll(".operator-btn").forEach((button) => {
  button.addEventListener("click", () => {
    operator = button.value;
    operatorDisplay.style.display = "none";
    questionDisplay.style.display = "flex";
  });
});

//select difficulty
document.querySelectorAll(".difficulty-btn").forEach((button) => {
  button.addEventListener("click", () => {
    difficulty = button.value;
    difficultyDisplay.style.display = "none";
    operatorDisplay.style.display = "flex";
  });
});

//start quiz
document.getElementById("start").addEventListener("click", () => {
  if (parseFloat(document.getElementById("questionsNum").value) > 0) {
    quizDisplay.style.display = "flex";
    questionDisplay.style.display = "none";
    numberOfQuestions = parseFloat(
      document.getElementById("questionsNum").value
    );
    questionsTotal.innerHTML = numberOfQuestions;
    questionsCorrect.innerHTML = 0;
    document.getElementById("questionsNum").value = "";
    generateQuestion();
  } else {
    alert("Please enter a valid number of questions");
    document.getElementById("questionsNum").value = "";
  }
});
//generate question
function generateQuestion() {
  if (questionsAttempted === numberOfQuestions) {
    // alert("Quiz Completed");
    quizDisplay.style.display = "none";
    resultsDisplay.style.display = "flex";
    messageDisplay.innerHTML = "";
    document.getElementById("correct").innerHTML = questionsCorrect.innerHTML;
    document.getElementById("incorrect").innerHTML =
      numberOfQuestions - parseFloat(questionsCorrect.innerHTML);
    document.getElementById("accuracy").innerHTML = `${(
      (parseFloat(questionsCorrect.innerHTML) / numberOfQuestions) *
      100
    ).toFixed(0)}%`;
    document.getElementById("level").innerHTML = difficulty;

// Save the score
const score = {
  user: 'John Doe', // Replace with actual user data if available
  correctAnswers: parseFloat(questionsCorrect.innerHTML),
  totalQuestions: numberOfQuestions,
  accuracy: `${(
    (parseFloat(questionsCorrect.innerHTML) / numberOfQuestions) *
    100
  ).toFixed(1)}%`,
};

saveScore(score);

console.log(score);


    clearInterval(timer);
  } else {
    pram1 = Math.floor(Math.random() * 100);
    pram2 = Math.floor(Math.random() * 100);
    startTimer();

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
      while (pram1 < pram2 || pram1 === 0 || pram2 === 0 || pram1 === pram2) {
        pram1 = Math.floor(Math.random() * 100);
        pram2 = Math.floor(Math.random() * 100);
      }
    } else if (operator === "*") {
      while (
        pram1 === 0 ||
        pram2 === 0 ||
        pram1 > 13 ||
        pram2 > 13 ||
        pram1 === 1
      ) {
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
function handleNextQuestion() {
  checkResult();
  console.log(result, parseFloat(userAnswerInput.value));

  if (result === parseFloat(userAnswerInput.value)) {
    questionsCorrect.innerHTML = parseFloat(questionsCorrect.innerHTML) + 1;
    messageDisplay.innerHTML = "Correct !!! Great work";
  } else {
    messageDisplay.innerHTML = "Incorrect !!! Good try";
  }
  questionsAttempted++;
  generateQuestion();
}

document.getElementById("next").addEventListener("click", () => {
  handleNextQuestion();
  userAnswerInput.value = "";
});
userAnswerInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleNextQuestion();
    userAnswerInput.value = "";
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
  timeLeft = getTimeForDifficulty(difficulty);
  timerDisplay.innerHTML = timeLeft;
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.innerHTML = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      handleNextQuestion();
    }
  }, 1000);
}

//difficulty
function getTimeForDifficulty(difficulty) {
  switch (difficulty) {
    case "really-easy":
      return 20;
    case "easy":
      return 10;
    case "medium":
      return 8;
    case "hard":
      return 5;
    default:
      return 5;
  }
}
