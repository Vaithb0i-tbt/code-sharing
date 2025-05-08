const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const GRAVITY = 0.6;
const FLAP = -12;
const SPAWN_RATE = 90; // Time between new pipes

let birdY = canvas.height / 2;
let birdVelocity = 0;
let birdFlap = false;

let pipes = [];
let pipeWidth = 60;
let pipeGap = 120;
let score = 0;

let gameOver = false;

document.addEventListener("keydown", () => {
    if (!gameOver) {
        birdVelocity = FLAP;
    }
});

function spawnPipe() {
    let pipeHeight = Math.floor(Math.random() * (canvas.height - pipeGap));
    pipes.push({
        x: canvas.width,
        y: pipeHeight,
        width: pipeWidth,
        passed: false
    });
}

function updatePipes() {
    for (let i = pipes.length - 1; i >= 0; i--) {
        pipes[i].x -= 2;

        // Remove pipe if it's off screen
        if (pipes[i].x + pipes[i].width < 0) {
            pipes.splice(i, 1);
        }

        // Increase score when the bird passes the pipe
        if (!pipes[i].passed && pipes[i].x + pipes[i].width < birdY) {
            pipes[i].passed = true;
            score++;
        }
    }
}

function detectCollision() {
    // Check for collision with ground
    if (birdY >= canvas.height - 30) {
        gameOver = true;
        alert("You Haydened!");
    }

    // Check for collision with pipes
    for (let pipe of pipes) {
        if (birdY < pipe.y || birdY > pipe.y + pipeGap) {
            if (pipe.x <= 50 && pipe.x + pipeWidth >= 50) {
                gameOver = true;
                alert("You Haydened!");
            }
        }
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (gameOver) return;

    birdVelocity += GRAVITY;
    birdY += birdVelocity;

    // Draw the bird
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(50, birdY, 15, 0, Math.PI * 2);
    ctx.fill();

    // Spawn pipes
    if (score % SPAWN_RATE === 0) {
        spawnPipe();
    }

    updatePipes();
    detectCollision();

    // Draw pipes
    ctx.fillStyle = "green";
    for (let pipe of pipes) {
        ctx.fillRect(pipe.x, 0, pipe.width, pipe.y);
        ctx.fillRect(pipe.x, pipe.y + pipeGap, pipe.width, canvas.height - pipe.y - pipeGap);
    }

    // Draw score
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 30);

    // Request next frame
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
