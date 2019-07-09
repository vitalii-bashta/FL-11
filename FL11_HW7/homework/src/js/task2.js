const firstBreakPoint = 2;
const secondBreakPoint = 3;
let userWinning = 0;
let maxPrizeOnAttempt = 0;
let confirmedPlaying = true;
let prizeMax = 100,
    prizeMaxReset = 100,
    prizeCutOnSecondAttempt = 2,
    prizeCutOnThirdAttempt = 4,
    prizeMultiplier = 2;
let maxRange = 8,
    maxRangeReset = 8,
    rangeIncrease = 4;
let maxAttempts = 3,
    maxAttemptsLoop = 4;

if (confirm('Do you want to play a game?')) {
    let randomNumber;
    let userNumber;

    while (confirmedPlaying) {
        for (let i = 1; i <= maxAttempts; i++) {
            randomNumber = Math.floor(Math.random() * maxRange) + 1;
            switch (i) {
                case firstBreakPoint:
                    maxPrizeOnAttempt = prizeMax / prizeCutOnSecondAttempt;
                    break;
                case secondBreakPoint:
                    maxPrizeOnAttempt = prizeMax / prizeCutOnThirdAttempt;
                    break;
                default:
                    maxPrizeOnAttempt = prizeMax;
                    break;
            }
            const message =
                `Choose a roulette pocket number from 0 to ${maxRange}\n` +
                `Attempts left: ${maxAttemptsLoop - i}\n` +
                `Total prize: ${userWinning}$\n` +
                `Possible prize on current attempt: ${maxPrizeOnAttempt}$`

            userNumber = prompt(message, 0);
            if (userNumber === null) {
                confirmedPlaying = false;
                break;
            }
            if (parseFloat(userNumber) === randomNumber) {
                userWinning += maxPrizeOnAttempt;
            }
            if (parseFloat(userNumber) === randomNumber && i === maxAttempts) {
                alert(`Congratulation, you won! Your prize is: ${userWinning}$`);
                prizeMax *= prizeMultiplier;
                maxRange += rangeIncrease;
                confirmedPlaying = confirm('Do you want to continue?');
                if (!confirmedPlaying) {
                    alert(`Thank you for your participation. Your prize is: ${userWinning}$`);
                    confirmedPlaying = confirm('Do you want to play again?');
                    prizeMax = prizeMaxReset;
                    maxRange = maxRangeReset;
                    break;
                }
            } else if (parseFloat(userNumber) !== randomNumber && i === maxAttempts) {
                userWinning = 0;
                alert(`Thank you for your participation. Your prize is: ${userWinning}$`);
                prizeMax = prizeMaxReset;
                maxRange = maxRangeReset;
                confirmedPlaying = confirm('Do you want to play again?');
            }
        }
    }
}
if (userWinning === 0) {
    alert('You did not become a billionaire, but can.');
}
