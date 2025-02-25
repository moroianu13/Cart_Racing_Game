export default class InputController {
    constructor() {
        this.keys = {
            up: false,
            down: false,
            left: false,
            right: false
        };
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        window.addEventListener('keydown', (e) => this.handleKeyDown(e));
        window.addEventListener('keyup', (e) => this.handleKeyUp(e));
    }
    
    handleKeyDown(event) {
        switch(event.key) {
            case 'ArrowUp':
                this.keys.up = true;
                break;
            case 'ArrowDown':
                this.keys.down = true;
                break;
            case 'ArrowLeft':
                this.keys.left = true;
                break;
            case 'ArrowRight':
                this.keys.right = true;
                break;
        }
    }
    
    handleKeyUp(event) {
        switch(event.key) {
            case 'ArrowUp':
                this.keys.up = false;
                break;
            case 'ArrowDown':
                this.keys.down = false;
                break;
            case 'ArrowLeft':
                this.keys.left = false;
                break;
            case 'ArrowRight':
                this.keys.right = false;
                break;
        }
    }
    
    isKeyPressed(key) {
        return this.keys[key];
    }
}