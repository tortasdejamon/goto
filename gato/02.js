let boxes = document.querySelectorAll(".box");

let turn = "X";
let isGameOver = false;

// Contadores de puntuación
let xWins = 0;
let oWins = 0;
let draws = 0;

boxes.forEach(e => {
    e.innerHTML = "";

    // Función que maneja la jugada
    const playMove = () => {
        if (!isGameOver && e.innerHTML === "") {
            e.innerHTML = turn;
            checkWin();
            checkDraw();
            if (!isGameOver) changeTurn();
        }
    };

    // Escuchar click y touchstart para mejor respuesta en móviles
    e.addEventListener("click", playMove);
    e.addEventListener("touchstart", (event) => {
        event.preventDefault(); // prevenir doble toque zoom y scroll
        playMove();
    }, { passive: false });
});

function changeTurn() {
    if (turn === "X") {
        turn = "O";
        document.querySelector(".bg").style.left = "85px";
    } else {
        turn = "X";
        document.querySelector(".bg").style.left = "0";
    }
}

function checkWin() {
    let winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let i = 0; i < winConditions.length; i++) {
        let v0 = boxes[winConditions[i][0]].innerHTML;
        let v1 = boxes[winConditions[i][1]].innerHTML;
        let v2 = boxes[winConditions[i][2]].innerHTML;

        if (v0 !== "" && v0 === v1 && v0 === v2) {
            isGameOver = true;

            if (turn === "X") xWins++;
            else oWins++;

            document.querySelector("#results").innerHTML = turn + " Ganaste!";
            document.querySelector("#play-again").style.display = "inline";

            updateScoreboard();

            for (let j = 0; j < 3; j++) {
                boxes[winConditions[i][j]].style.backgroundColor = "#08D9D6";
                boxes[winConditions[i][j]].style.color = "#000";
            }
            return;
        }
    }
}

function checkDraw() {
    if (!isGameOver) {
        let isDrawn = true;
        boxes.forEach(e => {
            if (e.innerHTML === "") isDrawn = false;
        });

        if (isDrawn) {
            isGameOver = true;
            draws++; // Sumar empate
            document.querySelector("#results").innerHTML = "Empate";
            document.querySelector("#play-again").style.display = "inline";

            updateScoreboard();
        }
    }
}

function updateScoreboard() {
    document.querySelector("#x-wins").innerText = "X: " + xWins;
    document.querySelector("#o-wins").innerText = "O: " + oWins;
    document.querySelector("#draws").innerText = "Empates: " + draws;
}

document.querySelector("#play-again").addEventListener("click", () => {
    isGameOver = false;
    turn = "X";
    document.querySelector(".bg").style.left = "0";
    document.querySelector("#results").innerHTML = "";
    document.querySelector("#play-again").style.display = "none";

    boxes.forEach(e => {
        e.innerHTML = "";
        e.style.removeProperty("background-color");
        e.style.color = "#fff";
    });
});