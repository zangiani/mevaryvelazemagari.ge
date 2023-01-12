
const buttons = document.getElementsByTagName("button");
for (let button of buttons) {
    button.addEventListener("click", doSmth);
}

var board = [
    ['-1', '-1', '-1'],
    ['-1', '-1', '-1'],
    ['-1', '-1', '-1']
]

function doSmth(e) {
    console.log(e.target.id);
    var button = document.getElementById(e.target.id);
    e.target.id
    var Y0 = e.target.id[3];
    var X0 = e.target.id[4];

    if (button.innerHTML != '-1') return;
    board[Y0 - 1][X0 - 1] = 'O';
    button.innerHTML = 'X';
    button.style.color="black";
    
    if (checkForWin('O') == 1) {
        getMessage('O');
        return;
    }

    if (checkForWin == 0) {
        getMessage("TIE")
    }

    findBestMove('X');
    
    if (checkForWin('X') == 1) {
        getMessage('X');
        return;
    }
}

function checkForWin(player) {
    for (var X0 = 0; X0 < 3; X0++) {
        for (var Y0 = 0; Y0 < 3; Y0++) {
            if (board[Y0][X0] != player) {
                break;  
            }
            if (Y0 == 2) return 1;
        }
    }

    for (var Y0 = 0; Y0 < 3; Y0++) {
        for (var X0 = 0; X0 < 3; X0++) {
            if (board[Y0][X0] != player) {
                break;
            }
            if (X0 == 2) return 1;
        }
    }

    for (var XY = 0; XY < 3; XY++) {
        if (board[XY][XY] != player) break;
        if (XY == 2) return 1;
    }

    for (var XY = 0; XY < 3; XY++) {
        if (board[2 - XY][XY] != player) break;
        if (XY == 2) return 1;
    }

    for (var X0 = 0; X0 < 3; X0++) {
        for (var Y0 = 0; Y0 < 3; Y0++) {
            if (board[Y0][X0] == '-1') {
                // NOT ENDED
                return -1;
            }
        }
    }
    
    // ENDED - TIE
    return 0;

}

function minimax(isMaximizing, depth) {
    let player = isMaximizing ? 'X' : 'O';
    if (checkForWin(player) == 1) {
        return player == 'X' ? 1 : -1;
    }
    if (checkForWin(player) == 0) {
        return 0;
    }
    if (depth >= 8) return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (var X0 = 0; X0 < 3; X0++) {
            for (var Y0 = 0; Y0 < 3; Y0++) {
                if (board[Y0][X0] == '-1') {
                    board[Y0][X0] = 'X';
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
                    board[Y0][X0] = 'O';
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
                board[Y0-1][X0-1] = 'X';
                let score = minimax(false, 0);
                if (scores[score] == undefined)
                    scores[score] = [];
                scores[score].push("btn" + Y0 + X0);

                board[Y0-1][X0-1] = '-1';
            }
        }
    }
    var maxScore = -Infinity;
    var bestMoves = [];
    for (var score in scores) {
        if (score > maxScore) {
            bestMoves = scores[score];
            maxScore = score;
        }
    }

    console.log(bestMoves);
    var ID = bestMoves[Math.floor(Math.random() * bestMoves.length)];
    var Y0 = ID[3];
    var X0 = ID[4];

    board[Y0- 1][X0 - 1] = 'X';
    var button = document.getElementById(ID);
    button.innerHTML = 'O';
    button.style.color="black";
}

function getMessage(player) {
    if (player == "TIE")
        console.log("TIE");
    else
        console.log(player, " HAS WON, CONGRATULATIONS");
}