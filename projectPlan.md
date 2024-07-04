# Math Game 
## Introduction:
The player will choose how many rounds he wants to play then he/she will choose the difficulty of the game that ranges from Easy to mid finally to hard also Mix which will be random difficulty questions, then he/she will choose the type of operators for the math game like * - / + also mixed operation questions if the user wants. In order to win the game the user needs to answer right more than wrong answers and if the result of wrong and right answers is the same the game will count as a win. The game will show the final results as an end game card that will show the player the type of the questions like operators and difficulty level also how many rounds. and text or visuals will be provided to tell the user if the answer is correct or not ,and if the user gave wrong answer the game will give him/her the answer as a correction. 

### User Stories:
***
1. As a user, I need to be able to choose how many rounds do I want to play. 
2. As a user, I need to be able to choose the difficulty of the game.
3. As a user, I need to be able to choose the type of oprators for the math question.
4. As a user I need to be able to select or enter the answer.
5. As a user I need visuals or text indicators that I selected my answer. 
6. As a user I need to be able to see if my answer is wrong or right.
7. As a user I need to see the end game card that will give me the details of the game. 

### Pseudocode:
***
```javascript
//User input how many rounds does he want
//User chooses the difficulty (easy mid hard mix)
//User choose the opeartion type of the question (- + * / mix)
//The game generate a list of the questions and the correct answers based on the user selections
//The game starts In a loop of how many questions
  //The game present the question and the choices as MCQ type qusetions 
  //The user choose an answer
    //IF the user choose the correct choice 
      //The user get a positive feedback on the screen that the answer is correct 
      //The game saves points for correct answer
    //ELSE 
      //The user get a negative feedback on the screen and the correct answer get presented 
      //The game saves a points for wrong answer
//IF The loop finsih the end game card results will appear
  //IF the correct points score more than the wrong score or equal
    //Present the card with the results and information like (difficulty / operators / rounds / correct answers / wrong answers ) then congratulate the user 
  //ELSE 
    //Present the card with the results and information like (difficulty / operators / rounds / correct answers / wrong answers ) then say hardluck next time for the user
```