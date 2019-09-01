function compareChoices() {
    let choiceOptions = ['paper', 'rock', 'scissors'];
    const results = [
        ['draw', 'computer', 'user'],
        ['user', 'draw', 'computer'],
        ['computer', 'user', 'draw'],
    ];

    let playerChoice = this.id;
    let playerChoiceInd = choiceOptions.indexOf(playerChoice);//0 rock
    let randomNumber = Math.floor(Math.random() * 3); //1
    let computerChoice = choiceOptions[randomNumber]; //1 paper
    let playerResult = results[randomNumber][playerChoiceInd];

    switch (playerResult) {
        case 'user':
            playerWins++;
            break;
        case 'computer':
            computerWins++;
            break;
        case 'draw':
            draws++;
            break;
        
    }

    roundLog.innerText = showRoundLog(playerChoice, computerChoice, playerResult);
    showRoundLog(playerChoice, computerChoice, playerResult);
    addImages(playerChoice, computerChoice);

    if (getTotalRounds() >= 3) {
        showResults(playerWins, computerWins, playerChoice, computerChoice, playerResult);
    }
};