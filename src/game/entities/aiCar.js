/**
 * AI Car Entity
 * Computer-controlled racing opponent
 */
export default class AICar {
    constructor(trackCenter, startAngle, speed, color) {
        // Position and movement
        this.angle = startAngle;
        this.trackCenter = trackCenter;
        this.trackRadius = { x: 300, y: 200 }; // Middle of the track
        this.speed = speed;
        this.position = this.calculatePosition();
        
        // Appearance
        this.color = color || this.getRandomColor();
    }
    
    update(deltaTime) {
        // Update angle based on speed (move around the track)
        this.angle += this.speed * (deltaTime / 1000);
        
        // Keep angle between 0 and 2π
        if (this.angle > Math.PI * 2) {
            this.angle -= Math.PI * 2;
        }
        
        // Calculate new position
        this.position = this.calculatePosition();
    }
    
    calculatePosition() {
        // Calculate position on an elliptical path
        const x = this.trackCenter.x + Math.cos(this.angle) * this.trackRadius.x;
        const y = this.trackCenter.y + Math.sin(this.angle) * this.trackRadius.y;
        
        // Vary the position slightly to make movement more natural
        const randomOffset = Math.sin(this.angle * 5) * 10;
        
        return {
            x,
            y: y + randomOffset,
            angle: this.angle + Math.PI / 2 // Car faces tangent to the ellipse
        };
    }
    
    getRandomColor() {
        const colors = ['blue', 'green', 'yellow', 'purple', 'orange'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
}