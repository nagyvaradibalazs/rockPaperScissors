let pictures = ['imgs/rock.png', 'imgs/paper.png', 'imgs/scissors.png'];
let labels = ['Rock', 'Paper', 'Scissors'];

const play = (results) => {
    //random move by computer
    let move = Math.floor(Math.random() * 3);
    document.getElementById('photo').setAttribute('src', pictures[move]);
    document.getElementById('opp-move').innerHTML = labels[move];

    //determine winner
    let playerMove = (results[0] > results[1] && results[0] > results[2]) ? 0 : (results[1] > results[0] && results[1] > results[2]) ? 1 : 2;

    return ((playerMove == 0 && move == 2) || (playerMove == 1 && move == 0) || (playerMove == 2 && move == 1)) ? 0 : ((move == 0 && playerMove == 2) || (move == 1 && playerMove == 0) || (move == 2 && playerMove == 1)) ? 2 : 1
}

export { play };