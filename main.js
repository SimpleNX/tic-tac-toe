//The boxes to collect response

function gameBoard(){
    const gameboard = [["S", "S", "S"], ["S", "S", "S"], ["S", "S", "S"]];
    return { gameboard };
}

function player(name, mark){
    return { name, mark };
}

function game(){
    let playerOne;
    let playerTwo;
    const players = [playerOne, playerTwo];

    const board = gameBoard();
    const turnObj = {turn : 0};
    let gameEnd  = false;
    let gameStart = false;
    let count = 0;

    let flipTurn = () =>{
        return (turnObj.turn===0) ? 1 : 0;
    }

    let flipper = (i, j)=>{
        if(board.gameboard[i][j]==="S"){
            board.gameboard[i][j] = players[turnObj.turn].mark;
            count++;
            if(!gameEnd)
                gameEnd = logic(board.gameboard, count);
            if(count === 9 && !gameEnd)
                return { val : true, res : "Tie"};
            if(gameEnd)
                return { val : true, res : "Win"};
            turnObj.turn = flipTurn();
            return { val : false, res : "C"};
        }
        return { val : false, res : "Skip"};
    };

    let reset = ()=>{
        for(let i = 0; i<3; i++){
            for(let j = 0; j<3; j++){
                board.gameboard[i][j] = "S";
            }
        }
        turnObj.turn = 0;
        gameEnd = false;
        gameStart = false;
        count = 0;
    }

    return { players, board, turnObj, flipper, gameStart, flipTurn, reset };
}

function domObj(gameObj){
    const box = document.querySelector("#ticbox");
    const start = document.querySelector("#start");
    const dialog = document.querySelector("dialog");
    const reset = document.querySelector("#reset");
    const submit = document.querySelector("#sub");
    const result = document.querySelector("#result");
    const restart = document.querySelector("#restart");
    const boxes = Array.from(document.querySelectorAll(".box"));

    let status = (did)=>{
        if(did === "Win"){
            result.innerText = `Player ${gameObj.players[gameObj.turnObj.turn].name} won the round`;
            gameObj.gameStart = false;
        }else if(did === "Tie"){
            result.innerText = `Game ended in a draw`;
            gameObj.gameStart = false;
        }else if(did==="clear"){
            result.innerText = "";
        }
    };

    return { box, start, dialog, reset, submit, status, restart, boxes };
}

function logic(gameboard, count){
    //3*3 board requires 8 checks in total
    //Divided into 3 types.
    //horizontal checks
    for(let i=0; i<3; i++){
        let k = gameboard[i][0], c = 1;
        if(k==="S")
            continue;
        for(let j = 1; j<3; j++){
            if(gameboard[i][j] === k)
                c++;
        }
        if(c==3)
            return true;
    }

    //vertical checks
    for(let i=0; i<3; i++){
        let k = gameboard[0][i], c = 1;
        if(k==="S")
            continue;
        for(let j = 1; j<3; j++){
            if(gameboard[j][i] === k)
                c++;
        }
        if(c==3)
            return true;
    }

    //diagonal checks
    let c = 0;
    for(let i =0; i<3; i++){
        if(gameboard[i][i]=='S')
            break;
        if(gameboard[i][i] === gameboard[0][0])
            c++;
        if(c==3)
            return true;
    }
    let i = 2, j = 0, c2=0;
    while((i>=0 && i<3) && (j>=0 && j<3)){
        if(gameboard[i][j]==="S")
            break;
        if(gameboard[i][j]===gameboard[0][2])
            c2++;
        i--;
        j++;
        if(c2===3)
            return true;
    }
    return false;
}

const gameObj = game();
const domobj = domObj(gameObj);

(domobj.box).addEventListener("click", (event)=>{
    if(gameObj.gameStart){
        let co = event.target.id;
        let i = co[0], j = co[2];
        let status = gameObj.flipper(i, j);
        if(status.res !== "Skip"){
            event.target.innerText = gameObj.board.gameboard[i][j];
            (domobj.status)(status.res);
        }
    }
});
(domobj.start).addEventListener("click", ()=>{
    (domobj.dialog).showModal();
    domobj.start.disabled = true;
});
(domobj.submit).addEventListener("click", (event)=>{
    let oneName = document.querySelector("#play1 #name").value;
    let oneMark = document.querySelector("#play1 #select1").value;
    let twoName = document.querySelector("#play2 #name").value;
    let twoMark = document.querySelector("#play2 #select2").value;

    gameObj.players[0] = { name : oneName, mark : oneMark};
    gameObj.players[1] = { name : twoName, mark : twoMark};

    event.preventDefault();
    (domobj.dialog).close();
    gameObj.gameStart = true;
});
(domobj.reset).addEventListener("click", ()=>{
    location.reload();
});
(domobj.restart).addEventListener("click", (event)=>{
    gameObj.reset();
    (domobj.boxes).forEach((element)=>{
        element.innerText = "";
    });
    domobj.status("clear");
    (domobj.submit).dispatchEvent(new Event("click"));
});
