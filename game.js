const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
userClickedPattern = [];

let started = false;

let level = 0;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").html("Level " + level);
    nextSequence();
    started = true;
  }
});

// // for mobile devices to start game
// $(document).click(function () {
//   if (!started) {
//     $("#level-title").html("Level " + level);
//     nextSequence();
//     started = true;
//   }
// });

$(".btn").click(function () {
  let userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  console.log(userClickedPattern);

  //  plays sound for corresponding button color
  playSound(userChosenColor);

  //   animate button with pressing effect
  animatePress(userChosenColor);

  //   check user answer against computer answer
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  // check if most recent user answer is a match to the computer's most recent answer
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    //  check to see if the user has finished the pattern sequence
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game over. Press any key to restart. :)");

    startOver();
  }
}

function nextSequence() {
  // reset user pattern for next level
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
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

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
