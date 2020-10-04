let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
let food = {
    x: Math.floor(Math.random()* 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}
function criarBG(){
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16* box);
}

function criarCobrinha(){
  for(i=0; i < snake.length; i++){
      context.fillStyle = "green";
      context.fillRect(snake[i].x, snake[i].y, box, box);
  }

}
// A funcao da comida da cobra
function drowFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}
//funcao update para controlar a direcao da cobrinha atravez do (EVENT) pelas teclas do teclado.

document.addEventListener("keydown", update);

function update(Event){
  if(Event.keyCode == 37 && direction != "right") direction ="left";
  if(Event.keyCode == 38 && direction != "down") direction ="up";
  if(Event.keyCode == 39 && direction != "left") direction ="right";
  if(Event.keyCode == 40 && direction != "up") direction ="down";

}

function iniciarJogo(){
// alterar a direcao da cobrinha quando ela for sair do quadrado verde.
 
 if(snake[0].x > 15 * box && direction == "right")snake[0].x = 0;
 if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
 if(snake[0].y > 15 * box && direction == "down")snake[0].y = 0;
 if(snake[0].x < 0 && direction == "up") snake[0].y = 16 * box;
 
 //Funçõa parar a cobra quando ela encostar no corpo dela.

 for(i=1;i < snake.length; i++){
     if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
         clearInterval(jogo);
         alert("GAME OVER! :(")
     }
 }
 criarBG();
 criarCobrinha();
 drowFood();
 let snakeX = snake[0].x;
 let snakeY = snake[0].y;

 // direção que vai adicionar ou diminuir os quadradinhos de acordo com a direção.

 if(direction =="right") snakeX += box;
 if(direction =="left") snakeX -= box;
 if(direction =="up") snakeY -= box;
 if(direction =="down") snakeY += box;

// condicao de quando a cobra comer a comida

if(snakeX != food.x || snakeY != food.y){
    snake.pop();
}
else{
    food.x = Math.floor(Math.random() * 15 + 1) * box,
    food.y = Math.floor(Math.random() * 15 + 1) * box
}

 // vai acrescentar sempre uma cabeça a frente

 let newHeader = {
     x: snakeX,
     y: snakeY,
 }

 snake.unshift(newHeader);

}

// iniciar a cada milisegundos para nao travar o jogo.
let jogo = setInterval(iniciarJogo, 100);


