export function updateHUD(score, lap, position) {
    const hudElement = document.getElementById('hud');
    hudElement.innerHTML = `
        <div>Score: ${score}</div>
        <div>Lap: ${lap}</div>
        <div>Position: ${position}</div>
    `;
}

export function renderHUD() {
    const hudElement = document.createElement('div');
    hudElement.id = 'hud';
    hudElement.style.position = 'absolute';
    hudElement.style.top = '10px';
    hudElement.style.left = '10px';
    hudElement.style.color = 'white';
    hudElement.style.fontSize = '20px';
    document.body.appendChild(hudElement);
}