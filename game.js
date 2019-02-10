var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameFaze = false;


$(document).keypress(function() {
  if (!gameFaze) {
    $("#level-title").text("Level " + level);
    nextSequence();
    gameFaze = true;
  }
});


$(".btn").click(function() {
  userChosenColour = $(this).attr('id'); //pobieramy atrybut id z kazdego btn
  userClickedPattern.push(userChosenColour);

  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});





function nextSequence() {
  userClickedPattern = [];

  level++;
  $('#level-title').text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(250).fadeIn(250);

  setTimeout(function() {
    playSound(randomChosenColour);
  }, 350);



}


function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }
  } else {
    $('body').addClass('game-over');

    setTimeout(function(){
      $('body').removeClass('game-over');
    }, '200');

    $('#level-title').text("Game Over, Press Any Key to Restart");
    startOver();
  }
}


function startOver(){
  level = 0;
  gameFaze = false;
  gamePattern = [];

}


function playSound(name) {
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}


function animatePress(currentColour) {
  $('.' + currentColour).toggleClass('pressed');
  setTimeout(function() {
    animatePress('pressed');
  }, '100');

}
