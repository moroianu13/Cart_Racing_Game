class Renderer {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.width = 800;
        this.height = 600;
        this.initialized = false;
    }
    
    init(width, height) {
        this.width = width;
        this.height = height;
        this.canvas = document.getElementById('game-canvas');
        
        if (!this.canvas) {
            console.error('Canvas element not found!');
            return;
        }
        
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.initialized = true;
        console.log('Renderer initialized');
    }
    
    clear() {
        if (!this.initialized) return;
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
    
    drawTrack() {
        if (!this.initialized) return;
        // Draw track (simple oval)
        this.ctx.strokeStyle = 'white';
        this.ctx.lineWidth = 20;
        this.ctx.beginPath();
        this.ctx.ellipse(this.width/2, this.height/2, 300, 200, 0, 0, Math.PI * 2);
        this.ctx.stroke();
    }
    
    drawCar(x, y, angle, color = 'red') {
        if (!this.initialized) return;
        
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(angle);
        
        // Car body
        this.ctx.fillStyle = color;
        this.ctx.fillRect(-15, -25, 30, 50);
        
        // Wheels
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(-20, -20, 10, 15);
        this.ctx.fillRect(-20, 5, 10, 15);
        this.ctx.fillRect(10, -20, 10, 15);
        this.ctx.fillRect(10, 5, 10, 15);
        
        this.ctx.restore();
    }
}

export default new Renderer();