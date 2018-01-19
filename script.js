var game = document.getElementById('game').getContext('2d');
var scoreElement = document.getElementById('score');

var gameHeight = 500;
var gameWidth = 500;
var snakeSize = 25;

var score = 0;

// Keeps track of if the game is over or not
var gameOver = false;

// Current location of the snake
var currentX = 0;
var currentY = 0;

// Store the positions of the snake
var positions = [];

// Current location of the fruit
// Will be randomised in initialise()
var fruitX = 0;
var fruitY = 0;
var fruitColour = '#ff7373';

// How often to refresh the screen
var fps = 5;
var tickTime = 1000/fps;

// The cardinal directions that the player can go
// Used to calculate the end position the player will go to after a tick
var direction = {
    UP: {x: 0, y: -1},
    RIGHT: {x: 1, y: 0},
    LEFT: {x: -1, y: 0},
    DOWN: {x: 0, y: 1}
};

// The default direction the snake will head in is directly right
var currentDirection = direction.RIGHT;

// Randomise the location of the fruit
function chooseFruitLocation() {
    // Calculate a number between 0 and the gameWidth and then
    // round to the nearest 'snakeSize' (eg. if snakeSize was 50, round to the nearest 50)
    fruitX = Math.round( (Math.random() * gameWidth) / snakeSize ) * snakeSize;
    fruitY = Math.round( (Math.random() * gameWidth) / snakeSize ) * snakeSize;

    // Verify that the fruit is not out of bounds; if it is, bring it back to the edge
    if (fruitX > gameWidth-snakeSize) {
        fruitX -= snakeSize;
    }

    if (fruitY > gameWidth-snakeSize) {
        fruitY -= snakeSize;
    }

    // Go through the tail sections and the head, and if the fruit is currently in them, spawn in
    // a different random location
    for (var i = 0; i < positions.length; i++) {
        if ((fruitX === positions[i].x && fruitY === positions[i].y)
            || (fruitX === currentX && fruitY === currentY)) {
            chooseFruitLocation();
        }
    }
}

// Updates the #score element with the current score
function updateScore() {
    scoreElement.innerText = 'Your score is: ' + score;
}

// Called when the game is first started
function initialise() {
    game.canvas.height = gameHeight;
    game.canvas.width = gameWidth;

    game.clearRect(0, 0, gameWidth, gameHeight);

    chooseFruitLocation();
    updateScore();

    drawSnake();
    drawSquareAt(fruitX, fruitY, fruitColour);
}

// Returns if the snake is touching its tail
function isTouchingTail(x, y) {
    // Go through each square in the tail
    for (var i = 0; i < positions.length; i++) {
        // If the snake is in the same position as a section of the tail, return true
        if (x === positions[i].x && y === positions[i].y) {
            return true;
        }
    }

    return false;
}

// Called every 1000/fps milliseconds, and handles determining the snake's new location and drawing
function tick() {
    if (!gameOver) {
        // Clear the current frame
        game.clearRect(0, 0, gameHeight, gameWidth);

        // If the location of the snake matches the location of the fruit, add one point
        // and refresh the location of the fruit to a new location
        if (currentX === fruitX && currentY === fruitY) {
            score++;
            updateScore();

            chooseFruitLocation();
        }

        positions.unshift({x: currentX, y: currentY});

        if (positions.length > score) {
            positions.pop();
        }

        var newX = currentX + currentDirection.x * snakeSize;
        var newY = currentY + currentDirection.y * snakeSize;

        // If the snake is outside the boundaries OR is touching its own tail, then end the game
        if (newX > gameWidth || newX < 0
            || newY > gameHeight || newY < 0
            || isTouchingTail(newX, newY)) {
            gameOver = true;
        } else {
            // Move the snake in the direction that was pressed
            currentX = newX;
            currentY = newY;
        }

        // Draw both the snake and the fruit
        drawSquareAt(fruitX, fruitY, fruitColour);
        drawSnake();
    } else {
        scoreElement.innerHTML = 'Game over! Would you like to play again?<br><button onclick="reset()">Restart</button>';

        clearInterval(tickInterval);
    }
}

function reset() {
    positions = [];
    gameOver = false;
    currentX = 0;
    currentY = 0;
    currentDirection = direction.RIGHT;
    score = 0;

    initialise();
    tickInterval = window.setInterval(tick, tickTime);
}

// Helper function to draw a square at a specific location
// Used to draw the snake and fruit
function drawSquareAt(x, y, colour) {
    game.fillStyle = colour;
    game.fillRect(x, y, snakeSize, snakeSize);
}

// Handle drawing the entirety of the snake
function drawSnake() {
    for (var i = 0; i < positions.length; i++) {
        drawSquareAt(positions[i].x, positions[i].y, 'black');
    }

    drawSquareAt(currentX, currentY, 'black');
}

initialise();

// Call tick() every 'tickTime' milliseconds
var tickInterval = window.setInterval(tick, tickTime);

// Thanks to ketan from
// https://stackoverflow.com/questions/5597060/detecting-arrow-key-presses-in-javascript
// Determine the key pressed, and change the current direction of the snake (used in tick())
document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
        currentDirection = direction.UP;
    }
    else if (e.keyCode == '40') {
        // down arrow
        currentDirection = direction.DOWN;
    }
    else if (e.keyCode == '37') {
        // left arrow
        currentDirection = direction.LEFT;
    }
    else if (e.keyCode == '39') {
        // right arrow
        currentDirection = direction.RIGHT;
    }

}