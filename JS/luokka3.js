
  function buildQuiz(){
    // variable to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {

        // variable to store the list of possible answers
        const answers = [];

        // and for each available answer...
        for(letter in currentQuestion.answers){

          // ...add an HTML radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }

        // add this question and its answers to the output
        output.push(
          `<div class="question"> ${currentQuestion.question} </div>
          <div class="answers"> ${answers.join('')} </div>`
        );
      }
    );

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
  }

  function showResults(){

    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {

      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if(userAnswer === currentQuestion.correctAnswer){
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = 'lightgreen';
      }
      // if answer is wrong or blank
      else{
        // color the answers red
        answerContainers[questionNumber].style.color = 'red';
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  const quizContainer = document.getElementById('quiz1');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  const myQuestions = [
      {
        question: "Montako jalkaa hyönteisellä on?",
        answers: {
          a: "4",
          b: "8",
          c: "6"
        },
        correctAnswer: "c"
      },
      {
        question: "Moniko osainen ruumis hyönteisellä on?",
        answers: {
          a: "3",
          b: "4",
          c: "5"
        },
        correctAnswer: "a"
      },
      {
          question: "Mihin osaan kaikki jalat ovat kiinnittyneet?",
          answers: {
            a: "Alaruumiiseen",
            b: "Päähän",
            c: "Keskiruumiiseen"
          },
          correctAnswer: "c"
        },
        {
          question: "Minkä kasvin lehdet on yleensä kolmen ryhmissä",
          answers: {
            a: "Valkoapila",
            b: "Pihasaunio",
            c: "Pihatatar"
          },
          correctAnswer: "a"
        },{
          question: "Minkä kukan kukka muistuttaa voikukkaa?",
          answers: {
            a: "Valkoapila",
            b: "Syysmaitiainen",
            c: "Pihatatar"
            
          },
          correctAnswer: "b"
        },
      {
        question: "Mikä on vanha lääkekasvi jonka lehtiä voi käyttää laastarina?",
        answers: {
          a: "Valkoapila",
          b: "Syysmaitiainen",
          c: "piharatamo",
          d: "Voikukka"
        },
        correctAnswer: "c"
        
      }
      
    ];
  
  
    buildQuiz();
  
    // Event listeners
    submitButton.addEventListener('click', showResults);
  })();
  