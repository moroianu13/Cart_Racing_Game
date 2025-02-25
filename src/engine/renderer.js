/**
 * Game Renderer
 * Handles all drawing operations and provides collision detection helpers
 */
class Renderer {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.width = 800;
        this.height = 600;
        this.initialized = false;
        
        // Track definition
        this.trackInnerRadius = { x: 250, y: 150 };
        this.trackOuterRadius = { x: 350, y: 250 };
        this.trackCenter = { x: 400, y: 300 };
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
        
        // Draw grass background
        this.ctx.fillStyle = '#228B22'; // Forest Green
        this.ctx.fillRect(0, 0, this.width, this.height);
    }
    
    drawTrack() {
        if (!this.initialized) return;
        
        const { x: cx, y: cy } = this.trackCenter;
        const { x: innerX, y: innerY } = this.trackInnerRadius;
        const { x: outerX, y: outerY } = this.trackOuterRadius;
        
        // Draw outer track edge
        this.ctx.fillStyle = '#333333'; // Dark gray for asphalt
        this.ctx.beginPath();
        this.ctx.ellipse(cx, cy, outerX, outerY, 0, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Draw inner track edge (creates the oval track)
        this.ctx.fillStyle = '#228B22'; // Forest Green for grass infield
        this.ctx.beginPath();
        this.ctx.ellipse(cx, cy, innerX, innerY, 0, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Draw starting line
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(cx - 5, cy + innerY, 10, outerY - innerY);
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
    
    // Check if a point is within the track boundaries
    isPointOnTrack(x, y) {
        const { x: cx, y: cy } = this.trackCenter;
        const { x: innerX, y: innerY } = this.trackInnerRadius;
        const { x: outerX, y: outerY } = this.trackOuterRadius;
        
        // Calculate normalized elliptical coordinates
        const outerValue = Math.pow((x - cx) / outerX, 2) + Math.pow((y - cy) / outerY, 2);
        const innerValue = Math.pow((x - cx) / innerX, 2) + Math.pow((y - cy) / innerY, 2);
        
        // Point is on track if it's inside outer ellipse but outside inner ellipse
        return outerValue <= 1 && innerValue >= 1;
    }
}

export default new Renderer();