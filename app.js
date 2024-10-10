let boxs = document.querySelectorAll('.box');
let statusText = document.querySelector('#status');
let restartBtn = document.querySelector('#restart');

let win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = Array(9).fill(""); // ["", "", "", "", "", "", "", "", ""]

let currentPlayer = 'x';
let player = 'X';
let running = false;

init();

function init() {
    boxs.forEach((box) => box.addEventListener('click', boxClick));
    restartBtn.addEventListener('click', restartGame);
    statusText.textContent = `Turn : ${player}`;
    running = true;
}

function boxClick() {
    let index = this.dataset.index;
    if(options[index] != "" || !running) {
        return;
    } 
    updateBox(this, index);
    checkWinner();
}

function updateBox(box, index) {
    options[index] = player;
    box.innerHTML = currentPlayer;
}

function changePlayer() {
    player = (player == 'X') ? 'O' : 'X';
    currentPlayer = (currentPlayer == 'x') ? 'o' : 'x';
    statusText.textContent = `Turn : ${player}`;
}

function checkWinner() {
    let isWon = false;

    for(let i = 0; i < win.length; i++) {
        let condition = win[i]; // [0, 1, 2]
        
        let box1 = options[condition[0]];
        let box2 = options[condition[1]];
        let box3 = options[condition[2]];

        if(box1 == "" || box2 == "" || box3 == "") {
            continue;
        }

        if(box1 == box2 && box2 == box3) {
            isWon = true;
            // boxs[condition[0]].classList.add('win');
            // boxs[condition[1]].classList.add('win');
            // boxs[condition[2]].classList.add('win');
        }
    }

    if(isWon) {
        statusText.innerHTML = `${player} Won...`;
        running = false;
    } else if(!options.includes("")) {
        statusText.innerHTML = `Game Draw ..!`;
    } else {
        changePlayer();
    }
}

function restartGame() {
    options = Array(9).fill("");
    currentPlayer = 'x';
    player = 'X';
    running = true;
    statusText.textContent = `Turn : ${player}`;

    boxs.forEach((box) => {
        box.innerHTML = "";
        // box.classList.remove('win');
    })
}