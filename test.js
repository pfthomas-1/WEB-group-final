const area = document.getElementById("myCanvas");
const player = document.createElement("div")
const cars = document.createElement("div");

let is_punching = false
let on_car = false 
let is_jumping = false
let counter = 0

function generateCar () {
    if (counter % 2 == 0) {
        cars.classList.add('car');
    } else {
        cars.classList.add('car2');    
    }
    
    cars.onanimationend = function() {
        cars.classList.value = ""
    }

    counter += 1
}


function punch() {
    is_punching = true
    player.style.animation = ".5s linear punch"
    player.onanimationend = function() {
        player.style.animation = ".5s infinite sprint"
        is_punching = false
    }
}


function jump() {
    is_jumping = true
    player.style.animation = ".5s ease-out jump"
    player.onanimationend = function() {
        player.style.animation = ".5s infinite sprint"
        is_jumping = false
    }
}


function slide() {
    player.style.animation = ".5s ease-out slide"
    player.onanimationend = function() {
        player.style.animation = ".3s infinite sprint"
    }
}


function collisions() {
    let playerHitbox = player.getBoundingClientRect()
    let carsHitbox = cars.getBoundingClientRect()
    if (is_punching && playerHitbox.right < carsHitbox.left && (playerHitbox.right + 20) > carsHitbox.left) {
        cars.classList.value = ""
    
    } if (Math.round(playerHitbox.bottom) == Math.round(carsHitbox.top) && (playerHitbox.right > Math.round(carsHitbox.left))){   
        is_jumping = false
        on_car = true
        player.style.bottom = `500px`; // thank you ChatGPT
    
    } else if (!on_car && playerHitbox.bottom > carsHitbox.top && (playerHitbox.right > Math.round(carsHitbox.left) && Math.round(carsHitbox.left) > playerHitbox.left)) {
        // if the player's bottom is under the car's top  and  if the car's left side position is in between the player's left and right sides; did it this way because otherwise when the car passed under the player it would still trigger this
        alert("you lose")
    
    // } if (on_car && playerHitbox.y > carsHitbox.right) {
    //     on_car = false
    //     player.style.bottom = "0px";
    } 
}


function main() {
    area.appendChild(player);
    player.classList.add("player");
    area.appendChild(cars);
    setInterval(collisions, .5);
    setInterval(generateCar, 3000);

    // handles all keybinds
    document.addEventListener("keydown", function(event) {
        if (event.key == "ArrowUp") {
            jump()
        // fast fall code check if the down arrow is being clicked while the player is jumping
        } if (event.key == "ArrowDown" && is_jumping) {
            player.style.animationDuration = ".4s"
        } if (event.key == "ArrowDown" && !is_jumping) {
            slide()
        } if (event.key == "ArrowRight") {
            punch()
        }
    })
}


main()

