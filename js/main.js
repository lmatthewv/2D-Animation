createjs.MotionGuidePlugin.install();
createjs.RotationPlugin.install();

//global variables
var correct = 0;
var incorrect = 0;
var total = 0;

var label;
var score;
var correctLabel;
var incorrectLabel;
var button;
var background = 0;
var smoke1 = 0; var smoke2 = 0; var smoke3 = 0;
var stage, road, centerLine;
var buttonX = 300;
var buttonY = 350;
var num = 0;
var startX = 0;
var startY = 0;
var endX = 0;
var endY = 0;

var map1;
var map2;
var map3;
var map4;

var length = 50;

var no, yes;
var car1;
var car2;
var ambulance = 0;

var correctSound = 0;
var incorrectSound = 0;
var crash, crash2;
var skid, button;

var preload;

var click = 0;

function init() {
  question = document.getElementById("question");
  information = document.getElementById("information");

  stage = new createjs.Stage("stage-canvas");
  road = new createjs.Shape();
  roadLines = new createjs.Shape();
  footpath = new createjs.Shape();
  roadIntersect = new createjs.Shape();
  roundabout = new createjs.Shape();
  roundaboutLines = new createjs.Shape();
  water = new createjs.Shape();
  lines = new createjs.Shape();
  shape = new createjs.Shape();
  mainLines = new createjs.Shape();

  //drawTIntersect();
  //drawPlusIntersect();
  //drawStraightVertRoad();
  //drawStraightHoriRoad();
  //drawRoundabout();
  //drawOneWayBridge();

  /*stage.addChild(water);
  stage.addChild(road);
  stage.addChild(roadLines);
  stage.addChild(roundabout);
  stage.addChild(roundaboutLines);
  stage.addChild(roadIntersect);
  stage.addChild(footpath);
  stage.addChild(lines);*/

  stage.update();

  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener("tick", stage);
  preloadAssets();
}

function preloadAssets(){
  loadingScreen = new createjs.Container();
  var shape = new createjs.Shape();
  shape.graphics.beginFill("#888888").drawRect(0, 0, 800, 800);
  loadingScreen.addChild(shape);
  var label = new createjs.Text("Loading...", "16px Arial white");
  label.x = 350;
  label.y = 380;
  loadingScreen.addChild(label);
  stage.addChild(loadingScreen);

  preload = new createjs.LoadQueue();
  preload.installPlugin(createjs.Sound);
  preload.loadFile({id:"blue",src:"img/blue.svg"});
  preload.loadFile({id:"green",src:"img/green.svg"});
  preload.loadFile({id:"orange",src:"img/orange.svg"});
  preload.loadFile({id:"purple",src:"img/purple.svg"});
  preload.loadFile({id:"yellow",src:"img/yellow.svg"});
  preload.loadFile({id:"ambulance",src:"img/ambulance.svg"});
  preload.loadFile({id:"no",src:"img/no.png"});
  preload.loadFile({id:"correctSound",src:"audio/correct.wav"});
  preload.loadFile({id:"incorrectSound",src:"audio/incorrect.wav"});
  preload.loadFile({id:"crash",src:"audio/crash.wav"});
  preload.loadFile({id:"crash2",src:"audio/crash2.wav"});
  preload.loadFile({id:"skid",src:"audio/skid.wav"});

  correctSound = createjs.Sound.play("correctSound");
  incorrectSound = createjs.Sound.play("incorrectSound");
  crash = createjs.Sound.play("crash");
  crash2 = createjs.Sound.play("crash2");

  preload.on("complete", preloadComplete, this);
}

function preloadComplete(event) {
  console.log("preload finished");
  stage.removeChild(loadingScreen);


  welcome();
}

function welcome() {
  correct = 0; incorrect = 0;
  removeEverything();
  var buttonWidth = 100; var buttonHeight = 50;
  var button = new createjs.Container();
  var back = new createjs.Shape();
  back.graphics.setStrokeStyle(2).beginStroke("black").beginFill("red").drawRoundRect(buttonX, buttonY, 200, 60, 10);
  var label = new createjs.Text("Begin Test", "20pt Arial", "Black");
  label.set({textAlign: "center", textBaseline: "middle",
  x: buttonX + 95, y: buttonY + 30});
  button.addChild(back, label);

  stage.addChild(button);

  button.addEventListener("click", function()
  { stage.removeChild(button), question1() });
}

function question1() {
  removeEverything()
  question.innerHTML = "1.";
  information.innerHTML = "Select the car that has the right of way";
  drawTIntersect();
}

function question2(){
  removeEverything()
  question.innerHTML = "2.";
  information.innerHTML = "Select the car that has the right of way";
  drawRoundabout();
}

function question3(){
  removeEverything()
  question.innerHTML = "3.";
  information.innerHTML = "Select the car that has the right of way";
  drawGivewayIntersect();
}

function question4(){
  removeEverything()
  question.innerHTML = "4.";
  information.innerHTML = "Should the orange car giveway?";
  drawStraightHoriRoad()
}

function postScreen(text) {
  total = 0;
  removeEverything();
  total += correct;
  total -= incorrect;
  label = new createjs.Text(text, "20pt Arial", "Black").set({x:355, y:300});
  score = new createjs.Text("Your score is: " + total , "20pt Arial", "Black")
  .set({x: 310, y:350});
  correctLabel = new createjs.Text("Correct: " + correct, "20pt Arial", "Black")
  .set({x: 270, y:400});
  incorrectLabel = new createjs.Text("Incorrect: " + incorrect, "20pt Arial", "Black")
  .set({x: 420, y:400});
  stage.addChild(label, score, correctLabel, incorrectLabel, button);
}

function finalScreen() {
  total = 0;
  removeEverything();
  stage.removeChild(button);
  total += correct;
  total -= incorrect;
  score = new createjs.Text("Your Final score is: " + total + "!" , "20pt Arial", "Black")
  .set({x: 270, y:300});
  correctLabel = new createjs.Text("Correct: " + correct, "20pt Arial", "Black")
  .set({x: 270, y:350});
  incorrectLabel = new createjs.Text("Incorrect: " + incorrect, "20pt Arial", "Black")
  .set({x: 420, y:350});
  if (total < 3) {
    label = new createjs.Text("Keep practicing", "20pt Arial", "Black").set({x:310, y:450});
  } else if (total == 3) {
    label = new createjs.Text("Good job", "20pt Arial", "Black").set({x:340, y:450});
  } else if (total > 3) {
    label = new createjs.Text("Excellent!", "20pt Arial", "Black").set({x:340, y:450});
  }

  button = addButton(350, 500, 110, "Restart", "red");
  button.addEventListener("click", function()
  { welcome() });

  stage.addChild(label, score, correctLabel, incorrectLabel, button);
}
