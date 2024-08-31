//The boxes to collect response
let boxList = document.querySelectorAll(".box");
boxList = Array.from(boxList);



function gameBoard(){
    const gameboard = [["", "", ""], ["", "", ""], ["", "", ""]];
    return { gameboard };
}

function player(name, mark){
    return { name, mark };
}

function game(){
    let playerOne = player(name1, mark1);
    let playerTwo = player(name2, mark2);
    const players = [playerOne, playerTwo];

    const gameboard = gameBoard();
    let turn = 0;
    let gameEnd  = false;

    let flipper = (i, j)=>{
        gameboard[i][j] = players[turn].mark;
        turn = (turn===0) ? 1 : 0;

        if(!gameEnd)
            gameEnd = logic(gameBoard);
        if(gameEnd)
            return true;
        return false;
    };

    return { players, gameboard, turn };
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