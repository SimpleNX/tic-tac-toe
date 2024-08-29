//The boxes to collect response
let boxList = document.querySelectorAll(".box");
boxList = Array.from(boxList);


//Gameboard object factory
function GameBoard(){
    Gameboard = [["", "", ""], ["", "", ""], ["", "", ""]];
    return { GameBoard };
}

//Player object factory
function Player(name, mark){
    return { name, mark };
}

//Game flow object factory
function Game(){
    gameBoard = new GameBoard();
    turn = false;
    gameEnd = false;
    flipCheck = ()=>{
        if(gameEnd===false){
            turn = !turn;
            gameEnd = logic();
            if(gameEnd)
                console.log("The game has finished");
        }
    }
    return { gameBoard, flipper };
}

//Dom handling object factory
function DOMObject(){

}

//Game Logic
function logic(){

}

function main(){

}