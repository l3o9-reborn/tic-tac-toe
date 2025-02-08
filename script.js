const playerName=document.querySelector('.nameForm');
const submitBtn=document.getElementById('submit');
const loginPage=document.querySelector('.loginForm');
const cells=document.querySelectorAll('.cell');
const resetBtn=document.querySelector('.reset');
const score1=document.querySelector('.score1');
const score2=document.querySelector('.score2');

let fs=0;
let ss=0;

const gameBoard=(()=>{
    let board=['', '', '', '', '', '', '', '', ''];
    const getBoard=()=>board;
    const updateBoard=(index, marker)=>{
        console.log(board);
        if(board[index]==='')
        {
            board[index]=marker;
            return true;
        }
        return false;
    };
    const resetBoard=()=>{
        // board=['', '', '', '', '', '', '', '', ''];
        // board = Array(9).fill('');
        console.log('Before Reset:', board);
        for(let i=0; i<9; ++i)
            board[i]='';
        console.log('after Reset:', board);
    };
    return { getBoard, updateBoard, resetBoard };
})();

const player=(name, marker)=>{
    return {name, marker};
};

const gameController=(()=>{
    let totalStrock=0;
    let player1=null;
    let player2=null;
    let currentPlayer=null;
    const initGame=(name1, mark1, name2, mark2)=>{
        player1=player(name1, mark1);
        player2=player(name2, mark2);
        currentPlayer=player1;
        totalStrock=0;
        gameBoard.resetBoard();
        updateScoreBoard(player1.name, fs, player2.name, ss);
    };
    const switchTurn=()=>{
        currentPlayer= (currentPlayer === player1)? player2: player1;
    };
    const playTurn=(index)=>{
        if(gameBoard.updateBoard(index, currentPlayer.marker)){
            cells[index].textContent = currentPlayer.marker; // Update UI
            if(checkWin()){
                (currentPlayer===player1)? ++fs: ++ss;
                updateScoreBoard(player1.name, fs, player2.name, ss);
               
                totalStrock=0;
                currentPlayer=player1;
                console.log(`${currentPlayer.name} wins!`);

                return `${currentPlayer.name} wins!`;
            }
            totalStrock++;
            console.log('strock',totalStrock);
            if(totalStrock===9)
            {
                totalStrock=0;
                console.log(`Oops! Match Draw`);
                currentPlayer=player1;
                return `Oops! Match Draw`;
            }
                
            switchTurn();
            return true;
        }
        return false;
    };

    const checkWin=()=>{
        const board=gameBoard.getBoard();
        const winConditions=[
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 4, 8],
            [2, 4, 6],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8]
        ];
        console.log('check win executed')
        // return winConditions.some(condition=>{
        //     condition.every(index=>board[index]===currentPlayer.marker)
        // });
        return winConditions.some(condition => 
            condition.every(index => board[index] === currentPlayer.marker)
        );
       
    };
    const getCurrentPlayer=()=>currentPlayer;
    return { initGame, playTurn, getCurrentPlayer}
})();

function updateScoreBoard(name1, sc1, name2, sc2){
    console.log(`${name1} ${name2} ${sc1} ${sc2}`)
    score1.innerHTML=`${name1}(X) <span>${sc1}</span>`;
    score2.innerHTML=`${name2}(O) <span>${sc2}</span>`;
}

let playerData=[];

submitBtn.addEventListener('click',()=>{
    playerData=[];
    console.log('done');
    const formData=new FormData(playerName);
    
    formData.forEach((value)=>{
        playerData.push(value);
    });
    console.log(playerData);
    if (!playerData[0] || !playerData[1]) {
        alert('Please enter names for both players.');
        return;
    }
    updateScoreBoard(playerData[0], 0 , playerData[1], 0);
    gameController.initGame(playerData[0], 'X' , playerData[1]
        , 'O');
    loginPage.classList.add('hidden');

    playerName.querySelectorAll('input').forEach(input => {
        input.value = ''; // Reset each input field to an empty string
    });
});

let isGameOver=false;

cells.forEach((cell, index)=>{
    cell.addEventListener('click',()=>{
        if (isGameOver || cell.textContent) return; // Only process the turn if the cell is empty
            const result = gameController.playTurn(index);
            if (result.includes('wins') || result === 'Oops! Match Draw') {
                isGameOver=true;
                setTimeout(() => {
                    alert(result); // Show the alert after a short delay
                    gameBoard.resetBoard(); // Reset the board state
                    isGameOver=false;
                    cells.forEach((cell) => (cell.textContent = '')); // Clear the game board UI
                }, 500); // Delay to allow the last move to be visible
            }
        

    });
});

resetBtn.addEventListener('click',()=>{
    updateScoreBoard('Name1', 0, 'Name2', 0);
    gameBoard.resetBoard();
    fs = 0; // Reset first player's score
    ss = 0; // Reset second player's score

    cells.forEach((cell) => (cell.textContent = '')); // Clear the game board UI
    loginPage.classList.remove('hidden');
});
