import {CONFIG} from "./config.js";

/**
 * Returns a random integer between min and max inclusively.
 *
 * @param min The minimum value to be generated.
 * @param max The maximum value to be generated.
 * @returns A random integer.
 */
export const getRandomNumber = (min, max) => Math.floor(Math.random() * ( max - min + 1 )) + min;

/**
 * Generates a random position between 0 and the configured grid width / height that does not currently exist within
 * existing positions.
 *
 * @param {Array<{ x: number, y: number }>} existingPositions A list of existing positions.
 * @returns {{x: *, y: *}} A random position that does not exist within existingPositions.
 */
export const randomPosition = existingPositions => {
    let randomPosition;

    do {
        randomPosition = {
            x: getRandomNumber(0, CONFIG.gridWidth-1),
            y: getRandomNumber(0, CONFIG.gridHeight-1),
        };
    } while (existingPositions.some(({ x, y }) => x === randomPosition.x && y === randomPosition.y));

    return randomPosition;
};

/**
 * Returns whether the snake head is currently outside of the grid boundaries.
 *
 * @param x The x coordinate of the snake head.
 * @param y The y coordinate of the snake head.
 * @returns {boolean} Whether the snake head is currently outside of the grid boundaries.
 */
export const snakeOutsideBoundaries = ({ x, y }) => x < 0 || x >= CONFIG.gridWidth || y < 0 || y >= CONFIG.gridHeight;

/**
 * Returns whether the given positions are the same.
 *
 * @param {{ x: number, y: number }} pos1
 * @param {{ x:number, y: number }} pos2
 * @returns {boolean} Whether the given positions are the same.
 */
export const samePosition = (pos1, pos2) => pos1.x === pos2.x && pos1.y === pos2.y;

/**
 * Returns whether the snake is intersecting itself, i.e. has any duplicate positions in the body.
 *
 * @param {Array<{ x: number, y: number }>} snake The list of positions in the snake body.
 * @returns {boolean} Whether the snake is currently intersecting itself.
 */
export const snakeIntersectingItself = snake => {
    const head = snake[0];
    const body = snake.slice(1);

    return body.some(pos => samePosition(head, pos));
};

