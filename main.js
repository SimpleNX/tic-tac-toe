//The boxes to collect response
let boxList = document.querySelectorAll(".box");


function gameBoard(){
    const gameboard = [["", "", ""], ["", "", ""], ["", "", ""]];
    return { gameboard };
}

function player(name, mark){
    let name = undefined;
    let mark = undefined;
    return { name, mark };
}

function game(){
    let playerOne = player(name1, mark1);
    let playerTwo = player(name2, mark2);
    const players = [playerOne, playerTwo];

    const gameboard = gameBoard();
    const domoBj = domObj();
    let turn = 0;
    let gameEnd  = false;
    let gameStart = false;

    let flipTurn = (turn) =>{
        return (turn===0) ? 1 : 0
    }

    let flipper = (i, j)=>{
        gameboard[i][j] = players[turn].mark;
        turn = flipTurn(turn);

        if(!gameEnd)
            gameEnd = logic(gameBoard);
        if(gameEnd)
            return true;
        return false;
    };

    return { players, gameboard, turn, flipper, gameStart, flipTurn, reset };
}

function domObj(gameObj){
    const box = document.querySelector("#ticbox");
    const start = document.querySelector("#start");
    const dialog = document.querySelector("#det");
    const reset = document.querySelector("#reset");
    const submit = document.querySelector("#sub");
    let result = document.querySelector("p #result");

    box.addEventListener("click", (event)=>{
        if(gameObj.gameStart){
            let co = event.target.id;
            let currBox = document.querySelector(co);
            let i = co[0], j = co[2];
            let status = gameObj.flipper(i, j);
            currBox.innerText = gameObj.gameBoard[i][j];
            status(status);
        }
    });
    start.addEventListener("click", ()=>{
        dialog.showModal();
    });
    submit.addEventListener("click", (event)=>{
        let oneName = document.querySelector("#play1 name").value;
        let oneMark = document.querySelector("#play1 select1").value;
        let twoName = document.querySelector("#play2 name").value;
        let twoMark = document.querySelector("#play2 select2").value;

        gameObj.players[0] = { name : oneName, mark : oneMark};
        gameObj.players[1] = { name : twoName, mark : twoMark};

        event.preventDefault();
        dialog.close();
    });
    reset.addEventListener("click", ()=>{
        setTimeout(()=>location.reload, 6000);
    });

    let gameReset = () => setTimeout(()=>location.reload, 6000);

    let status = (did)=>{
        if(did){
            result.innerText = `Player ${gameObj.players[gameObj.flipTurn(gameObj.turn)]} won the round`;
            gameReset();
        }
    };
}

function logic(gameboard){
    //3*3 board requires 8 checks in total
    //Divided into 3 types.
    //horizontal checks
    for(let i=0; i<3; i++){
        let k = gameboard[i][0], c = 1;
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
        if(gameboard[i][i] === gameboard[0][0])
            c++;
        if(c==3)
            return true;
    }
    let i = 2, j = 0, c2=0;
    while((i>=0 && i<3) && (j>=0 && j<3)){
        if(gameboard[i][j]===gameboard[0][2])
            c2++;
        i--;
        j++;
        if(c2===3)
            return true;
    }
    return false;
}

function main(){

}


main();