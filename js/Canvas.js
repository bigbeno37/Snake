import { CONFIG } from './config.js';

/**
 * A utility wrapper for a canvas context to easily draw squares that fit to a virtual grid.
 */
export class Canvas {
    /**
     * The canvas context to draw / clear.
     */
    #_ctx;

    constructor(ctx) {
        this.#_ctx = ctx;
    }

    /**
     * Clears the given canvas context.
     */
    clear() {
        this.#_ctx.clearRect(0, 0, CONFIG.gridWidth * CONFIG.squareSize, CONFIG.gridHeight * CONFIG.squareSize);
    }

    /**
     * Draws a square to the canvas. The given x and y correspond to the virtual grid, NOT the actual pixel position
     * on the canvas itself. The virtual grid coordinates will be converted using the config.
     *
     * @param x The grid X coordinate to draw a square on.
     * @param y The grid Y coordinate to draw a square on.
     * @param color The color to fill the square with. "black" by default.
     */
    draw(x, y, color = 'black') {
        this.#_ctx.fillStyle = color;
        this.#_ctx.fillRect(x * CONFIG.squareSize, y * CONFIG.squareSize, CONFIG.squareSize, CONFIG.squareSize);
    }
}