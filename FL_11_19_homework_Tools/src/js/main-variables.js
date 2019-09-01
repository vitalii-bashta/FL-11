const rock = document.getElementById('rock');
const paper = document.getElementById('paper');
const scissors = document.getElementById('scissors');
const resetBtn = document.getElementById('reset');
const roundLog = document.getElementsByClassName('game-log')[0];
const imageWrapper = document.getElementsByClassName('battle-wrapper')[0];
const resultMap = {
    draw: 'Draw',
    user: 'You have won',
    computer: 'You have lost'
};

let playerWins = 0;
let computerWins = 0;
let draws = 0;