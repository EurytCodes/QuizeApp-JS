const questions = [
    {
        question : "What is JavaScript?",
        answers : [
            { text : "Note App", correct : false },
            { text : "Programming Language", correct : true },
            { text : "Web Server", correct : false },
            { text : "Scripting Company", correct : false },
        ]
    },
    {
        question : "Which of these Statements about JavaScript is true?",
        answers : [
            { text : "It is not case sensitive", correct : false },
            { text : "It is case sensitive", correct : true },
        ]
    },
    {
        question : "JavaScript is a Popular Programming Language in the World?",
        answers : [
            { text : "True", correct : true },
            { text : "False", correct : false },
        ]
    },
    {
        question : "What is JavaScript used for in Web Developement?",
        answers : [
            { text : "Add dynamic Functionalities to the page", correct : true },
            { text : "Add content to the page", correct : false },
            { text : "Add colorful designs to the page", correct : false },
            { text : "Add database to the page", correct : false },
        ]
    }
];

const questionElement = document.getElementById('quiz-question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerText = questionNo + '. ' + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });

}

function resetState(){
    nextButton.style.display = 'none';
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if(isCorrect){
        selectedBtn.classList.add('correct');
        score++;
    }else{
        selectedBtn.classList.add('incorrect');
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === 'true'){
            button.classList.add('correct')
        }
        button.disabled = true;
    })
    nextButton.style.display = 'block';
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


function showScore(){
    resetState();
    if(score === questions.length){
        questionElement.innerText = `You are a Genuis ✨🥳,
        You Scored ${score} out of ${questions.length}!`;
    }else{
        questionElement.innerText = `You are doing good, keep it up 👍🏽
        You Scored ${score} out of ${questions.length}!`;  
    }
    nextButton.innerHTML = 'Play Again';
    nextButton.style.display = 'block';
}


nextButton.addEventListener('click', () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();
