const playerText = document.querySelector("#playerText");
const computerText = document.querySelector("#computerText");
const resultText = document.querySelector("#resultText");
const choiceBtns = document.querySelectorAll(".choiceBtn");

let player, computer, result;

choiceBtns.forEach(button => button.addEventListener("click", 
    () => {
        player = button.textContent;
        computerTurn();
        playerText.textContent = `Player: ${player}`;
        computerText.textContent = `Computer: ${computer}`;
        resultGame();
        resultText.textContent = `Result: ${result}`;
    }
));

function computerTurn() {

    const randNum = Math.floor(Math.random()*3) +1;

    switch(randNum) {
        case 1:
            computer = "ROCK";
            break;
        case 2:
            computer = "PAPER";
            break;
        case 3:
            computer = "SCISSORS";
            break;

    }
}

function resultGame() {
    if(player == 'ROCK') {
        if(computer == 'ROCK') {
            result = "Tie";    
        } else if(computer == 'PAPER') {
            result = "You Win";    
        } else if(computer == 'SCISSORS') {
            result = "You Lose";    
        }
    }

    else if(player == 'PAPER') {
        if(computer == 'ROCK') {
            result = "You Win";
        } else if(computer == 'PAPER') {
            result = "Tie";    
        } else if(computer == 'SCISSORS') {
            result = "You Lose";    
        }
    }

    else if(player == 'SCISSORS') {
        if(computer == 'ROCK') {
            result = "You Lose";
        } else if(computer == 'PAPER') {
            result = "You Win";    
        } else if(computer == 'SCISSORS') {
            result = "Tie";    
        }
    }
}