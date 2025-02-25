export function calculateMovement(cart, deltaTime) {
    const acceleration = cart.acceleration;
    const friction = cart.friction;
    
    // Update velocity based on acceleration and friction
    cart.velocity += acceleration * deltaTime;
    cart.velocity *= (1 - friction * deltaTime);
    
    // Update position based on velocity
    cart.position += cart.velocity * deltaTime;
}

export function applyForce(cart, force) {
    cart.acceleration += force / cart.mass;
}

export function updatePhysics(carts, deltaTime) {
    carts.forEach(cart => {
        calculateMovement(cart, deltaTime);
    });
}