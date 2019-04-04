const cvs = document.getElementById('canvas')
const ctx = cvs.getContext('2d');

const ground = new Image();
ground.src = "images/background.png";

const foodImg = new Image();
foodImg.src = "images/food.png";

const box = 20;

let snake = [ ];
snake[0] = {
    x : 5 * box,
    y : 7 * box
}

let food = {
    x : Math.floor(Math.random() *  10 +1 ) * box,
    y : Math.floor(Math.random() * 11 + 3 ) * box
}

let d ;

document.addEventListener('keydown', direction);

function direction(event) {
    let key = event.keyCode;
    if(key === 37){
        d = 'LEFT'
    }else if(key === 38){
        d = 'UP'
    }else if(key === 39){
        d = 'RIGHT'
    }else if(key === 40){
        d = 'DOWN'
    }
}


function draw() {
    ctx.drawImage(ground, 0, 0)
    for(var i=0; i< snake.length; i++){
       ctx.fillStyle = (i === 0 ) ? 'black' : 'white'; 
       ctx.fillRect(snake[i].x, snake[i].y, box, box)
    }


    ctx.drawImage(foodImg, food.x, food.y)
    
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(snakeX === food.x && snakeY === food.y){
        food = {
            x : Math.floor(Math.random() *  8  ) * box,
            y : Math.floor(Math.random() * 8  ) * box
        }
    }else{
            snake.pop();
        }

    if(snakeX < 2 * box || snakeX > 20 * box || snakeY < 2 * box || snakeY > 20 * box){
        clearInterval(gameOver)
    }

    

    if(d === 'LEFT'){ snakeX -= box }
    if(d === 'UP'){ snakeY -= box }
    if(d === 'RIGHT'){ snakeX += box }
    if(d === 'DOWN'){ snakeY += box }

    let newHead = {
        x : snakeX,
        y : snakeY
    }

    snake.unshift(newHead);
 
}


let gameOver = setInterval(draw, 100)