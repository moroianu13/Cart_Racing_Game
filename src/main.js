// Main entry point for the cart racing game

import GameController from './game/controllers/gameController.js';
import InputController from './game/controllers/inputController.js';
import renderer from './engine/renderer.js';
import { playMusic } from './assets/audio/music.js';
import soundEffects from './assets/audio/soundEffects.js';

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
let gameController;
let inputController;

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
            // Draw a simple start screen on canvas
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
            break;
    }
    
    // Continue the game loop
    requestAnimationFrame(gameLoop);
}

// Update game logic
function updateGame(deltaTime) {
    // Check player input
    if (inputController.isKeyPressed('up')) {
        playerSpeed = Math.min(playerSpeed + 1, 200);
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
    
    // Update player position based on speed and angle
    playerX += Math.sin(playerAngle) * playerSpeed * (deltaTime / 1000);
    playerY -= Math.cos(playerAngle) * playerSpeed * (deltaTime / 1000);
    
    // Keep player within canvas bounds
    playerX = Math.max(50, Math.min(CONFIG.canvasWidth - 50, playerX));
    playerY = Math.max(50, Math.min(CONFIG.canvasHeight - 50, playerY));
    
    // Update UI
    document.getElementById('speed').textContent = `Speed: ${Math.round(playerSpeed)} mph`;
}

// Render game elements
function renderGame() {
    // Draw track
    renderer.drawTrack();
    
    // Draw player cart
    renderer.drawCar(playerX, playerY, playerAngle, 'red');
    
    // Additional rendering can be added here
}

// Start the game
function startGame() {
    console.log("Starting game...");
    gameState = GAME_STATE.PLAYING;
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('hud').classList.remove('hidden');
    
    // Reset player position
    playerX = 400;
    playerY = 500;
    playerSpeed = 0;
    playerAngle = 0;
    
    // Play the engine start sound
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
    playerX = 400;
    playerY = 500;
    playerSpeed = 0;
    playerAngle = 0;
    
    // Play the engine start sound
    soundEffects.engineStart.play();
    
    // Restart the game controller
    gameController.startGame();
}

// Initialize the game when the page loads
window.addEventListener('load', init);