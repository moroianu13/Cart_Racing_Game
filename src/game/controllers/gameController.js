export default class GameController {
    constructor() {
        this.isGameRunning = false;
        this.score = 0;
        this.lap = 1;
        this.maxLaps = 3;
        this.position = 1;
    }

    startGame() {
        this.isGameRunning = true;
        this.score = 0;
        this.lap = 1;
        console.log('Game started!');
    }

    endGame() {
        this.isGameRunning = false;
        console.log('Game ended! Final score:', this.score);
    }

    updateLap() {
        this.lap++;
        console.log('Lap:', this.lap);
        if (this.lap > this.maxLaps) {
            this.endGame();
        }
    }

    updatePosition(pos) {
        this.position = pos;
    }
}