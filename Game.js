
const questions = {
    easy: [
        { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correct: 1 },
        { question: "What color is the sky?", options: ["Blue", "Green", "Red", "Yellow"], correct: 0 },
        { question: "Which HTML tag is used to define an unordered list?", options: ["<ul>", "<ol>", "<li>", "<list>"], correct: 0 },
        { question: "Which property is used in CSS to change the background color of an element?", options: ["color", "background", "background-color", "border-color"], correct: 2 },
        { question: "Which HTML tag is used to display a line break?", options: ["<br>", "<hr>", "<p>", "<div>"], correct: 0 },
    ],
    medium: [
        { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], correct: 2 },
        { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Saturn"], correct: 1 },
        { question: "Which method is used to add an event listener to a DOM element in JavaScript?", options: ["addEventListener()", "attachEvent()", "onClick()", "setEvent()"], correct: 0 },
        { question: "Which JavaScript method is used to parse a string and convert it into an integer?", options: ["parseInt()", "toInteger()", "parseNumber()", "convertToInt()"], correct: 0 },
        { question: "What is the hardest natural substance on Earth?", options: ["Gold", "Iron", "Diamond", "Platinum"], correct: 2 },
    ],
    hard: [
        { question: "What is the square root of 144?", options: ["10", "12", "14", "16"], correct: 1 },
        { question: "How do you pass data to a child component in React?", options: ["Using props", "Using state", "Using context", "Using localStorage"], correct: 0 },
        { question: "What does JSX stand for in React?", options: ["JavaScript Extension", "JavaScript XML", "JavaScript XHR", "JavaScript eXtension"], correct: 1 },
        { question: "Which of the following is used to manage global state in React?", options: ["useState", "useEffect", "useContext", "useReducer"], correct: 2 },
        { question: "What is the default return value of a React component that does not return anything?", options: ["null", "undefined", "false", "[]"], correct: 0 },
    ],
};

let currentDifficulty = null;
let currentQuestionIndex = 0;
let score = 0;

const difficultySelection = document.getElementById("difficulty-selection");
const quizInterface = document.getElementById("quiz-interface");
const results = document.getElementById("results");

const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");

const nextQuestionButton = document.getElementById("next-question");
const scoreDisplay = document.getElementById("score");
const restartButton = document.getElementById("restart");


difficultySelection.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        currentDifficulty = e.target.dataset.difficulty;
        startQuiz();
    }
});

function startQuiz() {
    difficultySelection.style.display = "none";
    quizInterface.style.display = "block";
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion();
}

function loadQuestion() {
    const questionsList = questions[currentDifficulty];
    const currentQuestion = questionsList[currentQuestionIndex];
    questionNumber.textContent = `Question ${currentQuestionIndex + 1} of ${questionsList.length}`;
    questionText.textContent = currentQuestion.question;
    optionsContainer.innerHTML = "";

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.addEventListener("click", () => handleAnswer(index));
        optionsContainer.appendChild(button);
    });
    nextQuestionButton.disabled = true;
}

function handleAnswer(selectedIndex) {
    const questionsList = questions[currentDifficulty];
    const currentQuestion = questionsList[currentQuestionIndex];
    const buttons = optionsContainer.querySelectorAll("button");

    buttons.forEach((button, index) => {
        button.disabled = true;
        if (index === currentQuestion.correct) {
            button.style.backgroundColor = "green";
        } else if (index === selectedIndex) {
            button.style.backgroundColor = "red";
        }
    });

    if (selectedIndex === currentQuestion.correct) {
        score++;
    }
    nextQuestionButton.disabled = false;
}

nextQuestionButton.addEventListener("click", () => {
    currentQuestionIndex++;
    const questionsList = questions[currentDifficulty];
    if (currentQuestionIndex < questionsList.length) {
        loadQuestion();
    } else {
        endQuiz();
    }
});

function endQuiz() {
    quizInterface.style.display = "none";
    results.style.display = "block";
    scoreDisplay.textContent = `You scored ${score} out of ${questions[currentDifficulty].length}`;
}

restartButton.addEventListener("click", () => {
    results.style.display = "none";
    difficultySelection.style.display = "block";
});
