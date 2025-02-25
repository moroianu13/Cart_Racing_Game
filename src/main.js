// Import game dependencies
import GameController from './game/controllers/gameController.js';
import InputController from './game/controllers/inputController.js';
import renderer from './engine/renderer.js';
import { playMusic } from './assets/audio/music.js';
import soundEffects from './assets/audio/soundEffects.js';
import AICar from './game/entities/aiCar.js';

// Game state constants
const GAME_STATE = {
    START: 'start',
    PLAYING: 'playing',
    GAME_OVER: 'gameOver'
};

// Game configuration
const CONFIG = {
    canvasWidth: 800,
    canvasHeight: 600,
    fps: 60
};

// Game variables
let gameState = GAME_STATE.START;
let canvas, ctx;
let lastTime = 0;
let playerX = 400;
let playerY = 500;
let playerSpeed = 0;
let playerAngle = 0;
let engineSound;
let gameController;
let inputController;
let aiCars = [];
let lapCount = 0;
let lastCheckpointPassed = false;
let crashDebounce = false;

// Initialize the game
function init() {
    console.log("Initializing game...");
    canvas = document.getElementById('game-canvas');
    if (!canvas) {
        console.error("Canvas element not found!");
        return;
    }
    
    ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    canvas.width = CONFIG.canvasWidth;
    canvas.height = CONFIG.canvasHeight;
    
    // Create game controllers
    gameController = new GameController();
    inputController = new InputController();
    
    // Add event listeners
    document.getElementById('start-button').addEventListener('click', startGame);
    document.getElementById('restart-button').addEventListener('click', restartGame);
    
    // Initialize renderer
    renderer.init(CONFIG.canvasWidth, CONFIG.canvasHeight);
    
    // Start background music
    playMusic();
    
    // Start the game loop
    requestAnimationFrame(gameLoop);
    
    // Show initial screen
    gameState = GAME_STATE.START;
    console.log("Game initialized!");
}

// Game loop
function gameLoop(timestamp) {
    // Calculate delta time
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    
    // Clear the canvas
    renderer.clear();
    
    // Update and render based on game state
    switch (gameState) {
        case GAME_STATE.START:
            // Draw a start screen
            ctx.fillStyle = 'white';
            ctx.font = '48px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('Cart Racing Game', CONFIG.canvasWidth / 2, 200);
            ctx.font = '24px Arial';
            ctx.fillText('Click "Start Game" to begin', CONFIG.canvasWidth / 2, 250);
            break;
        case GAME_STATE.PLAYING:
            updateGame(deltaTime);
            renderGame();
            break;
        case GAME_STATE.GAME_OVER:
            // Draw game over screen
            ctx.fillStyle = 'white';
            ctx.font = '48px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('Game Over!', CONFIG.canvasWidth / 2, 200);
            ctx.font = '24px Arial';
            ctx.fillText(`Laps Completed: ${lapCount}`, CONFIG.canvasWidth / 2, 260);
            break;
    }
    
    // Continue the game loop
    requestAnimationFrame(gameLoop);
}

// Update game logic
function updateGame(deltaTime) {
    // Update AI cars
    aiCars.forEach(car => car.update(deltaTime));
    
    // Check player input
    if (inputController.isKeyPressed('up')) {
        playerSpeed = Math.min(playerSpeed + 0.5, 200);
        if (!engineSound) {
            engineSound = true;
            soundEffects.engineRunning.play();
        }
    } else if (inputController.isKeyPressed('down')) {
        playerSpeed = Math.max(playerSpeed - 1, -50);
    } else {
        // Friction - slow down gradually
        playerSpeed *= 0.98;
    }
    
    if (inputController.isKeyPressed('left')) {
        playerAngle -= 0.05;
    }
    if (inputController.isKeyPressed('right')) {
        playerAngle += 0.05;
    }
    
    // Calculate new position
    const newX = playerX + Math.sin(playerAngle) * playerSpeed * (deltaTime / 1000);
    const newY = playerY - Math.cos(playerAngle) * playerSpeed * (deltaTime / 1000);
    
    // Check if new position is on track
    if (renderer.isPointOnTrack(newX, newY)) {
        // If on track, update position
        playerX = newX;
        playerY = newY;
        crashDebounce = false;
    } else if (!crashDebounce) {
        // If off track, play crash sound and slow down
        soundEffects.crash.play();
        playerSpeed *= 0.5;
        crashDebounce = true;
    }
    
    // Check lap completion
    const finishLine = {
        x: renderer.trackCenter.x,
        y: renderer.trackCenter.y + renderer.trackOuterRadius.y - 10
    };
    
    // Distance from player to finish line
    const distanceToFinish = Math.sqrt(
        Math.pow(playerX - finishLine.x, 2) + 
        Math.pow(playerY - finishLine.y, 2)
    );
    
    // Checkpoint halfway around track
    const checkpointY = renderer.trackCenter.y - renderer.trackOuterRadius.y + 10;
    const distanceToCheckpoint = Math.sqrt(
        Math.pow(playerX - finishLine.x, 2) + 
        Math.pow(playerY - checkpointY, 2)
    );
    
    // If player crossed checkpoint, mark it
    if (distanceToCheckpoint < 50) {
        lastCheckpointPassed = true;
    }
    
    // If player crossed finish line after checkpoint, count a lap
    if (lastCheckpointPassed && distanceToFinish < 50) {
        lapCount++;
        lastCheckpointPassed = false;
        document.getElementById('lap').textContent = `Lap: ${lapCount}/3`;
        
        // If completed 3 laps, end game
        if (lapCount >= 3) {
            soundEffects.victory.play();
            gameState = GAME_STATE.GAME_OVER;
        }
    }
    
    // Update UI
    document.getElementById('speed').textContent = `Speed: ${Math.round(playerSpeed)} mph`;
}

// Render game elements
function renderGame() {
    // Draw track
    renderer.drawTrack();
    
    // Draw AI cars
    aiCars.forEach(car => {
        renderer.drawCar(car.position.x, car.position.y, car.position.angle, car.color);
    });
    
    // Draw player cart
    renderer.drawCar(playerX, playerY, playerAngle, 'red');
}

// Start the game
function startGame() {
    console.log("Starting game...");
    gameState = GAME_STATE.PLAYING;
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('hud').classList.remove('hidden');
    
    // Reset player position - start at the bottom of track
    playerX = renderer.trackCenter.x;
    playerY = renderer.trackCenter.y + renderer.trackOuterRadius.y - 50;
    playerSpeed = 0;
    playerAngle = -Math.PI / 2; // Pointing up
    
    // Reset lap counter
    lapCount = 0;
    lastCheckpointPassed = false;
    
    // Create AI opponents
    aiCars = [
        new AICar(renderer.trackCenter, 0, 1.2, 'blue'),
        new AICar(renderer.trackCenter, 2, 1.0, 'green'),
        new AICar(renderer.trackCenter, 4, 0.8, 'yellow')
    ];
    
    // Play sounds
    soundEffects.engineStart.play();
    
    // Start the game controller
    gameController.startGame();
}

// Restart the game
function restartGame() {
    gameState = GAME_STATE.PLAYING;
    document.getElementById('game-over').classList.add('hidden');
    document.getElementById('hud').classList.remove('hidden');
    
    // Reset player position
    playerX = renderer.trackCenter.x;
    playerY = renderer.trackCenter.y + renderer.trackOuterRadius.y - 50;
    playerSpeed = 0;
    playerAngle = -Math.PI / 2; // Pointing up
    
    // Reset lap counter
    lapCount = 0;
    lastCheckpointPassed = false;
    
    // Create AI opponents
    aiCars = [
        new AICar(renderer.trackCenter, 0, 1.2, 'blue'),
        new AICar(renderer.trackCenter, 2, 1.0, 'green'),
        new AICar(renderer.trackCenter, 4, 0.8, 'yellow')
    ];
    
    // Play the engine start sound
    soundEffects.engineStart.play();
    
    // Restart the game controller
    gameController.startGame();
}

// Initialize the game when the page loads
window.addEventListener('load', init);