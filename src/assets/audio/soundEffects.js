const soundEffects = {
    engineStart: {
        play() { 
            console.log('Playing sound: engine start'); 
        }
    },
    engineRunning: {
        play() { 
            console.log('Playing sound: engine running'); 
        }
    },
    engineStop: {
        play() { 
            console.log('Playing sound: engine stop'); 
        }
    },
    crash: {
        play() { 
            console.log('Playing sound: crash!'); 
        }
    },
    horn: {
        play() { 
            console.log('Playing sound: horn'); 
        }
    },
    victory: {
        play() { 
            console.log('Playing sound: victory!'); 
        }
    }
};

export default soundEffects;