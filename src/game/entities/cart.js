class Cart {
    constructor(model) {
        this.model = model;
        this.speed = model.speed;
        this.handling = model.handling;
        this.position = { x: 0, y: 0 };
        this.direction = 0; // Angle in radians
    }

    move() {
        this.position.x += this.speed * Math.cos(this.direction);
        this.position.y += this.speed * Math.sin(this.direction);
    }

    turn(angle) {
        this.direction += angle;
    }

    update() {
        this.move();
        // Additional update logic can be added here
    }

    getPosition() {
        return this.position;
    }
}

export default Cart;