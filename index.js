
// Game variables
let velocity={x:0, y:0};
const foodSound=new Audio('./music/food.mp3');
const gameOver= new Audio('./music/gameover.mp3');
const moveSound=new Audio('./music/move.mp3');
const musicSound=new Audio('./music/music.mp3');
const board=document.querySelector('#board');
const speed=4
let score=0
let scoreVal=document.querySelector('#scoreBox')
let hiScoreBox=document.querySelector('#hiScore')
let hiScoreVal=0
let lastPaintTime=0;
let snakeArr=[ { x:5, y:9}];
let food={x:7,y:6}
let reqId
// Game Functions
 
 function main(ctime){
   reqId=window.requestAnimationFrame(main);
   console.log(ctime-lastPaintTime)
   if((ctime-lastPaintTime)/1000< (1/speed)){
     return;
    }
    
    lastPaintTime=ctime;
    gameEngine();
     

 }
   
 function isCollide(snake){
  //if snake hits its body
  for(let i=1;i<snake.length;i++){
    if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
      return true
    }     
  }  
  
  //if snake hits the wall
    if(snake[0].x<=0 || snake[0].x>=18 || snake[0].y<=0 || snake[0].y>=18){
      return true
    }

 }

function gameEngine() {
    // update snake and food
      if(isCollide(snakeArr)){
        gameOver.play()
        alert("Game Over!!")
        snakeArr=[{x:7,y:6}]
        velocity={x:0,y:0}
        score=0
        scoreVal.innerHTML=`Score: ${score}`
        

      }

    //if food be eaten , incrementing the score and regenerating food
     if(snakeArr[0].x===food.x && snakeArr[0].y===food.y){
        foodSound.play()
         score++
         scoreVal.innerHTML=`Score: ${score}`
         if(hiScoreVal<score){
          hiScoreVal=score
          localStorage.setItem("hiscore",JSON.stringify(hiScoreVal))
          hiScoreBox.innerHTML=`Hiscore: ${hiScoreVal}`
         }

         snakeArr.unshift({x:snakeArr[0].x + velocity.x , y:snakeArr[0].y + velocity.y})
         food={x:Math.floor(Math.random()*14)+2, y:Math.floor(Math.random()*14)+2}
     }  

    //moving the snake

     for(let i=snakeArr.length-2;i>=0;i--){
        snakeArr[i+1]={...snakeArr[i]}
    }
    snakeArr[0].x +=velocity.x
    snakeArr[0].y +=velocity.y
        
    // display snake and food
    //display the snake
    board.innerHTML = '';
    snakeArr.forEach((e, index) => {
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index===0){
            snakeElement.classList.add('head');
        }
        else{     
        snakeElement.classList.add('snake')
          } 
        board.appendChild(snakeElement);
    });

    //display the food
      let snakeFood=document.createElement('div')
       snakeFood.style.gridRowStart=food.y
       snakeFood.style.gridColumnStart=food.x
       snakeFood.classList.add('food')
       board.appendChild(snakeFood)
   

}

//main logic
let hiscore=localStorage.getItem("hiscore")

  if(hiscore===null){
   localStorage.setItem("hiscore",JSON.stringify(hiScoreVal))
  }
  else{
     hiScoreVal=JSON.parse(hiscore)
     hiScoreBox.innerHTML=`Hiscore: ${hiScoreVal}`
  }
    

main()
window.addEventListener('keydown',(e)=>{
    moveSound.play()
    switch(e.key){
        case "ArrowUp":
          velocity.x=0
          velocity.y=-1
          break

        case "ArrowDown":
          velocity.x=0
          velocity.y=1
          break
          
        case "ArrowLeft":
            velocity.x=-1
            velocity.y=0
            break
            
        case "ArrowRight":
             velocity.x=1
             velocity.y=0
             break

        default:
            break
    }

})

  window.addEventListener("keypress",(e)=>{
    if(e.key==='f'){
       cancelAnimationFrame(reqId)
     }

     if(e.key==='m'){
      requestAnimationFrame(main)
     }
  })
