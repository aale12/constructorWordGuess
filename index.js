//npm
const inquire = require('inquirer');

//variables
const wordList = ['banana', 'tree', 'canteloupe'];
let chosenWord = '';
let chosenWordLength = 0;
let display = [];
let lettersInChosenWordArray = [];
let currentGuess = [];
let wrongGuesses = [];
let correctGuesses = [];

//counters
let winCounter = 0;
let loseCounter = 0;
let numGuesses = 20;

function init() {
  numGuesses = 9;
  chosenWord = wordList[Math.floor(Math.random() * wordList.length)];
  chosenWordLength = chosenWord.length;
  display = [chosenWordLength];
  lettersInChosenWordArray = chosenWord.split('');
  console.log(`=====CHOSEN WORD IS: ${chosenWord} =====`);
  currentGuess = [];
  wrongGuesses = 0;
  
  for (let i = 0; i < chosenWordLength; i++) {
    display[i] = '_ ';
    currentGuess += display[i];
  }
  console.log(`=====BLANKED OUT WORD IS: ${currentGuess} =====`);
  currentGuess = '';
  //console.log(lettersInChosenWordArray.toString().replace(/,/g, ' '));
  //console.log(currentGuess.toString());
}
function checkLetter(letter) {
  if (lettersInChosenWordArray.indexOf(letter) > -1){
    if (correctGuesses.indexOf(letter) === -1) {
      correctGuesses.push(letter);
      for (let i = 0; i < chosenWordLength; i++) {
        if (lettersInChosenWordArray[i] === letter){
          display[i] = letter;
        }
        currentGuess = currentGuess + display[i] + ' ';
      }
      console.log(currentGuess);
      currentGuess = '';
      askForLetter();
    }
  } else {
    if (wrongGuesses.indexOf(letter) < 0) {
      wrongGuesses.push(letter);
      numGuesses--;
      console.log(`Wrong Guesses: ${wrongGuesses} || Num Guesses: ${numGuesses}.`)
      askForLetter();
    }
  }
  // let letterInWord = false;

  // for (let i = 0; i < chosenWordLength; i++) {
  //   if (chosenWord[i] === letter) {
  //     letterInWord = true;
  //   }
  // }
  // if (letterInWord) {
  //   for (let j = 0; j < chosenWordLength; j++) {
  //     if (lettersInChosenWordArray[j] = letter) {
  //       display[j] = letter;
  //     }
  //     currentGuess = currentGuess + display[j] + ' ';
  //   }
  //   console.log(currentGuess);
  //   currentGuess = '';
  //   askForLetter();
  // } else {
  //   wrongGuesses.push(letter);
  //   numGuesses--;
  //   console.log(`Wrong Guesses: ${wrongGuesses}|| guesses left: ${numGuesses}`);
  //   askForLetter();
  // }
}
function askForLetter(){
  inquire.prompt([
    {
      type: 'input',
      message: 'Guess a letter',
      name: 'letter'
    }
  ]).then((choice) => {
    checkLetter(choice.letter);
  })
}
function startGame() {
  init();
  askForLetter();
}
startGame();