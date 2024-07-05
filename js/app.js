/*-------------- Constants -------------*/

const ScoreMenu = {rounds: null,
                   difficulty:null,
                   operator:null,
                   correctAnswers:null
                   ,wrongAnswers:null
};

const questions ={ question:[{
                     number1:null,
                     number2:null,
                     operator:null,
                     correctAnswer:null,
                     difficulty:null,
                     userAnswer:null}]
};

const operators =['+','-','*','/'];

const difficulty =['easy','mid','hard'];


/*---------- Variables (state) ---------*/

let currentQuestion = 0;


/*----- Cached Element References  -----*/


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
            return number1 - number2;
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
        number2:null,
        operator:null,
        difficulty:null,
        correctAnswer:null};
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

/*----------- Event Listeners ----------*/
