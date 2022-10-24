//Color options
var buttonColors = ["red", "blue", "green", "yellow"];
// Pattern of colors chosen from random number generator
var gamePattern = [];

// Pattern for colors user has clicked on
var userClickedPattern = [];
// function to add those store the id of the color clicked and place that attribute into "userClickedPattern" array

// determine the state of the game first
var started = false;

// set level
var level = 0; 

// start game once a key is pressed or click is detected, and change value of "started" to true so that the function doesn't run again.
$(document).keydown(function() {
    if (!started){

        $("#level-title").text("Level " + level);
        nextSequence();

        started = true;
    }
})

// ***click function did not work for when the game reset
// $(document).click(function() {
//     if (!started){

//         $("#level-title").text("Level " + level);
//         nextSequence();

//         started = true;
//     }
// })

 
$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");

    userClickedPattern.push(userChosenColor);
    

    playSound(userChosenColor);

    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length -1);
})

function checkAnswer(currentLevel) {

    // if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");

        // If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length){

            // Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
              nextSequence();
            }, 1000);
        }
    }   else {
        console.log("wrong");

        playSound("wrong")

        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function() {
            
            $("body").removeClass("game-over");
        }, 200);
        
        startOver();
        
    }

}

// function to choose random color and place that into the game pattern array. Allows you to add more colors later on with the function taking in the "buttonColors" variable as a parameter. 
function nextSequence() {

    userClickedPattern = [];
    // increase the level by 1 everytime nextSequence() is called
    level++;
    
    // update the title to the current level after change
    $("#level-title").text("Level " + level);
    
    var randomChosenColor = buttonColors[(Math.floor(Math.random() * 4))];
 

    gamePattern.push(randomChosenColor);
    console.log(gamePattern);

    //1. Use jQuery to select the button with the same id as the randomChosenColor and animate a flash to the button
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor); 
    
}

// Plays the sound corresponding to the color that was clicked on 
function playSound(name) {
    var audio = new Audio ("sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

// reset game 
function startOver() {

    level = 0;
    gamePattern = [];
    started = false;
}