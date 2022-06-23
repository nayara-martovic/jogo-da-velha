var columnsList;
var rowList;
var player_label;
var current_player = "X";
var matriz = null;
var finished = false;

function playTurn(event) {
    let el = event.target;

    if (finished) return;

    if(!el.classList.contains("filled")){
        el.classList.add("filled", current_player);
        current_player = (current_player == "X") ? "O" : "X";

        player_label.innerHTML = "Vamos lá! Agora é a vez do jogador " + current_player + "...";

        checkWinner();
    }
}

function getMatrizFromTable(){
    let newMatriz = new Array();

    rowList.forEach((row, i) => {
        let columns = row.querySelectorAll(".column");

        newMatriz[i] = new Array();
        columns.forEach((col, j) => {
            let val = null;

            if(col.classList.contains("X"))
                val = "X";
            else if (col.classList.contains("O"))
                val = "O";

            newMatriz[i][j] = val;
        });
    });

    matriz = newMatriz;
}

function matrizIsFull(){
    let full = true;
    for (i=0; i < 3; i++) {
        for (j=0; j < 3; j++) {
            if(matriz[i][j] == null) {
                full = false;
                break;
            }
        }
    }

    if(full)
        finishedGame();
}

function checkWinner() {
    getMatrizFromTable();

    for (i=0; i < 3; i++) {
            //checar linhas
        if(matriz[i][0] && matriz[i][0] === matriz[i][1] && matriz[i][0] === matriz[i][2]) {
            winGame(matriz[i][0]);
            return;
        }

        //checar colunas
        if(matriz[0][i] && matriz[0][i] === matriz[1][i] && matriz[0][i] === matriz[2][i]) {
            winGame(matriz[0][i]);
            return;
        }
    }

    //checar diagonal principal
    if(matriz[0][0] && matriz[0][0] === matriz[1][1] && matriz[0][0] === matriz[2][2]) {
        winGame(matriz[0][0]);
        return;
    }

    //checar diagonal secundaria
    if(matriz[0][2] && matriz[0][2] === matriz[1][1] && matriz[0][2] === matriz[2][0]) {
        winGame(matriz[0][2]);
        return;
    }

    matrizIsFull();
}

function winGame(winner){
    finished = true;
    player_label.innerHTML = "PARABÉNSSS! O ganhador da rodada é o jogador <strong>"+winner+"</strong>!";

    document.querySelectorAll(".column.filled."+winner).forEach(el => el.classList.add("animate"));
}

function finishedGame(){
    finished = true;
    player_label.innerHTML = "Deu empate. Reinicie o jogo para uma melhor de 3.";

    columnsList.forEach(el => el.classList.add("animate"));
}

function refreshGame(){
    current_player = "X";
    matriz = null;
    finished = false;

    player_label.innerHTML = "Vamos lá! Agora é a vez do jogador "+current_player+"...";
    columnsList.forEach(el => el.classList.remove("filled", "X", "O", "animate"));
}

window.onload = function () {
    columnsList = document.querySelectorAll(".jogo-velha .column");
    rowList = document.querySelectorAll(".jogo-velha .row");
    player_label = document.getElementById("text-game");

    columnsList.forEach(el => {
        el.addEventListener("dblclick", playTurn, false);
    });
}
