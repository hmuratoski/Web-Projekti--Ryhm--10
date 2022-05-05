const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Käynistä uudelleen'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [ 

        {
          question: 'Mikä on Suomen pääkaupunki',
          answers: [
            { text: 'Helsinki', correct: true },
            { text: 'Tampere', correct: false }
          ]
        },
        {
          question: 'Montako vuodenaikaa Suomessa on?',
          answers: [
            { text: 'neljä', correct: true },
            { text: 'kaksi', correct: false },
            { text: 'yksi', correct: false },
            { text: 'kolme', correct: false }
          ]
        },
        {
          question: 'Mikä on Helsingin päärautaitieasema?',
          answers: [
            { text: 'Oulunkylän rautatieasema', correct: false },
            { text: 'Rautatientori',  correct: true },
            { text: 'Pasilan ratatieasema', correct: false },
            { text: 'Puistola rautatieasema', correct: false }
          ]
        },
        {
          question: 'Mikä jäästä tulee kun se sulaa?',
          answers: [
            { text: 'lunta', correct: false },
            { text: 'vettä', correct: true }
          ]
        }
      ]
  
