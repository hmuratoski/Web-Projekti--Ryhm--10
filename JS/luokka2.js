

// Array of Objects ---------------------------------------------------------------------------------------------------------------------------------------
const quiz = [
    {
        q:'Mikä on Suomen korkein huippu?',
        options: ['halti','saana','harju','iso-malla'],
        answer:0
    },
    {
        q:'Mikä maa on Suomen lähin länsinaapuri?',
        options: ['norja','ahvenanmaa','viro','ruotsi'],
        answer:3
    },
    {
        q:'Mikä on Suomen isoin järvi?',
        options: ['saimaa','inarijärvi','pihlajavesi','päijänne'],
        answer:0
    },
    {
        q:'Montako järveä Suomessa noin suurinpiirtein on?',
        options: ['n. 150 000','n. 190 000','n. 240 000','n. 120 000'],
        answer:1
    },
    {
        q:'Mikä näistä ei ole Suomessa sijaitseva kaupunki?',
        options: ['helsinki','rovaniemi','oulu','pietari'],
        answer:3
    }
]
// ------------------------------------------------------------------------------------------------------------------------------------------------------

const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;

// Push the questions into availableQuestions array ----------------------------------------------------------------------------------------------------
function setAvailableQuestions() {
    const totalQuestion = quiz.length;
    for (let i=0; i<totalQuestion; i++) {
        availableQuestions.push(quiz[i])
    }
}

// Set question number, question and options -----------------------------------------------------------------------------------------------------------
function getNewQuestion() {
    // Question number
    questionNumber.innerHTML = "Kysymys " + (questionCounter + 1) + " / " + quiz.length;
    
    // Question text
    // Get random question
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;
    // Get the position of 'questionIndex' from the availableQuestion array 
    const index1 = availableQuestions.indexOf(questionIndex);
    // Remove the 'questionIndex' from the availableQuestion array, so that the question doesn't repeat 
    availableQuestions.splice(index1,1);

    // Set options
    // Get the length of options
    const optionLen = currentQuestion.options.length;
    // Push options into availableOptions 
    for (let i=0; i<optionLen; i++) {
        availableOptions.push(i);
    }

    optionContainer.innerHTML = '';
    let animationDelay = 0.15;
    // Create options in HTML
    for (let i=0; i<optionLen; i++) {
        // Random option
        const optonIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
        // Get the position of 'optionIndex' from the availableOptions 
        const index2 = availableOptions.indexOf(optonIndex);
        // Remove the 'optionIndex' from the availableOptions, so that the option does not repeat
        availableOptions.splice(index2,1);
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optonIndex];
        option.id = optonIndex;
        option.style.animationDelay = animationDelay + 's' ;
        animationDelay = animationDelay + 0.15;
        option.className = "option";
        optionContainer.appendChild(option);
        option.setAttribute("onclick","getResult(this)");
    }

    questionCounter++
}

// Get the result of current question ----------------------------------------------------------------------------------------------------------------------------
function getResult(element){
    const id = parseInt(element.id);
    // Get the answer by comparing the id of clicked option
    if (id === currentQuestion.answer) {
        // Set the green color to the correct option
        element.classList.add("correct");
        // Add a mark for a correct answer
        updateAnswerIndicator("correct");
        correctAnswers++;
        console.log("correct"+correctAnswers)
    }
    else {
        // Set the red colo to the wrong option
        element.classList.add("wrong");
        // Add a mark for a wrong answer
        updateAnswerIndicator("wrong");
        // Show the correct answer after a wrong answer
        const optionLen = optionContainer.children.length;
        for (let i=0; i<optionLen; i++) {
            if(parseInt(optionContainer.children[i].id) === currentQuestion.answer) {
                optionContainer.children[i].classList.add("correct");
            }
        }
    }

    attempt++;
    unclickableOptions();
}

// Make all the options unclickable once the user selects an option (NO ANSWER CHANGING) --------------------------------------------------------------------------
function unclickableOptions() {
    const optionLen = optionContainer.children.length;
    for (let i=0; i<optionLen; i++) {
        optionContainer.children[i].classList.add("already-answered");
    }
}

function answersIndicator() {
    answersIndicatorContainer.innerHTML = '';
    const totalQuestion = quiz.length;
    for (let i=0; i<totalQuestion; i++) {
        const indicator = document.createElement("div");
        answersIndicatorContainer.appendChild(indicator);
    }
}

function updateAnswerIndicator(markType) {
    answersIndicatorContainer.children[questionCounter-1].classList.add(markType);
}

function next() {
    if (questionCounter === quiz.length) {
        console.log("quiz over")
        quizOver();
    }
    else {
        getNewQuestion();
    }
}

function quizOver() {
    // Hide quizBox
    quizBox.classList.add("hide");
    // Show result box
    resultBox.classList.remove("hide");
    quizResult();

}

// Get the quiz result --------------------------------------------------------------------------------------------------------------------------------------------
function quizResult() {
    resultBox.querySelector(".total-question").innerHTML = quiz.length;
    resultBox.querySelector(".total-attempt").innerHTML = attempt;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
    const percentage = (correctAnswers/quiz.length)*100;
    resultBox.querySelector(".percentage").innerHTML = percentage.toFixed(2) + "%";
    resultBox.querySelector(".total-score").innerHTML = correctAnswers + " / " + quiz.length;
}

function resetQuiz() {
    questionCounter = 0;
    correctAnswers = 0;
    attempt = 0;
}

function tryAgainQuiz() {
    // Hide the resultBox
    resultBox.classList.add("hide");
    // Show the quizBox
    quizBox.classList.remove("hide");
    resetQuiz();
    startQuiz();
}

function goToHome() {
    // Hide resultBox
    resultBox.classList.add("hide");
    // Show homeBox
    homeBox.classList.remove("hide");
    resetQuiz();
}

// ALOITUS --------------------------------------------------------------------------------------------------------------------------------------------------------

function startQuiz() {

    // Hide homeBox
    homeBox.classList.add("hide");
    // Show quizBox
    quizBox.classList.remove("hide");
    // First we will set all questions in availableQuestions array
    setAvailableQuestions();
    // Then we will call getNewQuestion(); function
    getNewQuestion();
    // To create indicator of answers
    answersIndicator();
}