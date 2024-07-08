/*-------------- Constants -------------*/

const ScoreMenu = {rounds: undefined,
                   difficulty:undefined,
                   operator:undefined,
                   correctAnswers:undefined
                   ,wrongAnswers:undefined
};

const questions ={ question:[{
                     number1:undefined,
                     number2:undefined,
                     operator:undefined,
                     correctAnswer:undefined,
                     difficulty:undefined,
                     userAnswer:undefined}]
};

const operators =['+','-','*','/'];

const difficulty =['easy','mid','hard'];


/*---------- Variables (state) ---------*/

let currentQuestion = 0;


/*----- Cached Element References  -----*/

const startMenu = document.querySelector('.startMenu');
const message = document.querySelector('.message');
const rounds = document.querySelector('.rounds');
const questionNumber = document.querySelector('.questionNumber');
const questionMessage = document.querySelector('.questionMessage');
const answersButtons = document.querySelectorAll('.answer');
const questionSection = document.querySelector('.questionDiv');
const endGameCard = document.querySelector('.gameResults');
const endGameMessage = document.querySelector('.endGameMessage');
const endGameDifficulty = document.querySelector('.endGameDifficulty');
const endGameOperator = document.querySelector('.endGameOperator');


/*-------------- Functions -------------*/

const randomNumber = (low,high) => {
    return Math.floor(Math.random() * (high - low + 1 ) ) +low;
};

const guessDifficulty = () => {
    return difficulty[randomNumber(0,3)];
};

const guessOperator = () => {
    return operators[randomNumber(0,3)];
};

const calculator = (number1,number2,operator) => {
    switch (operator) {
        case '-':
            return number1 - number2;
            break;
        case '+':
            return number1 + number2;
            break;
        case '*':
            return number1 * number2;
            break;
        case '/':
            return number1 / number2;
    }
}

const generateQuestion = () => {
    const question = {number1:null,
        number2:undefined,
        operator:undefined,
        difficulty:undefined,
        correctAnswer:undefined};
    if (ScoreMenu.difficulty === 'mix'){
        question.difficulty = guessDifficulty();
    } else {
        question.difficulty = ScoreMenu.difficulty;
    }
    if (ScoreMenu.operator === 'mix') {
        question.operator = guessOperator();
    } else {
        question.operator = ScoreMenu.operator;
    }

    switch (question.difficulty) {
        case 'easy':
            question.number1 = randomNumber(1,11);
            question.number2 = randomNumber(1,11);
            question.correctAnswer = calculator(question.number1,question.number2,question.operator);
            break;
        case 'mid':
            question.number1 = randomNumber(11,41);
            question.number2 = randomNumber(11,41);
            question.correctAnswer = calculator(question.number1,question.number2,question.operator);
            break;
        case 'hard':
            question.number1 = randomNumber(41,100);
            question.number2 = randomNumber(41,100);
            question.correctAnswer = calculator(question.number1,question.number2,question.operator);
            break;
    }
    
    return question;
}

const generateQuestions = () => {
    for (let i=0 ; i < ScoreMenu.rounds ; i++) {
        questions.question[i] = generateQuestion();
    }
}

const questionNumberMessage = () => {
    return `Question Number ${currentQuestion+1}:`;
}

const questionMessagePrint = () => {
    return `The question is ${questions.question[currentQuestion].number1} ${questions.question[currentQuestion].operator} ${questions.question[currentQuestion].number2} `;
}

const generateRandomAnswers = () => {
    answersButtons.forEach((element) => {
        element.textContent = randomNumber(1,9999);
    })
    answersButtons[randomNumber(0,4)].textContent = questions.question[currentQuestion].correctAnswer;
}

const displayQuestion = () => {
    questionNumber.innerText = questionNumberMessage();
    questionMessage.innerText = questionMessagePrint();
    generateRandomAnswers();
}

const disableAnswers = () => {
    answersButtons.forEach((element) => {
        element.disabled;
    })
}

const checkAnswerAndCorrect = (event) => {
    if (event.textContent === Number(questions.question[currentQuestion].correctAnswer)){
        questionMessage.innerText = `${questionMessage.innerText} and the answer is correct `;
        disableAnswers();
        ScoreMenu.correctAnswers += 1;
    } else {
        questionMessage.innerText = `${questionMessage.innerText} and the answer is wrong the correct one is ${questions.question[currentQuestion].correctAnswer}`;
        disableAnswers();
        ScoreMenu.wrongAnswers += 1;
    }
}

const checkWinner = () => {
    if (ScoreMenu.correctAnswers >= ScoreMenu.wrongAnswers) {

    }
}

/*----------- Event Listeners ----------*/

startMenu.addEventListener('click', (event) => {
    
    if (event.target.classList.contains('operator')) {
        ScoreMenu.operator = event.target.textContent;
    } 

    if (event.target.classList.contains('difficulty')) {
        ScoreMenu.difficulty = event.target.textContent;
    } 

    if (event.target.classList.contains('start')) {

        ScoreMenu.rounds = Number(rounds.value);

        if (ScoreMenu.difficulty === undefined || ScoreMenu.operator === undefined || ScoreMenu.rounds === undefined) {
            
            message.innerText = 'please choose settings';
        } 
        
        else {
            generateQuestions();
            startMenu.style.display = 'none';
            displayQuestion();
        }
    }
})

questionSection.addEventListener('click', (event) => {

    if (event.target.classList.contains('answer')) {
        checkAnswerAndCorrect(event.target);
    } 
    if (event.target.classList.contains('next')) {
        currentQuestion++;
        if (currentQuestion>ScoreMenu.rounds){

        }
        displayQuestion();
    }

})
