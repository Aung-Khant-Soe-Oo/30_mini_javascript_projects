const questions = [
  {
    question: "Which is largest animal in the world?",
    answers: [
      { text: "Shark", correct: false },
      { text: "Blue Whale", correct: true },
      { text: "Elephant", correct: false },
      { text: "Giraffe", correct: false },
    ],
  },
  {
    question: "Which is smallest continent in the world?",
    answers: [
      { text: "Asia", correct: false },
      { text: "Australia", correct: true },
      { text: "Arctic", correct: false },
      { text: "Africa", correct: false },
    ],
  },
];

const quesElement = document.getElementById("question");
const ansBtn = document.getElementById("answer-btn");
const nextBtn = document.getElementById("next");

let currentQuesIndex = 0;
let score = 0;

const startQuiz = () => {
  currentQuesIndex = 0;
  score = 0;
  nextBtn.innerHTML = "Next";
  showQuestion();
};

const showQuestion = () => {
  resetState();
  let currentQuestion = questions[currentQuesIndex];
  let questionNo = currentQuesIndex + 1;
  quesElement.innerHTML = questionNo + "." + currentQuestion.question;
  currentQuestion.answers.forEach((ans) => {
    const button = document.createElement("button");
    button.innerHTML = ans.text;
    button.classList.add("btn");
    ansBtn.appendChild(button);
    if (ans.correct) {
      button.dataset.correct = ans.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
};

const selectAnswer = (e) => {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(ansBtn.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextBtn.style.display = "block";
};

const resetState = () => {
  nextBtn.style.display = "none";
  while (ansBtn.firstChild) {
    ansBtn.removeChild(ansBtn.firstChild);
  }
};

const showScore = () => {
  resetState();
  quesElement.innerText = `You scored ${score} out of ${questions.length} !`;
  nextBtn.innerHTML = "Play Again";
  nextBtn.style.display = "block";
};

const handleNext = () => {
  currentQuesIndex++;
  if (currentQuesIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
};
nextBtn.addEventListener("click", () => {
  if (currentQuesIndex < questions.length) {
    handleNext();
  } else {
    startQuiz();
  }
});

startQuiz();
