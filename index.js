// Some important notes here:
// 1. We are using anonymouse funtions sometimes. 
//    An anonymous function is created without a name 
//    or the keyword "function". () => console.log('hello')
//    is the same as function() { console.log('hello') }.
//    We also sometimes invoke an annonymous function by calling it with ().
//    For example, (() => console.log('hello'))() would call the function.
// 2. We make use of the Array.prototype.map function to map over an array.
//    This method will loop over every element in the array and run a function
//    on each element. That you provide as the first argument. Then the map will
//    return an array with the results of the function.
// 3. We use the ternerary operator (<condition> ? <expression> : <expression>) to make a decision.
//    If the condition is true, then the first expression is returned.
//    If the condition is false, then the second expression is returned.

// Static Data that will not change
var questions = [
  {
    question: 'What is the capital of France?',
    answers: ['Paris', 'London', 'Berlin', 'Rome'],
    correctAnswer: 'Paris'
  },
  {
    question: 'What is the capital of Germany?',
    answers: ['Paris', 'London', 'Berlin', 'Rome'],
    correctAnswer: 'Berlin'
  },
  {
    question: 'What is the capital of Italy?',
    answers: ['Paris', 'London', 'Berlin', 'Rome'],
    correctAnswer: 'Rome'
  }
];

// Data variables that will be updated throughout the app
var quizStarted = { value: false, update: (value) => updateData(quizStarted, value) };
var currentQuestion = { value: 0, update: (value) => updateData(currentQuestion, value) };
var response = { value: '', update: (value) => updateData(response, value) };

// A helper function that checks if the answer is correct or not, then 
// changes the response data variable accordingly. After waiting 3 seconds,
// it moves on to the next question by changing the currentQuestion data variable
function checkAnswer (answer, correctAnswer) {
  if(answer === correctAnswer) {
    response.update('Correct!')
    setTimeout(() => {
      currentQuestion.update(currentQuestion.value + 1)
      response.update('')
    }, 3000)
  } else {
    response.update('Incorrect!')
    setTimeout(() => {
      currentQuestion.update(currentQuestion.value + 1)
      response.update('')
    }, 3000)
  }
}

// A component that renders a single line response
function QuestionResponse(response) {
  return `
    <div>${response}</div>
  `
}

// A component that renders a single question and its answers.
// Clicking on one of the answers that is rendered will run the 
// checkAnswer helper function. We show a response, if there is one.
function Question(question, answers, correctAnswer){
  return `
    <div>${question}</div>
    ${
      answers.map(answer => `
        <div>
          <div 
            onclick="(() => checkAnswer('${answer}', '${correctAnswer}'))()" 
          >
          ${answer}
          </div>
        </div>
      `).join('')
    }
    ${ response.value ? QuestionResponse(response.value) : '' }
  `
}

// A componenet that renders a button that starts the quiz
// by chaning the quizStarted data variable to true
function StartQuiz() {
  return `
    <h2>Welcome to the Quiz!</h2>
    <button onclick="(() => quizStarted.update(true))()">Start Quiz</button>
  `
}

// A component that either renders the start quiz button or the
// question that we are on. If we have run out of questions, it 
// will show a message saying that the quiz is over.
function Quiz() {
  if (currentQuestion.value === questions.length) {
    return `
      <div style="width: 50%; margin: 0 auto;">
        <h2>You have finished the quiz!</h2>
      </div>
      `
  } else if (quizStarted.value) {
    return `<div style="width: 50%; margin: 0 auto;">
      <h1>Quiz</h1>
      ${
        Question(
          questions[currentQuestion.value].question, 
          questions[currentQuestion.value].answers, 
          questions[currentQuestion.value].correctAnswer
        )
      }
      </div>
    `
  } else {
    return `<div style="width: 50%; margin: 0 auto;">
    <h1>Quiz</h1>
    ${ StartQuiz() }
    </div>
  `
  }
}

// The most important function of all. This function is called every time
// you update one of your data variables. It will not only update the varibale
// you've asked to have updated, but it will then rerender the dom, with those 
// new variables in place.
function updateData(object, value) {
  object.value = value
  render()
}


// The render function that simply finds the root element and renders a component
// inside of it.
function render() {
  var root = document.getElementById('root');
  root.innerHTML = Quiz();
}

// Initiate the app by rendering the first time
render()
