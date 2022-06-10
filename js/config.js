import { Direction } from "./Direction.js";

/**
 * The configuration to use for the game. This is effectively the single source of truth for constant values.
 */
export const CONFIG = {
    /**
     * Selector for the canvas that will be drawn to.
     */
    canvasSelector: '#game',

    /**
     * Selector for the element that will be updated with the game's state.
     */
    scoreSelector: '#score',

    /**
     * Selector for the button element that will be used to restart the game.
     */
    restartButtonSelector: '#restart',

    /**
     * How many times a second the snake will move in the current direction.
     */
    ticksPerSecond: 4,

    /**
     * How big a square should be in px. This will be used for translation from virtual grid coordinates to actual
     * canvas coordinates.
     */
    squareSize: 25,

    /**
     * The amount of squares across the grid should be.
     */
    gridWidth: 20,

    /**
     * The amount of squares in height the grid should be.
     */
    gridHeight: 20,

    /**
     * The initial position of the snake.
     */
    spawnPosition: { x: 0, y: 0 },

    /**
     * The initial direction of the snake.
     */
    initialDirection: Direction.RIGHT,
};