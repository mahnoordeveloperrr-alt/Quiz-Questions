const AllQuestions = [
    {
        question: "What is the capital of Canada?",
        answers: [
            { text: "Toronto", correct: false },
            { text: "Vancouver", correct: false },
            { text: "Ottawa", correct: true },
            { text: "Montreal", correct: false },
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Venus", correct: false },
            { text: "Saturn", correct: false },
            { text: "Jupiter", correct: false },
            { text: "Mars", correct: true },
        ]
    },
    {
        question: "Who wrote the play Romeo and Juliet?",
        answers: [
            { text: "Charles Dickens", correct: false },
            { text: "William Shakespeare", correct: true },
            { text: "Mark Twain", correct: false },
            { text: "J.K. Rowling", correct: false },
        ]
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: [
            { text: "Pacific Ocean", correct: true },
            { text: "Indian Ocean", correct: false },
            { text: "Arctic Ocean", correct: false },
            { text: "Atlantic Ocean", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answersBtn = document.getElementById("answers-button");
const nextBtn = document.getElementById("next");
const errorMessage = document.getElementById("error-message"); // new element

let currentQuestionIndex = 0;
let score = 0;

// Start the quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

// Display current question and its answers
function showQuestion() {
    resetState(); // clear previous answers and hide next button
    let currentQuestion = AllQuestions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answersBtn.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);
    });
}

// Reset to initial state for a new question
function resetState() {
    // Hide next button and error message
    nextBtn.style.display = "none";
    errorMessage.style.display = "none";
    errorMessage.innerHTML = "";

    // Remove all answer buttons
    while (answersBtn.firstChild) {
        answersBtn.removeChild(answersBtn.firstChild);
    }
}

// Handle answer selection
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    // Disable all buttons so user cannot change answer
    Array.from(answersBtn.children).forEach(button => {
        button.disabled = true;
        // Highlight the correct answer (green)
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
    });

    // Style the selected button
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++; // increase score for correct answer
        errorMessage.style.display = "none"; // no error if correct
    } else {
        selectedBtn.classList.add("incorrect");
        // Show error message
        errorMessage.style.display = "block";
        errorMessage.innerHTML = "❌ Wrong answer! The correct answer is highlighted.";
    }

    // Show next button after an answer is chosen
    nextBtn.style.display = "block";
}

// Move to next question
function handleNext() {
    // Check if an answer was selected (buttons are disabled after selection)
    const anyButtonDisabled = Array.from(answersBtn.children).some(btn => btn.disabled);
    if (!anyButtonDisabled) {
        // No answer selected – show error and prevent moving forward
        errorMessage.style.display = "block";
        errorMessage.innerHTML = "Please select an answer first!";
        return;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < AllQuestions.length) {
        showQuestion();
    } else {
        // Quiz finished – show score and restart
        alert(`Quiz Completed! Your score: ${score}/${AllQuestions.length}`);
        startQuiz();
    }
}

// Event listener for next button
nextBtn.addEventListener("click", handleNext);

// Start the quiz when page loads
startQuiz();
