/*-------------- Constants -------------*/

const ScoreMenu = {rounds: 0,
                   difficulty: undefined,
                   operator:undefined,
                   correctAnswers:0
                   ,wrongAnswers:0
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
const difficultyMenuButtons = document.querySelectorAll('.difficulty');
const operatorMenuButtons = document.querySelectorAll('.operator');
const rounds = document.querySelector('.rounds');
const questionNumber = document.querySelector('.questionNumber');
const questionMessage = document.querySelector('.questionMessage');
const answersButtons = document.querySelectorAll('.answer');
const questionSection = document.querySelector('.questionDiv');
const endGameCard = document.querySelector('.gameResults');
const endGameMessage = document.querySelector('.endGameMessage');
const endGameDifficulty = document.querySelector('.endGameDifficulty');
const endGameOperator = document.querySelector('.endGameOperator');
const endGameCorrectAnswers = document.querySelector('.endGameCorrectAnswers');
const endGameWrongAnswers = document.querySelector('.endGameWrongAnswers');
const endGameResetButton = document.querySelector('.reset');


/*-------------- Functions -------------*/

const randomNumber = (low,high) => {
    return Math.floor(Math.random() * (high - low + 1 ) ) +low;
};

const guessDifficulty = () => {
    return difficulty[randomNumber(0,2)];
};

const guessOperator = () => {
    return operators[randomNumber(0,3)];
};

const calculator = (number1,number2,operator) => {
    let total = 0;
    switch (operator) {
        case '-':
            total = number1 - number2;
            return parseFloat(total.toFixed(2));
            break;
        case '+':
            total = number1 + number2;
            return parseFloat(total.toFixed(2));
            break;
        case '*':
            total = number1 * number2;
            return parseFloat(total.toFixed(2));
            break;
        case '/':
            total = number1 / number2;
            return parseFloat(total.toFixed(2));
            break;
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
    let counter = 1;
    answersButtons.forEach((element) => {
        element.textContent = parseFloat((questions.question[currentQuestion].correctAnswer + counter).toFixed(2));
        if (questions.question[currentQuestion].correctAnswer % 2 === 0) {
            counter+=2;
        } else {
            counter+=1;
        }
    })
    answersButtons[randomNumber(0,3)].textContent = questions.question[currentQuestion].correctAnswer;
}

const displayQuestion = () => {
    questionNumber.innerText = questionNumberMessage();
    questionMessage.innerText = questionMessagePrint();
    generateRandomAnswers();
}

const disableAnswers = (event) => {
    answersButtons.forEach((element) => {
        element.disabled = true;
        element.classList.add('disable');
    })
    event.classList.remove('disable');
}

const enableAnswers = () => {
    answersButtons.forEach((element) => {
        element.disabled = false;
        element.classList.remove('disable');
    })
}

const selectDifficultyMenuButton = (event) => {
    difficultyMenuButtons.forEach((element) => {
        element.classList.remove('selected');
    })
    event.classList.add('selected');
}

const selectOperatorMenuButton = (event) => {
    operatorMenuButtons.forEach((element) => {
        element.classList.remove('selected');
    })
    event.classList.add('selected');
}

const resetMenuSelection = () => {
    difficultyMenuButtons.forEach((element) => {
        element.classList.remove('selected');
    });
    operatorMenuButtons.forEach((element) => {
        element.classList.remove('selected');
    });

}


const checkAnswerAndCorrect = (event) => {
    
    if (event.textContent == questions.question[currentQuestion].correctAnswer){
        questionMessage.innerText = `${questionMessage.innerText} and the answer is correct `;
        ScoreMenu.correctAnswers += 1;
    } else {
        questionMessage.innerText = `${questionMessage.innerText} and the answer is wrong the correct one is ${questions.question[currentQuestion].correctAnswer}`;
        ScoreMenu.wrongAnswers += 1;
    }
}

const endGameCardPrint = () => {
    endGameDifficulty.innerText = `The difficulty: ${ScoreMenu.difficulty}`;
    endGameOperator.innerText = `The operartor: ${ScoreMenu.operator}`;
    endGameCorrectAnswers.innerText = `Number of correct answers: ${ScoreMenu.correctAnswers}`;
    endGameWrongAnswers.innerText = `Number of wrong answers: ${ScoreMenu.wrongAnswers}`;

}

const checkWinner = () => {
    if (ScoreMenu.correctAnswers >= ScoreMenu.wrongAnswers) {
        endGameMessage.innerText = 'GOOD JOB YOU WON!';
        endGameCardPrint();
    } else {
        endGameMessage.innerText = 'HARD LUCK , DO BETTER NEXT TIME';
        endGameCardPrint();
    }
}

const init = () => {
    currentQuestion = 0;
    for (let key in ScoreMenu) {
        if (key === 'wrongAnswers' || key === 'correctAnswers'){
            ScoreMenu[key] = 0;
        }
        else {
            ScoreMenu[key] = undefined;
        }
    }

    questions.question.forEach((element) => {
        for (let key in element){
            element[key] = undefined;
        }
    })

    startMenu.classList.toggle('hideDiv');
    endGameCard.classList.toggle('hideDiv');
    rounds.value = 0;
    resetMenuSelection();

}

/*----------- Event Listeners ----------*/

startMenu.addEventListener('click', (event) => {
    
    if (event.target.classList.contains('operator')) {
        ScoreMenu.operator = event.target.textContent;
        selectOperatorMenuButton(event.target);
    } 

    if (event.target.classList.contains('difficulty')) {
        ScoreMenu.difficulty = event.target.textContent;
        selectDifficultyMenuButton(event.target);
    } 

    if (event.target.classList.contains('start')) {

        ScoreMenu.rounds = Number(rounds.value);

        if (ScoreMenu.difficulty === undefined || ScoreMenu.operator === undefined || ScoreMenu.rounds === 0) {
            
            message.innerText = 'please choose settings';
        } 
        
        else {
            generateQuestions();
            startMenu.classList.toggle('hideDiv');
            questionSection.classList.toggle('hideDiv');
            displayQuestion();
        }
    }
})

questionSection.addEventListener('click', (event) => {

    if (event.target.classList.contains('answer')) {
        questions.question[currentQuestion].userAnswer = event.target.innerText;
        checkAnswerAndCorrect(event.target);
        disableAnswers(event.target);
    } 
    if (event.target.classList.contains('next')) {
        if (questions.question[currentQuestion].userAnswer === undefined){
            return;
        }
        enableAnswers();
        currentQuestion++;
        if (currentQuestion>=ScoreMenu.rounds){
            checkWinner();
            questionSection.classList.toggle('hideDiv');
            endGameCard.classList.toggle('hideDiv');
            return;
        }
        displayQuestion();
        
    }

})

endGameCard.addEventListener('click', (event) => {
    if (event.target.classList.contains('reset')) {
        init();
    }
})
