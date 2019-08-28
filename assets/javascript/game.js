
//Define Word Choices.

const choiceOfWords =           // Word list
    [
        "jackson",
        "elvis",
        "madonna",
        "temptations",
        "sinatra",
        "prince",
        "rihanna",
        "beyonce",
        "eminem",
        "usher",
    ];

//Define program variables.

const maxTries = 10; 
           
let guessedLetters = [];        
let currentWordIndex;                 
let remainingGuesses = 0;      
let gameStarted = false;
let guessingWord = [];           
let completed = true;         
let wins = 0;                   
let loses = 0;                  

// Game Setup and initialize variables
function gameSetup() {
    remainingGuesses = maxTries;
    gameStarted = false;
    currentWordIndex = Math.floor(Math.random() * (choiceOfWords.length));
    guessedLetters = [];
    guessingWord = [];
    
    
    // Get underscores for placeholder for length of random word.
    for (let i = 0; i < choiceOfWords[currentWordIndex].length; i++) {
        guessingWord.push("_");
    } 
    updateDisplay();
};

//  Updates the HTML Page
function updateDisplay() {
    document.getElementById("totalWins").innerText = wins;
    document.getElementById("totalLoses").innerText = loses;
    document.getElementById("currentWord").innerText = "";
    for (let i = 0; i < guessingWord.length; i++) {
        document.getElementById("currentWord").innerText += guessingWord[i];
    }
    document.getElementById("remainingGuesses").innerText = remainingGuesses;
    document.getElementById("guessedLetters").innerText = guessedLetters;
    if(remainingGuesses <= 0) 
    {
        document.getElementById("sayPhrase").style.cssText = "display:block";
        completed = true;
    }
};

// listen for user input:
document.onkeydown = function(event) {
    event.preventDefault;
    // If we finished a game, dump last keystroke and reset.
    if(completed) {
        gameSetup();
        completed = false;
    } else {
        // Check to make sure a-z was pressed.
	if (event.keyCode >= 48 && event.keyCode <= 57)
    		alert("Please type a letter");

        if(event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toLowerCase());
        }
    }
};

function makeGuess(letter) {
    if (remainingGuesses > 0) {
        if (!gameStarted) {
            gameStarted = true;
        }
        // Make sure we didn't use this letter yet
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            determineGuess(letter);
        }
    }
    
    updateDisplay();
    checkWin();
    checkLoses();
    
};

// This function takes a letter and Steps through the loop to determine if there is a letter match.
// and displays it/them in the game space. 

function determineGuess(letter) {
    // Array to store positions of letters in string
    var positions = [];

    // Loop through word finding all instances of guessed letter, store each index in an array.
    for (let i = 0; i < choiceOfWords[currentWordIndex].length; i++) {
        if(choiceOfWords[currentWordIndex][i] === letter) {
            positions.push(i);
        }
    }

    // if there are no match, decrement a guess.
    if (positions.length <= 0) {
        remainingGuesses--;
    } else {
        // Loop through and replace the '_' with a letter.
        for(let i = 0; i < positions.length; i++) {
            guessingWord[positions[i]] = letter;
        }
    }
};
//Check Game wins. 
function checkWin() {
    if(guessingWord.indexOf("_") === -1) {
       document.getElementById("sayPhrase").style.cssText= "display: block";
        wins++;
	completed = true;
    }
};
  
//Check Game loses. 
function checkLoses() {
    if(remainingGuesses <= 0) {
       document.getElementById("sayPhrase").style.cssText= "display: block";
        loses++;
        completed = true;
    }
};
