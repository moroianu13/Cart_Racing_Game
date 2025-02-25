export function displayMenu() {
    const menu = document.createElement('div');
    menu.id = 'game-menu';
    menu.innerHTML = `
        <h1>Cart Racing Game</h1>
        <button id="start-game">Start Game</button>
        <button id="options">Options</button>
        <button id="exit">Exit</button>
    `;
    document.body.appendChild(menu);

    document.getElementById('start-game').addEventListener('click', startGame);
    document.getElementById('options').addEventListener('click', showOptions);
    document.getElementById('exit').addEventListener('click', exitGame);
}

function startGame() {
    // Logic to start the game
    console.log('Game started');
}

function showOptions() {
    // Logic to show options
    console.log('Options menu opened');
}

function exitGame() {
    // Logic to exit the game
    console.log('Game exited');
}