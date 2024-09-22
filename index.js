var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var sequence = [];
var level = 0;

$(document).on("keypress", function() {
    if (level === 0) {
        nextSequence();
    }
});

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var chosenColor = buttonColors[randomNumber];
    sequence.push(chosenColor);

    console.log(sequence);

    $("#" + chosenColor)
        .fadeOut(100)
        .fadeIn(100)
        .fadeOut(100)
        .fadeIn(100);
    
    var audio = new Audio(chosenColor + ".mp3");
    audio.play();
}

$(".btn").on("click", function(event) {
    var userChosenColor = $(this).attr("id");
    var sou = new Audio(userChosenColor + ".mp3");
    sou.play();   

    $("#" + userChosenColor).addClass("pressed");
    setTimeout(function() {
        $("#" + userChosenColor).removeClass("pressed");
    }, 100);

    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);

    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === sequence[currentLevel]) {
        if (userClickedPattern.length === sequence.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {

        $("h1").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        var wrongSound = new Audio("wrong.mp3");
        wrongSound.play();
        startOver();
    }
}

function startOver() {
    level = 0;
    sequence = [];
}
