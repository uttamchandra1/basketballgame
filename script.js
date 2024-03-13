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
        this.image.src = "ball.png"
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
            x: 100,
            y: 100
        };
        this.width = 200;
        this.height = 200;

        this.image = new Image();
        this.image.src = "net1.png"
    }

    draw(){
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }

    update(){
        this.draw();
    }

}

class goalArea {
    constructor(){
        this.position = {
            x:145,
            y:190
        };

        this.width = 100
        this.height = 10
    }

    draw(){
        c.fillStyle= "black"
        c.fillRect(this.position.x , this.position.y , this.width , this.height)
    }

    update(){
        this.draw()
    }
}

const hoop = new basketballNet();
const player = new PlayerBall();
const goalarea = new goalArea();

function gameLoop() {
    // Clear the canvas
    c.clearRect(0, 0, canvas.width, canvas.height);
    const backgroundImage = new Image();
    backgroundImage.src = 'background.webp'; 
    c.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    

    // Update and draw the player's ball
    hoop.update();
    player.update();
    goalarea.update();

    if (player.position.x < goalarea.position.x + goalarea.width &&
        player.position.x + player.width > hoop.position.x &&
        player.position.y < goalarea.position.y + goalarea.height &&
        player.position.y + player.height > goalarea.position.y) {
        // Collision detected (player's ball entered the hoop)
        alert("Goal!");
    }

    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();

let velocityX = 0;
let velocityY = 0;
const friction = 0.95; // Adjust this value to control the rate of slowing down

function movePlayer(event) {
    // Calculate the distance moved since the last frame
    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;

    // Update the velocity based on the distance moved
    velocityX += deltaX * 0.1; // You can adjust this factor to control the sensitivity of movement
    velocityY += deltaY * 0.1;

    // Apply friction to gradually slow down the velocity
    velocityX *= friction;
    velocityY *= friction;

    // Calculate the new position of the player
    let newX = player.position.x + velocityX;
    let newY = player.position.y + velocityY;

    // Set the new position
    player.position.x = newX;
    player.position.y = newY;

    // Update starting position for next frame
    startX = event.clientX;
    startY = event.clientY;
}

function animateGoal() {
    // Animate the ball going into the net
    // Here you can implement the animation sequence
    // For example, you can use the drawImage method to draw frames of the ball moving into the net

    // After the animation is complete, show the goal message
    setTimeout(function() {
        alert("Goal!");
    }, 1000); // Adjust the duration as needed
}

canvas.addEventListener('touchstart', (event) => {
    // Get the starting position of the player
    let startX = event.touches[0].clientX;
    let startY = event.touches[0].clientY;

    // Function to move the player
    function movePlayer(event) {
        // Calculate the new position of the player
        let newX = event.touches[0].clientX - startX + player.position.x;
        let newY = event.touches[0].clientY - startY + player.position.y;

        // Set the new position
        player.position.x = newX;
        player.position.y = newY;
        
        // Prevent default touch action which may scroll the page
        event.preventDefault();
    }

    // Add event listeners for touchmove and touchend events
    document.addEventListener('touchmove', movePlayer);

    document.addEventListener('touchend', () => {
        // Remove the event listeners when touch ends
        document.removeEventListener('touchmove', movePlayer);
    });
});


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