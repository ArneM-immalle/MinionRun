var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// load images

var minion = new Image();
var bg = new Image();
var banana = new Image();
var mbanana = new Image();
var tree = new Image();
var tree2 = new Image();
var cloud = new Image();

minion.src = "images/Minion1.png";
minion.src = "images/Minion3.png";
minion.src = "images/Minion2.png";
bg.src = "images/background.png";
banana.src = "images/Banana.png";
mbanana.src = "images/MiniBanana.png";
tree.src = "images/Tree1.png";
tree2.src = "images/Tree2.png";
cloud.src = "images/Cloud.png";

// some variables
var bX = 10;
var bY = 200;
var score = 0;
var bewegingAantal = 1;
var bewegingPose = 2;
var bewegingSprong = 0;
var bewegingSprongAantal = 0;
var bananaAantal = 1;
var levens = 3;
var beschermd = 0;
var banana0 = 0;
var laatsteLengt = 0;
var startscreen = true;
var geraakt = false;
var highscore = 0;
var pauze = 0;

var nickname = prompt("Enter your nickname:");

// on key down
document.addEventListener("keydown", moveUp);
document.addEventListener("ontouchstart", moveUp);
var stopseconds = 0;
function moveUp() {
  if (!startscreen) {
    if (bewegingSprong == 0 && pauze == 0) {
      bY -= 110;
      bewegingSprong = 1;
    }
  } else {
    if (stopseconds <= 0) {
      startscreen = false;
      ctx.textAlign = "unset";
      draw();
      bananas[0] = {
        x: cvs.width,
        y: 0
      };
      bX = 10;
      bY = 200;
      score = 40;
      bewegingAantal = 1;
      pauze = 0;
      bewegingPose = 2;
      bewegingSprong = 0;
      bewegingSprongAantal = 0;
      bananaAantal = 1;
      levens = 3;
      beschermd = 0;
      banana0 = 0;
      laatsteLengt = 0;
      geraakt = false;
    }
  }
}

// bananas coordinates

var bananas = [];
var items = [];

// draw images

function draw() {
  ctx.drawImage(bg, 0, 0);

  for (var i = 0; i < bananas.length; i++) {
    ctx.drawImage(banana, bananas[i].x, 395);

    var snelheid = score / 10 + 6;
    bananas[i].x -= snelheid;

    var bananaExtra = Math.floor(Math.random() * 150 + 2);
    var extraItems = Math.floor(Math.random() * 1000);
    var bananaDistance = Math.floor(Math.random() * (cvs.width - 25) + 25);
    if (
      (snelheid < 10
        ? bananas[i].x <= 10 && bananas[i].x > 10 - snelheid
        : bananas[i].x <= snelheid && bananas[i].x >= 0) ||
      ((snelheid < bananaDistance
        ? bananas[i].x <= bananaDistance &&
          bananas[i].x > bananaDistance - snelheid
        : bananas[i].x <= snelheid && bananas[i].x >= 0) &&
        beschermd == 0)
    ) {
      if (newBanana1()) {
        bananas.push({
          x: cvs.width,
          y: 0
        });
        bananaAantal++;
      }
    }
    if (bananaExtra == 2) {
      if (newBanana2()) {
        bananas.push({
          x: cvs.width,
          y: 0
        });
        bananaAantal++;
      }
    }
    if (extraItems == 5) {
      items.push({
        i: tree,
        x: cvs.width,
        y: 131
      });
    }
    if (extraItems == 10) {
      items.push({
        i: tree2,
        x: cvs.width,
        y: 131
      });
    }
    if (extraItems == 12) {
      items.push({
        i: cloud,
        x: cvs.width,
        y: 45
      });
    }

    if (bananas.length == i + 1) {
      for (var j = 0; j < items.length; j++) {
        items[j].x -= snelheid;
        ctx.drawImage(items[j].i, items[j].x, items[j].y);
      }
    }

    // detect collision

    if (
      bX + minion.width >= bananas[i].x + 25 &&
      bX <= bananas[i].x + banana.width &&
      bY > 150 &&
      beschermd == 0
    ) {
      if (levens <= 1) {
        startscreen = true;

        saveScore(score, nickname);

        getHighScore();
        if (score > highscore) {
          highscore = score;
        }
        stopseconds = 50;
        Stopscreen();
        return;
      } else {
        levens--;
        beschermd = 60;
        bananaAantal--;
        geraakt = true;
      }
    } else if (
      snelheid < 10
        ? bananas[i].x <= 10 && bananas[i].x > 10 - snelheid
        : bananas[i].x <= snelheid && bananas[i].x >= 0
    ) {
      if (!geraakt) {
        score++;
        bananaAantal--;
      } else {
        geraakt = false;
      }
    }
  }
  if (
    bewegingSprong == 0 ||
    (bewegingSprong == 1 && bewegingSprongAantal >= getSprongLength(snelheid))
  ) {
    if (pauze > 0) {
      pauze--;
    }
    if (bewegingSprongAantal >= getSprongLength(snelheid)) {
      pauze = 4;
      bewegingPose = 1;
      bewegingSprongAantal = 9;
    }
    bewegingSprongAantal = 0;
    bewegingSprong = 0;
    bY = 200;
    if (bewegingAantal >= 9) {
      if (bewegingPose == 1) {
        minion.src = "images/Minion2.png";
        bewegingPose = 2;
      } else {
        minion.src = "images/Minion1.png";
        bewegingPose = 1;
      }
      bewegingAantal = 0;
    }
    bewegingAantal++;
  } else {
    minion.src = "images/Minion3.png";
    bewegingSprongAantal++;
  }

  ctx.drawImage(minion, bX, bY);

  if (beschermd > 0) {
    beschermd--;
  }

  if (laatsteLengt == bananaAantal) {
    banana0++;
  }
  laatsteLengt = bananaAantal;
  if (banana0 == 5000) {
    bananas.push({
      x: cvs.width,
      y: 0
    });
    bananaAantal++;
    banana0 = 0;
  }

  ctx.fillStyle = "#000";
  ctx.font = "20px 'Press Start 2P'";
  ctx.fillText("Score: " + score, 110, cvs.height - (cvs.height / 20) * 18.3);
  for (var i = 0; i < levens; i++) {
    ctx.drawImage(
      mbanana,
      cvs.width - (cvs.width / 20) * 5 + (45 * 3 - 45 * i),
      cvs.height - (cvs.height / 25) * 24
    );
  }

  if (bananas.length == i + 1) {
    if (bananas[0].x < -20) {
      bananas.splice(0, 1);
    }
  }

  requestAnimationFrame(draw);
}

function getSprongLength(snelheid) {
  if (score < 30) {
    return 85 - snelheid * snelheid;
  }
}

function newBanana1() {
  for (var j = 0; j < bananas.length; j++) {
    if (bananas[j].x >= 375) {
      return false;
    }
  }
  return true;
}

function newBanana2() {
  for (var j = 0; j < bananas.length; j++) {
    if (bananas[j].x >= 450) {
      return false;
    }
  }
  return true;
}

Startscreen();

function Startscreen() {
  if (startscreen == true) {
    ctx.drawImage(bg, 0, 0);
    ctx.fillStyle = "#000";
    ctx.font = "60px 'Press Start 2P'";
    ctx.fillText("START", cvs.width / 2, 310);
    ctx.textAlign = "center";
    requestAnimationFrame(Startscreen);
  }
}

function Stopscreen() {
  if (startscreen == true) {
    ctx.drawImage(bg, 0, 0);
    for (var i = 0; i < bananas.length; i++) {
      bananas.splice(i, 1);
    }
    stopseconds--;
    ctx.fillStyle = "#000";
    ctx.font = "70px 'Press Start 2P'";
    ctx.fillText("Score: " + score, cvs.width / 2, 215);
    ctx.font = "35px 'Press Start 2P'";
    ctx.fillText("Record: " + highscore, cvs.width / 2, 290);
    ctx.font = "30px 'Press Start 2P'";
    ctx.fillText("By: " + highscore_user, cvs.width / 2, 335);
    ctx.textAlign = "center";
    requestAnimationFrame(Stopscreen);
  }
}

function saveScore(score) {
  $.post("php/index.php", {
    nickname: nickname,
    score: score
  });
}

function getHighScore() {
  // http://adnan-tech.com/tutorial/get-data-from-database-using-ajax-javascript-php-mysql
  var ajax = new XMLHttpRequest();
  ajax.open("GET", "php/highscore.php", true);
  ajax.send();

  ajax.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      highscore = JSON.parse(this.responseText).score;
      highscore_user = JSON.parse(this.responseText).ip;
    }
  };
}

getHighScore();
