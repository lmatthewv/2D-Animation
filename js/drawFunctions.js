function removeEverything() {
  road.graphics.clear();
  water.graphics.clear();
  road.graphics.clear();
  roadLines.graphics.clear();
  roundabout.graphics.clear();
  roundaboutLines.graphics.clear();
  roadIntersect.graphics.clear();
  footpath.graphics.clear();
  lines.graphics.clear();
  stage.removeChild(map1);
  stage.removeChild(map2);
  stage.removeChild(map3);
  stage.removeChild(map4);
  stage.removeChild(incorrectLabel);
  stage.removeChild(correctLabel);
  stage.removeChild(score);
  stage.removeChild(label);
  stage.removeChild(button);
}

function addSmoke(x, y) {
  smoke = new createjs.Bitmap("img/smoke2.png")
  .set({x: x, y: y, scaleX: 0.01, scaleY: 0.01, alpha:0});

  return smoke;
}

function animateSmoke() {
  createjs.Tween.get(smoke1, {loop:true})
  .to({alpha: 1})
  .wait(100)
  .to({scaleX: 0.1, scaleY: 0.1, alpha:0.3}, 1000);

  createjs.Tween.get(smoke2, {loop:true})
  .to({alpha: 1})
  .wait(50)
  .to({scaleX: 0.1, scaleY: 0.1, alpha:0.3}, 1000);

  createjs.Tween.get(smoke3, {loop:true})
  .to({alpha: 1})
  .wait(75)
  .to({scaleX: 0.1, scaleY: 0.1, alpha:0.3}, 1000);
}

function nextQuestion() {
  var nextQuestion = addButton(300, 650, 180, "Next question", "white");
  return nextQuestion;
}

function addCar(colour, x, y, rotation) {
  var car = new createjs.Bitmap("img/" + colour + ".svg")
  .set({x: x, y: y, scaleX: 0.15, scaleY: 0.15, rotation: rotation});

  return car;
}

function addBridgeSign(x,y,rotation, type) {
  var sign = new createjs.Bitmap("img/" + type + ".png")
  .set({x: x, y: y, scaleX: 0.5, scaleY: 0.5, rotation: rotation});

  return sign;
}

function addAmbulance(x, y, rotation) {
  var addAmbulance = new createjs.Bitmap("img/ambulance.svg")
  .set({x: x, y: y, scaleX: 0.15, scaleY: 0.15, rotation: rotation});

  return addAmbulance;
}

function addButton(x, y, w, text, colour) {
  button = new createjs.Container();
  var back = new createjs.Shape();
  back.graphics.setStrokeStyle(2).beginStroke("black").beginFill(colour).drawRoundRect(x, y, w, 50, 10);
  var label = new createjs.Text(text, "20pt Arial", "Black");
  label.set({x: x + 10, y: y + 10});
  button.addChild(back, label);

  return button;
}






function drawStraightVertRoad() {
  drawRoad(300, 0, 200, 800);
}


function drawRoad (x, y, w, h) {
  road.graphics.beginFill("#777777").drawRect(x, y, w, h).endFill();
  //if the road is vertical
  if (w > h) {
    //draw the road lines vertically
    startX = 25;
    var count = w / 100;
    for (var i = 0; i < count; i++) drawVertLines(x, y, w, h, i);
  }
  //if the road is horizontal
  if(w < h) {
    //draw the road lines horizontally
    startY = 25;
    var count = h / 100;
    for (var i = 0; i < count; i++) drawHoriLines(x, y, w, h, i);
  }
}

function drawRoadIntersect(x, y, w, h) {
  roadIntersect.graphics.beginFill("#777777").drawRect(x, y, w, h).endFill();
}

function drawVertLines(x, y, w, h, i) {
  startY = y + 100;
  endX = startX + length;
  endY = startY;

  //center line
  roadLines.graphics.setStrokeStyle(5).beginStroke("white")
  .moveTo(startX, startY).lineTo(endX, endY).endStroke();

  //footpaths
  roadLines.graphics.setStrokeStyle(5).beginStroke("white")
  .moveTo(x, y).lineTo(w, y).endStroke();

  roadLines.graphics.setStrokeStyle(5).beginStroke("white")
  .moveTo(x, y + h).lineTo(w, y + h).endStroke();

  startX = startX + 100;
}

function drawHoriLines(x, y, w, h, i) {
  startX = x + 100;
  endY = startY + length
  endX = startX;

  //center line
  roadLines.graphics.setStrokeStyle(5).beginStroke("white")
  .moveTo(startX, startY).lineTo(endX, endY).endStroke();

  //footpaths
  roadLines.graphics.setStrokeStyle(5).beginStroke("white")
  .moveTo(x, y).lineTo(x, y + h).endStroke();

  roadLines.graphics.setStrokeStyle(5).beginStroke("white")
  .moveTo(x + w, y).lineTo(x + w, y + h).endStroke();

  startY = startY + 100;
}

function drawFilledCircle(x, y, r, colour) {
  roundabout.graphics.beginFill(colour).drawCircle(x, y, r).endFill();
}

function drawCircle(x, y, r, start, end) {
  roundaboutLines.graphics.setStrokeStyle(5).beginStroke("white")
  .arc(x, y, r, start, end).endFill();
}

function drawRoundaboutLines(x, y, x1, y1, x2, y2) {
  roundaboutLines.graphics.setStrokeStyle(5).beginStroke("white")
  .moveTo(x, y).quadraticCurveTo(x1, y1, x2, y2);
}

function drawRiver(x, y, w, h) {
  water.graphics.beginFill("blue").drawRect(x, y, w, h).endFill();
}

function drawOneWayRoad(x, y, w, h) {
  road.graphics.beginFill("#777777").drawRect(x, y, w, h).endFill();

  startX = x;
  startY = y;
  endX = x + w;
  endY = y;
  roadLines.graphics.setStrokeStyle(5).beginStroke("white")
  .moveTo(startX, startY).lineTo(endX, endY).endStroke();

  startX = x;
  startY = y + h;
  endX = x + w;
  endY = y + h;
  roadLines.graphics.setStrokeStyle(5).beginStroke("white")
  .moveTo(startX, startY).lineTo(endX, endY).endStroke();
}

function addIndicator(x, y) {
  var indicator = new createjs.Shape();
  indicator.graphics.beginFill("yellow").drawPolyStar(x, y, 5, 4, 0.7, 20).endFill();

  return indicator;
}
