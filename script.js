const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

const averageScreenWidth = 360; // Default average screen width for mobile devices
const averageScreenHeight = 640; // Default average screen height for mobile devices

canvas.width = window.innerWidth < window.innerHeight ? window.innerWidth : averageScreenWidth;
canvas.height = window.innerWidth < window.innerHeight ? window.innerHeight : averageScreenHeight;

class PlayerBall {
    constructor() {
        this.position = {
            x: canvas.width / 2, // Start at the center horizontally
            y: canvas.height-100 // Start at the center vertically
        };
        this.width = 100;
        this.height = 100;

        this.image = new Image();
        this.image.src = "basketball.webp"
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw();
    }

}

class basketballNet {
    constructor(){
        this.position = {
            x: canvas.width /2,
            y: canvas.height / 2
        };
        this.width = 200;
        this.height = 100;

        this.image = new Image();
        this.image.src = "net.webp"
    }

    draw(){
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }

    update(){
        this.draw();
    }


}

const hoop = new basketballNet();
const player = new PlayerBall();

function gameLoop() {
    // Clear the canvas
    c.clearRect(0, 0, canvas.width, canvas.height);
    const backgroundImage = new Image();
    backgroundImage.src = 'background.webp'; 
    c.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    

    // Update and draw the player's ball
    hoop.update();
    player.update();

    if (player.position.x < hoop.position.x + hoop.width &&
        player.position.x + player.width > hoop.position.x &&
        player.position.y < hoop.position.y + hoop.height &&
        player.position.y + player.height > hoop.position.y) {
        // Collision detected (player's ball entered the hoop)
        alert("Goal!");
    }

    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();

canvas.addEventListener('mousedown', (event) => {
    // Get the starting position of the player
    let startX = event.clientX;
    let startY = event.clientY;

    // Function to move the player
    function movePlayer(event) {
        // Calculate the new position of the player
        let newX = event.clientX - startX + player.position.x;
        let newY = event.clientY - startY + player.position.y;

        // Set the new position
        player.position.x = newX;
        player.position.y = newY;
    }

    // Add event listeners for mousemove and mouseup events
    document.addEventListener('mousemove', movePlayer);

    document.addEventListener('mouseup', () => {
        // Remove the event listeners when mouse button is released
        document.removeEventListener('mousemove', movePlayer);
    });
});