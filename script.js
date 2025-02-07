const gameBoard=(()=>{
    let board=['', '', '', '', '', '', '', '', ''];
    const getBoard=()=>board;
    const updateBoard=(index, marker)=>{
        if(board[index]==='')
        {
            board[index]=marker;
            return true;
        }
        return false;
    };
    const resetBoard=()=>{
        ['', '', '', '', '', '', '', '', ''];
    };
    return { getBoard, updateBoard, resetBoard };
})();

const player=(name, marker)=>{
    return {player, marker};
};

const gameController=(()=>{
    let player1=null;
    let player2=null;
    let currentPlayer=null;
    const initGame=(name1, mark1, name2, mark2)=>{
        player1=player(name1, mark1);
        player2=player(name2, mark2);
        currentPlayer=player1;
        gameBoard.resetBoard();
    };
    const switchTurn=()=>{
        currentPlayer= (currentPlayer === player1)? player2: player1;
    };
    const playTurn=(index)=>{
        if(gameBoard.updateBoard(index, currentPlayer.marker)){
            if(checkWin()){
                return `${currentPlayer.name} wins!`;
            }
            switchTurn();
            return true;
        }
        return false;
    };

    const checkWin=()=>{
        const board=gameBoard.getBoard();
        const winConditions=[
            [1,2,3],
            [4,5,6],
            [7,8,9],
            [1,5,9],
            [3,5,7],
            [1,4,7],
            [2,5,8],
            [3,6,9]
        ];
        return winConditions.some((condition)=>{
            condition.every((index)=> board[index]===currentPlayer.marker)
        });
    };
    const getCurrentPlayer=()=>currentPlayer;
    return { initGame, playTurn, getCurrentPlayer}
})();

gameController.initGame('Alice', 'X' , 'Bob', 'O');
console.log(GameController.getCurrentPlayer()); // Alice
GameController.playTurn(0); // Alice places X at index 0
GameController.playTurn(1); 