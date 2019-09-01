function showRoundLog(playerChoice, computerChoice, playerResult) {
    return `Round ${getTotalRounds()}, ${playerChoice} vs ${computerChoice}, ${
        resultMap[playerResult]
    }`;
}

function showResults(
    playerWins,
    computerWins,
    playerChoice,
    computerChoice,
    playerResult
) {
    let roundMsg = showRoundLog(playerChoice, computerChoice, playerResult);
    let msg;
    if (playerWins > computerWins) {
        msg = 'user is winnrer';
    } else if (playerWins < computerWins) {
        msg = 'computer is winner';
    } else {
        msg = 'its a draw';
    }
    roundLog.innerHTML = `${roundMsg} </br> ${msg}`;
    disableButtons();
}

function getTotalRounds() {
    return playerWins + computerWins + draws;
}

function resetGame() {
    playerWins = 0;
    computerWins = 0;
    draws = 0;
    roundLog.innerText = '';
    enableButtons();
    removeImages();
}

function disableButtons() {
    rock.setAttribute('disabled', true);
    scissors.setAttribute('disabled', true);
    paper.setAttribute('disabled', true);
}

function enableButtons() {
    rock.removeAttribute('disabled');
    scissors.removeAttribute('disabled');
    paper.removeAttribute('disabled');
}

function addImages(playerChoice, computerChoice) {
    removeImages();
    let img1 = document.createElement('img');
    let img2 = document.createElement('img');
    img1.src = `img/${playerChoice}.png`;
    img2.src = `img/${computerChoice}.png`;
    imageWrapper.appendChild(img1);
    imageWrapper.appendChild(img2);
}

function removeImages() {
    imageWrapper.innerHTML = '';
}
