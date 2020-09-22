/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
reset();
var diceValue = 1;
console.log
var p1, p2;
var diceImg = document.getElementsByClassName('dice')[0];
var playing = true;

//ROLL-BUTTON
document.getElementsByClassName('btn-roll')[0].onclick = function(){
    if(playing){
        diceValue = (Math.floor(Math.random()*6+1));
        console.log(diceValue);

        if(p1.turn === true){
            changeDiceImg(diceValue, p1);
        }else{
            changeDiceImg(diceValue, p2);
        }
    }
 
};
//HOLD-BUTTON
document.getElementsByClassName('btn-hold')[0].onclick = function(){

    if(playing){

        if(p1.turn === true){
            endTurn(p1);
        }else{
            endTurn(p2);
        }

    }
 
};
//FACTORY-RESET BUTTON
document.getElementsByClassName('btn-new')[0].onclick = function(){

    reset();
 
};

function changeDiceImg(diceValue, player){
        
        player.turnPoints += diceValue;

        switch (diceValue) {
            case 1:
                diceImg.src = './dice-1.png';
                player.turnPoints = 0;
                endTurn(player);
                break;
            case 2:
                diceImg.src = './dice-2.png';
                break;
            case 3:
                diceImg.src = './dice-3.png';
                break;
            case 4:
                diceImg.src = './dice-4.png';
            break;
            case 5:
                diceImg.src = './dice-5.png';
            break;
            default:
                diceImg.src = './dice-6.png';
                break;
        }
        player.divCurrentPoints.innerHTML = player.turnPoints;

    
}

function endTurn(player){

    player.totalPoints += player.turnPoints;
    player.turn = false;
    player.turnPoints = 0;
    player.divTotalPoints.innerHTML = player.totalPoints;
    if(player.totalPoints >= 22){
        endGame(player);
    }else{
        if(player.name === 'PLAYER 1'){
            p2.turn = true;
            p1.divCurrentTurn.classList.remove("active");
            p2.divCurrentTurn.classList.add("active");
        }else{
            p1.turn = true;
            p2.divCurrentTurn.classList.remove("active");
            p1.divCurrentTurn.classList.add("active");
        }
        
    }
    
    
}

function endGame(player){
    player.divCurrentTurn.classList.add('winner');
    player.divCurrentTurn.classList.remove('active');
    player.divCurrentTurn.querySelector('.player-name').innerHTML = player.name + ' WINNER';
    playing = false;
}

function reset(){
    playing = true;
    p1 = {
        name:'PLAYER 1',
        totalPoints: 0,
        turnPoints: 0,
        divTotalPoints: document.getElementById('score-0'),
        divCurrentPoints: document.getElementById('current-0'),
        divCurrentTurn: document.getElementsByClassName('player-0-panel')[0],
        turn:true
    };

    p1.divTotalPoints.innerHTML = 0;
    p1.divCurrentPoints.innerHTML = 0;
    p1.divCurrentTurn.classList.add("active");
    p1.divCurrentTurn.classList.remove("winner");

    p2 = {
        name:'PLAYER 2',
        totalPoints: 0,
        turnPoints: 0,
        divTotalPoints: document.getElementById('score-1'),
        divCurrentPoints: document.getElementById('current-1'),
        divCurrentTurn: document.getElementsByClassName('player-1-panel')[0],
        turn:false
    };

    p2.divTotalPoints.innerHTML = 0;
    p2.divCurrentPoints.innerHTML = 0;
    p2.divCurrentTurn.classList.remove("winner");

}
