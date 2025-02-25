class Player {
    constructor(name) {
        this.name = name;
        this.position = { x: 0, y: 0 };
        this.speed = 0;
        this.acceleration = 0.1;
        this.maxSpeed = 5;
        this.direction = 0; // Angle in degrees
    }

    moveForward() {
        if (this.speed < this.maxSpeed) {
            this.speed += this.acceleration;
        }
        this.updatePosition();
    }

    moveBackward() {
        if (this.speed > -this.maxSpeed) {
            this.speed -= this.acceleration;
        }
        this.updatePosition();
    }

    turnLeft() {
        this.direction -= 5; // Turn left by 5 degrees
    }

    turnRight() {
        this.direction += 5; // Turn right by 5 degrees
    }

    updatePosition() {
        this.position.x += this.speed * Math.cos(this.direction * (Math.PI / 180));
        this.position.y += this.speed * Math.sin(this.direction * (Math.PI / 180));
    }

    getPosition() {
        return this.position;
    }

    getSpeed() {
        return this.speed;
    }

    reset() {
        this.position = { x: 0, y: 0 };
        this.speed = 0;
        this.direction = 0;
    }
}

export default Player;