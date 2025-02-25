function checkCollision(entityA, entityB) {
    const aRect = entityA.getBounds();
    const bRect = entityB.getBounds();

    return !(
        aRect.right < bRect.left ||
        aRect.left > bRect.right ||
        aRect.bottom < bRect.top ||
        aRect.top > bRect.bottom
    );
}

function resolveCollision(entityA, entityB) {
    const overlapX = (entityA.width / 2 + entityB.width / 2) - Math.abs(entityA.x - entityB.x);
    const overlapY = (entityA.height / 2 + entityB.height / 2) - Math.abs(entityA.y - entityB.y);

    if (overlapX < overlapY) {
        if (entityA.x < entityB.x) {
            entityA.x -= overlapX;
        } else {
            entityA.x += overlapX;
        }
    } else {
        if (entityA.y < entityB.y) {
            entityA.y -= overlapY;
        } else {
            entityA.y += overlapY;
        }
    }
}

export { checkCollision, resolveCollision };