var userClickedPattern=[];
var gamePattern=[];
var buttonColors=['red','blue','green','yellow'];
var level=0;
var started=false;

// for starting the game
$(document).keypress(function(){
    if(!started){
        $('#level-title').text('Level '+level);
        nextSequence();
       
        started=true;
    }
});

var userChosenColor=[];
$('.btn').click(function(key) {
    userChosenColor=$(this).attr('id');
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    console.log(userClickedPattern);
    checkAnswer(userClickedPattern.length-1);
    
    
 });


// for next sequence
function nextSequence(){
    level++;
    $('#level-title').text('Level '+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $('#'+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    animatePress(randomChosenColor);
    playSound(randomChosenColor);

}
// for sound
function playSound(name){
    var audio=new Audio('./sounds/'+name+'.mp3');
    audio.play();
}

// for animation
function animatePress(currentColor){
    $('#'+currentColor).addClass('pressed');
    setTimeout(function(){
        $('#'+currentColor).removeClass('pressed');
    },100);
}

// for checking the answer
function checkAnswer(currentLevel){
      if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
            console.log('success');
            if(userClickedPattern.length===gamePattern.length){
                setTimeout(function(){
                    nextSequence();
                    userClickedPattern=[]; // reset the user clicked pattern for next level
                },1000)
            }
            
      }
      else{
        console.log('wrong');
        playSound('wrong');
        $('body').addClass('game-over');
        setTimeout(function(){
            $('body').removeClass('game-over');
        },200);
        $('#level-title').text('Game Over, Press Any Key to Restart');
        startOver(); // reset the game
      }
}
// for starting over
function startOver(){
    level=0;
    gamePattern=[];
    started=false;
    userClickedPattern=[];
}






