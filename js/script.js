import { CONFIG } from "./config.js";
import { Observable } from "./Observable.js";
import { Canvas } from "./Canvas.js";
import {Direction} from "./Direction.js";
import {randomPosition, samePosition, snakeIntersectingItself, snakeOutsideBoundaries} from "./utils.js";

// Verify all expected elements are present

const canvasElement = document.querySelector(CONFIG.canvasSelector);
if (!canvasElement) throw new Error(`Unable to start application! No element matching ${CONFIG.canvasSelector} found!`);

const scoreElement = document.querySelector(CONFIG.scoreSelector);
if (!scoreElement) throw new Error(`Unable to start application! No element matching ${CONFIG.scoreSelector} found!`);

const restartButton = document.querySelector(CONFIG.restartButtonSelector);
if (!restartButton) throw new Error(`Unable to start application! No element matching ${CONFIG.restartButtonSelector} found!`);

const ctx = canvasElement.getContext('2d');
if (!ctx) throw new Error(`Unable to start application! Unable to get canvas context of element ${CONFIG.canvasSelector}!`);

canvasElement.width = `${CONFIG.squareSize * CONFIG.gridWidth}`;
canvasElement.height = `${CONFIG.squareSize * CONFIG.gridHeight}`;

const canvas = new Canvas(ctx);

let inputListener;
const initialise = () => {
    if (inputListener) {
        document.removeEventListener('keydown', inputListener);
    }

    // Define app state
    const BoardState = new Observable({
        snake: [{ x: 0, y: 0 }],
        fruit: randomPosition([{ x: 0, y: 0 }])
    });

    const GameState = new Observable({
        score: 0,
        gameOver: false
    });

    // Renders snake and fruit
    BoardState.addObserverAndRun(({ snake, fruit }) => {
        canvas.clear();
        snake.forEach(({ x, y }) => canvas.draw(x, y));
        canvas.draw(fruit.x, fruit.y, 'red');
    });

    // Renders the score text, or game over if the snake is out of boundaries
    GameState.addObserverAndRun(state => {
        scoreElement.innerText = state.gameOver ? 'Game Over' : `Score: ${state.score}`;
        restartButton.style.display = state.gameOver ? 'block' : 'none';
    });

    // If the game state is now game over, cancel the tick interval
    let interval;
    GameState.addObserver(state => {
        if (!state.gameOver) return;

        clearInterval(interval);
    });

    let direction = CONFIG.initialDirection;
    const onTick = () => {
        const { snake, fruit } = BoardState.value;
        const snakeHead = snake[0];
        const newSnakeHead = {
            x: snakeHead.x + direction.x,
            y: snakeHead.y + direction.y
        };

        let snakeBody = snake;

        if (!samePosition(newSnakeHead, fruit)) {
            snakeBody = snakeBody.slice(0, -1);
        }

        let newSnake = [newSnakeHead, ...snakeBody];

        if (snakeOutsideBoundaries(newSnakeHead) || snakeIntersectingItself(newSnake)) {
            GameState.map(state => ({ ...state, gameOver: true }));
            return;
        }

        if (samePosition(newSnakeHead, fruit)) {
            BoardState.map(state => ({ ...state, fruit: randomPosition(newSnake) }));
            GameState.map(state => ({ ...state, score: state.score + 1 }));
        }

        BoardState.map(state => ({ ...state, snake: [newSnakeHead, ...snakeBody] }));
    };

    interval = setInterval(onTick, 1000/CONFIG.ticksPerSecond);

    inputListener = e => {
        switch (e.key) {
            case "ArrowUp": return direction = Direction.UP;
            case "ArrowRight": return direction = Direction.RIGHT;
            case "ArrowDown": return direction = Direction.DOWN;
            case "ArrowLeft": return direction = Direction.LEFT;
        }
    };
    document.addEventListener('keydown', inputListener);
};

restartButton.addEventListener('click', initialise);

initialise();