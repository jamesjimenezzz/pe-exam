var arrayColors = ["green", "blue", "red", "yellow"];
var randomPush = [];
var chosenColorPush = [];
started = false;
level = 0;

$(document).keypress(function () {
  if (!started) {
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  chosenColorPush = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var selectedRandomColors = arrayColors[randomNumber];
  randomPush.push(selectedRandomColors);
  console.log(randomPush);
  animationPress(selectedRandomColors);
  soundPress(selectedRandomColors);
}

$(".btn").on("click", function () {
  var ChosenColor = $(this).attr("id");
  chosenColorPush.push(ChosenColor);
  animationPress(ChosenColor);
  soundPress(ChosenColor);
  console.log(chosenColorPush);
  checkAnswer(chosenColorPush.length - 1);
});

function animationPress(chosen) {
  $("#" + chosen).addClass("pressed");
  setTimeout(function () {
    $("#" + chosen).removeClass("pressed");
  }, 100);
}

function soundPress(chosen) {
  var audio = new Audio("sounds/" + chosen + ".mp3");
  audio.play();
}

function checkAnswer(currentLevel) {
  var reversedSequence = [...randomPush].reverse();
  if (reversedSequence[currentLevel] === chosenColorPush[currentLevel]) {
    console.log("success");
    if (chosenColorPush.length === reversedSequence.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    gameOver();
  }

  function gameOver() {
    level = 0;
    started = false;
    randomPush = [];
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 500);
    $("#level-title").text("Press any key to start");
  }
}

console.log(`these are the colors ${arrayColors}`);

$(".modal button").on("click", function () {
  $(".instruction-content").toggleClass("instru");
  $(".hero").toggleClass("blur");
});

$(".close button").on("click", function () {
  $(".instruction-content").toggleClass("instru");
  $(".hero").toggleClass("blur");
});
