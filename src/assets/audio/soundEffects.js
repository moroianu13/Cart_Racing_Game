/**
 * Sound Effects System
 * Handles loading and playing game sound effects
 */

class SoundEffect {
    constructor(src) {
        this.sound = new Audio(src);
        this.sound.load();
    }
    
    play() {
        // Clone and play to allow overlapping sounds
        const soundClone = this.sound.cloneNode();
        soundClone.play().catch(e => console.log("Audio play failed:", e));
    }
    
    stop() {
        this.sound.pause();
        this.sound.currentTime = 0;
    }
}

// Create sound effects with proper file paths
const soundEffects = {
    engineStart: new SoundEffect('./assets/audio/engine-start.mp3'),
    engineRunning: new SoundEffect('./assets/audio/engine-running.mp3'),
    engineStop: new SoundEffect('./assets/audio/engine-stop.mp3'),
    crash: new SoundEffect('./assets/audio/crash.mp3'),
    horn: new SoundEffect('./assets/audio/horn.mp3'),
    victory: new SoundEffect('./assets/audio/victory.mp3')
};

export default soundEffects;