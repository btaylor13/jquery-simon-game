const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
userClickedPattern = [];

$(".btn").click(function () {
  let userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  console.log(userClickedPattern);

  //  plays sound for corresponding button color
  playSound(userChosenColor);

  //   animate button with pressing effect
  animatePress(userChosenColor);
});

function nextSequence() {
  //  Generate Random Color Button
  let randomNumber = Math.floor(Math.random() * 4);

  let randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  //   Button Flashing
  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
}

function playSound(name) {
  //   Button Sounds
  const audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
