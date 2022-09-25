
const buttonColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let start = false;
let level = 0;


function playSound(fileName){
    const audio = new Audio(`./sounds/${fileName}.mp3`);
    audio.play();
}


function nextSequence(){
    
    level++;
    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour)

    $('#level-title').text('Level ' + (level))

    playSound(randomChosenColour);
    $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);
}


function animatePress(colorName){
    $("#" + colorName).addClass('pressed');

    setTimeout(()=> $("#" + colorName).removeClass('pressed'),100);
}

function startOver(){
    level = 0;
    start = false;
    gamePattern = [];
    userClickedPattern = [];
}


function gameOver(){

    $('#level-title').text('Game Over to start again prass any key');

    $('body').addClass('game-over');
    setTimeout(()=> $('body').removeClass('game-over'),500);

    playSound('wrong');
    startOver();
}


function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] == userClickedPattern[currentLevel]) return true;
    return false
}


$(document).keypress(() => {

    if(!start ){ 
        nextSequence();
        start = true;
    }   
})
   


$(".btn").click( function(){

    let userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    

    if(!checkAnswer(userClickedPattern.length-1)){
        return gameOver();
    }

    playSound(userChosenColour);
    animatePress(userChosenColour);

    if( userClickedPattern.length >= gamePattern.length ){
        
        userClickedPattern = []
        setTimeout(()=> nextSequence(),1000)
    } 

})




