var game = document.getElementById('game').getContext('2d');

var gameHeight = 500;
var gameWidth = 500;
var snakeSize = 25;

var score = 0;

// Current location of the snake
var currentX = 0;
var currentY = 0;

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

function randomiseFruitLocation() {
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
}

// Updates the #score element with the current score
function updateScore() {
    document.getElementById('score').innerText = '' + score;
}

// Called when the game is first started
function initialise() {
    game.canvas.height = gameHeight;
    game.canvas.width = gameWidth;

    randomiseFruitLocation();
    updateScore();

    drawSquareAt(currentX, currentY, 'black');
    drawSquareAt(fruitX, fruitY, fruitColour);
}

// Called every 1000/fps milliseconds, and handles determining the snake's new location and drawing
function tick() {
    // Clear the current frame
    game.clearRect(0, 0, gameHeight, gameWidth);

    // Move the snake in the direction that was pressed
    currentX += currentDirection.x * snakeSize;
    currentY += currentDirection.y * snakeSize;

    // If the location of the snake matches the location of the fruit, add one point
    // and refresh the location of the fruit to a new location
    if (currentX === fruitX && currentY === fruitY) {
        score++;
        updateScore();

        randomiseFruitLocation();
    }

    // Draw both the snake and the fruit
    drawSquareAt(currentX, currentY, 'black');
    drawSquareAt(fruitX, fruitY, fruitColour);
}

// Helper function to draw a square at a specific location
// Used to draw the snake and fruit
function drawSquareAt(x, y, colour) {
    game.fillStyle = colour;
    game.fillRect(x, y, snakeSize, snakeSize);
}

initialise();

// Call tick() every 'tickTime' milliseconds
window.setInterval(tick, tickTime);

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