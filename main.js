
const buttons = document.getElementsByTagName("button");
const newGameBtn = document.getElementById("newGameBtn");
var newGame = document.getElementById("newGame");
var result = document.getElementById("resultMessage");

for (let button of buttons) {
    button.addEventListener("click", doSmth);
}
newGameBtn.addEventListener("click", startNewGame);

var board = [
    ['-1', '-1', '-1'],
    ['-1', '-1', '-1'],
    ['-1', '-1', '-1']
];

function doSmth(e) {
    if (checkForWin() != 'NE') {
        return;
    }
    var button = document.getElementById(e.target.id);
    e.target.id
    var Y0 = e.target.id[3];
    var X0 = e.target.id[4];

    if (button.innerHTML != '-1') return;
    board[Y0 - 1][X0 - 1] = 'X';
    button.innerHTML = 'X';
    button.style.color="black";
    
    // 'X' - X has won
    // 'O' - O has won
    // 'TIE' - tie
    // 0 - game still running
    var hasWon = checkForWin();

    if (hasWon != 'NE') {
        getMessage(hasWon);
        return;
    }

    findBestMove('O');

    hasWon = checkForWin();
    if (hasWon != 'NE') {
        getMessage(hasWon);
        return;
    }
}

function checkForWin() {
    for (var X0 = 0; X0 < 3; X0++) {
        if (board[0][X0] == board[1][X0] && board[1][X0] == board[2][X0] && board[1][X0] != '-1') {
            return board[1][X0];
        }
    }

    for (var Y0 = 0; Y0 < 3; Y0++) {
        if (board[Y0][0] == board[Y0][1] && board[Y0][1] == board[Y0][2] && board[Y0][1] != '-1') {
            return board[Y0][1];
        }
    }

    if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[1][1] != '-1') {
        return board[1][1];
    }

    if (board[2][0] == board[1][1] && board[1][1] == board[0][2] && board[1][1] != '-1') {
        return board[1][1];
    }

    for (var X0 = 0; X0 < 3; X0++) {
        for (var Y0 = 0; Y0 < 3; Y0++) {
            if (board[Y0][X0] == '-1') {
                // Not Ended
                return 'NE';
            }
        }
    }

    return 'TIE';
}

let scores = {
    'X' : 1,
    'O' : -1,
    'TIE': 0
};

function minimax(isMaximizing, depth) {
    let result = checkForWin();
    if (result != 'NE') {
        return scores[result];
    }
    // if (depth >= 10) return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (var X0 = 0; X0 < 3; X0++) {
            for (var Y0 = 0; Y0 < 3; Y0++) {
                if (board[Y0][X0] == '-1') {
                    board[Y0][X0] = 'O';
                    let score = minimax(false, depth + 1);
                    bestScore = Math.max(bestScore, score);
                    board[Y0][X0] = '-1';
                }
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (var X0 = 0; X0 < 3; X0++) {
            for (var Y0 = 0; Y0 < 3; Y0++) {
                if (board[Y0][X0] == '-1') {
                    board[Y0][X0] = 'X';
                    let score = minimax(true, depth + 1);
                    bestScore = Math.min(bestScore, score);
                    board[Y0][X0] = '-1';
                }
            }
        }
        return bestScore;
    }

}

function findBestMove(player) {
    var scores = {};
    for (var Y0 = 1; Y0 <= 3; Y0++) {
        for (var X0 = 1; X0 <= 3; X0++) {
            if (board[Y0-1][X0-1] == '-1') {
                board[Y0-1][X0-1] = 'O';
                let score = minimax(false, 0);
                if (scores[score] == undefined)
                    scores[score] = [];
                scores[score].push("btn" + Y0 + X0);

                board[Y0-1][X0-1] = '-1';
            }
        }
    }
    var maxScore = Infinity;
    var bestMoves = [];
    for (var score in scores) {
        if (score < maxScore) {
            bestMoves = scores[score];
            maxScore = score;
        }
    }

    console.log(bestMoves);
    var ID = bestMoves[Math.floor(Math.random() * bestMoves.length)];
    var Y0 = ID[3];
    var X0 = ID[4];

    board[Y0- 1][X0 - 1] = 'O';
    var button = document.getElementById(ID);
    button.innerHTML = 'O';
    button.style.color="black";
}

function getMessage(player) {
    if (player == "TIE") {
        result.innerHTML = "verc iman verca shen";
        result.style.color="purple";
    } if (player == "X") {
        result.innerHTML = "sagol lomo";
        result.style.color="green";
    } if (player == "O") {
        result.innerHTML = "vai she sawyalo";
        result.style.color="red";
    }

    result.style.visibility="visible";
    newGame.style.visibility="visible";

}

function startNewGame() {
    for (var Y0 = 1; Y0 <= 3; Y0++) {
        for (var X0 = 1; X0 <= 3; X0++) {
            var button = document.getElementById("btn" + Y0 + X0);
            button.innerHTML = '-1';
            button.style.color="white";
            board[Y0 - 1][X0 - 1] = '-1';
            newGame.style.visibility="hidden";
            result.style.visibility="hidden";
        }
    }
}