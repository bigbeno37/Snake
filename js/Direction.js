/**
 * Represents an enum that specifies direction of the snake. Each "tick" the snake's X and Y coordinates will be
 * updated according to the current direction.
 *
 * NOTE: (0,0) corresponds to the top left, with increasing values going to the right downwards.
 */
export const Direction = {
    UP: { x: 0, y: -1 },
    RIGHT: { x: 1, y: 0 },
    DOWN: { x: 0, y: 1 },
    LEFT: { x: -1, y: 0 },
};