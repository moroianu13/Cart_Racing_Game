export const scoreBoard = {
    scores: [],

    addScore(playerName, score) {
        this.scores.push({ playerName, score });
        this.scores.sort((a, b) => b.score - a.score);
    },

    resetScores() {
        this.scores = [];
    },

    displayScores() {
        const scoreList = this.scores.map(entry => `${entry.playerName}: ${entry.score}`).join('\n');
        console.log("Scoreboard:\n" + scoreList);
    }
};