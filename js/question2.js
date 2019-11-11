function drawRoundabout() {
  map2 = new createjs.Container();

  drawRoad(300, 0, 200, 800);
  drawRoad(0, 300, 800, 200);
  drawFilledCircle(400, 400, 200, "#777777");
  drawFilledCircle(400, 400, 80, "green");
  drawCircle(400, 400, 80, 0, Math.PI*2);
  drawCircle(400, 400, 200, 0, Math.PI*2);
  roadIntersect.graphics.beginFill("#777777").drawRect(303, 180, 194, 50);
  roadIntersect.graphics.beginFill("#777777").drawRect(303, 560, 194, 50);
  roadIntersect.graphics.beginFill("#777777").drawRect(180, 303, 50, 194);
  roadIntersect.graphics.beginFill("#777777").drawRect(570, 303, 50, 194);
  lines.graphics.setStrokeStyle(5).beginStroke("white")
  .moveTo(500, 225).lineTo(400, 225).lineTo(400, 150);
  lines.graphics.setStrokeStyle(5).beginStroke("white")
  .moveTo(300, 575).lineTo(400, 575).lineTo(400, 650);
  lines.graphics.setStrokeStyle(5).beginStroke("white")
  .moveTo(575, 500).lineTo(575, 400).lineTo(650, 400);
  lines.graphics.setStrokeStyle(5).beginStroke("white")
  .moveTo(225, 300).lineTo(225, 400).lineTo(150, 400);
  map2.addChild(road);
  map2.addChild(roadLines);
  map2.addChild(roundabout);
  map2.addChild(roundaboutLines);
  map2.addChild(roadIntersect);

  car1 = addCar("purple", 50, 320, 0);
  map2.addChild(car1);
  car2 = addCar("yellow", 450, 560, 180);
  map2.addChild(car2);

  button1 = addButton(100, 700, 150, "Purple Car", "purple");
  button2 = addButton(550, 700, 150, "Yellow Car", "yellow");
  map2.addChild(button1);
  map2.addChild(button2);

  indicator1 = addIndicator(165, 333);
  map2.addChild(indicator1);
  createjs.Tween.get(indicator1, {loop:true})
  .to({alpha:0}, 700, createjs.Ease.cubicIn);

  indicator2 = addIndicator(336, 513);
  map2.addChild(indicator2);
  createjs.Tween.get(indicator2, {loop:true})
  .to({alpha:0}, 700, createjs.Ease.cubicIn);

  stage.addChild(map2);

  button1.addEventListener("click", function()
  { click = 1, animateRoundabout() });

  button2.addEventListener("click", function()
  { click = 2, animateRoundabout() });

  function animateRoundabout() {
    map2.removeChild(button1);
    map2.removeChild(button2);
    map2.removeChild(indicator1);
    map2.removeChild(indicator2);
    button = nextQuestion();
    button.addEventListener("click", function()
    { question3() });
      if (click == 1) {
        smoke1 = addSmoke(290, 310);
        smoke2 = addSmoke(290, 310);
        smoke3 = addSmoke(290, 310);
        map2.addChild(smoke1);
        map2.addChild(smoke2);
        map2.addChild(smoke3);
        incorrect += 1;
        console.log("correct = " + correct, "incorrect = " + incorrect);
        information.innerHTML =
        "Incorrect! On a roundabout, always give way to cars on your right.";

        car2.set({x: 450, y:560, rotation:180});
        createjs.Tween.get(car2)
        .to({x:380}, 1000)
        .to({guide:{ path:[380,560, 240,450,240,450] },rotation:270, rotationDir:1}, 1000)
        .to({guide:{ path:[240,450, 230,340,230,340] },rotation:315, rotationDir:1}, 500)
        .to({rotation: 230, rotationDir: -1, x: 300}, 300)
        .set({rotation:230});

        car1.set({x: -150, y:320});
        createjs.Tween.get(car1)
        .wait(2000)
        .to({x:140}, 550);

        createjs.Tween.get(smoke1)
        .wait(3000)
        .call(animateSmoke);

        createjs.Tween.get(crash2).wait(1700).call(function(){
        createjs.Sound.play("crash2")
      });

        createjs.Tween.get(incorrectSound).wait(8000).call(function(){
        createjs.Sound.play("incorrectSound");
      });
        setTimeout(postScreen, 8000, "Incorrect!");

      } else if (click == 2) {
        correct += 1;
        console.log("correct = " + correct, "incorrect = " + incorrect);
        information.innerHTML =
        "Correct! On a roundabout, always give way to cars on your right.";

        car2.set({x: 450, y:560, rotation:180});
        createjs.Tween.get(car2)
        .to({x:380}, 1000)
        .to({guide:{ path:[380,560, 240,450,240,450] },rotation:270, rotationDir:1}, 1000)
        .to({guide:{ path:[240,450, 230,340,230,340] },rotation:315, rotationDir:1}, 500)
        .to({guide:{ path:[230,340, 320,250,320,250] },rotation:270, rotationDir:-1}, 500)
        .to({y:0}, 500)
        .set({rotation:270});

        car1.set({x: 50, y:320});
        createjs.Tween.get(car1)
        .wait(3000)
        .to({x:200}, 1000)
        .to({guide:{ path:[200,320, 320,250,320,250] },rotation:270, rotationDir:-1}, 1000)
        .to({x:320, y:0}, 1000)
        .set({rotation:270});

        setTimeout(postScreen, 5500, "Correct!");
        createjs.Tween.get(incorrectSound).wait(5500).call(function(){
        createjs.Sound.play("correctSound");
      });
      }
  }

}
