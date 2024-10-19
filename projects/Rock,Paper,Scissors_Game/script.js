/*
    Condition & Requirements of the game.
    *We can get the selected option of user w/use of 'click' addEventListener, What we needed is the option that will be selected by computer.
    *Create a function that will returns a random choice of computer, from an array of possible choices.
    *Now you have an Input for the Player and an Input from the Computer

    *Now we need to know if the user wins or not.
    *Create a function that will return true, if player wins based on the condition.
    *Now that you have the function to check if the user wins.

    *Create a function that will return the roundResult, based on userOption and computerOption.
    *You can now give the RESULT PER ROUND, the next condition is that this game was race to 3.

    *Create a function that will give the RESULT OF THE GAME and
    *update who won, the score for both.
    *check if player or computer wins, with a condtion of who score 3 first.
    *if either of 2 scores 3, means the game was finished, so we need to hide the option button, and roundResultMsg, and winnerMsg

    *Since we can now display who wins the game, there must be a RESET BUTTON to start over again.
    *Create a function that will clear the scores, roundResultMsg, winnerMsg
    *hides reset button
    *show again the choices.
    *addEventListener to the button to use this function

    *Since we have now the functions needed for the button
    *initialize variable to hold REFERENCE to specific DOM ELEMENT this case BUTTONS.
    *use addEventListener for each of the button and then use "click" then call the getRoundResult function, 
    passing the equivalent choice as a parameter.
*/
//returns string for random computer selected option
function getRandomComputerResult() {
    const options = ["Rock", "Paper", "Scissors"];
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
}
    
  //function checking if player won, this are the conditions.
  function hasPlayerWonTheRound(player, computer) {
    //returns true if one of the conditions is true
    return (
      (player === "Rock" && computer === "Scissors") ||
      (player === "Scissors" && computer === "Paper") ||
      (player === "Paper" && computer === "Rock")
    );
  }
  
  let playerScore = 0;
  let computerScore = 0;
  
  function getRoundResults(userOption) {
    //use the function for computer result, store it on a variable to use as an argument
    const computerResult = getRandomComputerResult();
    //arguments passed to parameter player and computer
    //if user won
    if (hasPlayerWonTheRound(userOption, computerResult)) {
      playerScore++;
      return `Player wins! ${userOption} beats ${computerResult}`;
    } else if (computerResult === userOption) {
      return `It's a tie! Both chose ${userOption}`;
    } else {
      computerScore++;
      return `Computer wins! ${computerResult} beats ${userOption}`;
    }
  }
  
  //initialize variable to hold REFERENCE to specific DOM ELEMENT
  const playerScoreSpanElement = document.getElementById("player-score");
  const computerScoreSpanElement = document.getElementById("computer-score");
  const roundResultsMsg = document.getElementById("results-msg");
  const winnerMsgElement = document.getElementById("winner-msg");
  const optionsContainer = document.querySelector(".options-container");
  const resetGameBtn = document.getElementById("reset-game-btn");
  
  function showResults(userOption) {
    //Result
    roundResultsMsg.innerText = getRoundResults(userOption);
    computerScoreSpanElement.innerText = computerScore;
    playerScoreSpanElement.innerText = playerScore;
    //Condtions checking if player or computer wins
    if(playerScore == 3 ) {
        winnerMsgElement.innerText = "Player has won the game!";
        resetGameBtn.style.display = "block";
        optionsContainer.style.display = "none";
    }
    if(computerScore == 3){
        winnerMsgElement.innerText = "Computer has won the game!";
        resetGameBtn.style.display = "block";
        optionsContainer.style.display = "none";
    }
    
    //or
    /*
    if (playerScore === 3 || computerScore === 3) {
        winnerMsgElement.innerText = `${
          //ternary or conditional operator
          //condition ? expressionIfTrue : expressionIfFalse
          playerScore === 3 ? "Player" : "Computer"
        } has won the game!`;
    
        resetGameBtn.style.display = "block";
        optionsContainer.style.display = "none";
      }
    */
  }
  function resetGame() {
    playerScore = 0;
    computerScore = 0;
    playerScoreSpanElement.innerHTML = playerScore;
    computerScoreSpanElement.innerHTML = computerScore;
    resetGameBtn.style.display = "none";
    optionsContainer.style.display = "block";
    winnerMsgElement.innerText ="";
    roundResultsMsg.innerText="";
  };
  resetGameBtn.addEventListener("click", resetGame);

  const rockBtn = document.getElementById("rock-btn");
  const paperBtn = document.getElementById("paper-btn");
  const scissorsBtn = document.getElementById("scissors-btn");
  
  rockBtn.addEventListener("click", function () {
    showResults("Rock");
  });
  
  paperBtn.addEventListener("click", function () {
    showResults("Paper");
  });
  
  scissorsBtn.addEventListener("click", function () {
    showResults("Scissors");
  });