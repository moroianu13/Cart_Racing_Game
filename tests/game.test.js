import { GameController } from '../src/game/controllers/gameController';
import { Player } from '../src/game/entities/player';
import { Track } from '../src/game/entities/track';

describe('Game Logic Tests', () => {
    let gameController;
    let player;
    let track;

    beforeEach(() => {
        gameController = new GameController();
        player = new Player();
        track = new Track();
    });

    test('Game should start correctly', () => {
        gameController.start();
        expect(gameController.isRunning).toBe(true);
    });

    test('Player should be able to move', () => {
        player.move('forward');
        expect(player.position).toBeGreaterThan(0);
    });

    test('Track should render correctly', () => {
        const renderResult = track.render();
        expect(renderResult).toBeDefined();
    });

    test('Game should pause correctly', () => {
        gameController.start();
        gameController.pause();
        expect(gameController.isRunning).toBe(false);
    });

    test('Game should reset correctly', () => {
        gameController.start();
        gameController.reset();
        expect(gameController.isRunning).toBe(false);
        expect(player.position).toBe(0);
    });
});