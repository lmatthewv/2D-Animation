function drawTIntersect() {
  drawRoadIntersect(500, 303, 200, 194);
  drawRoad(550, 0, 200, 800);
  drawRoad(0, 300, 550, 200);
  map1 = new createjs.Container();

  car1 = addCar("blue", 340, 320, 0);
  car2 = addCar("green", 730, 100, 90);

  button1 = addButton(100, 700, 150, "Blue Car", "blue");
  button2 = addButton(300, 700, 150, "Green Car", "#20FF00");

  map1.addChild(road, roadLines, roadIntersect, car1, car2, button1, button2);

  indicator1 = addIndicator(454, 368);
  map1.addChild(indicator1);
  createjs.Tween.get(indicator1, {loop:true})
  .to({alpha:0}, 700, createjs.Ease.cubicIn);

  button1.addEventListener("click", function()
  { click = 1, animateTIntersect() });

  button2.addEventListener("click", function()
  { click = 2, animateTIntersect() });


  stage.addChild(map1);

function animateTIntersect() {
  map1.removeChild(indicator1);
  map1.removeChild(button1);
  map1.removeChild(button2);
  button = nextQuestion();
  button.addEventListener("click", function()
  { question2() });
    if (click == 1) {
      incorrect += 1;
      console.log("correct = " + correct, "incorrect = " + incorrect);
      information.innerHTML =
      "Incorrect! The car at the top of the T intersection always has the right of way.";

      car1.set({x:-200,y:320, rotation:0});
      createjs.Tween.get(car1)
      .wait(200)
      .to({x: 570, y: 320}, 990, createjs.Ease.cubicOut);

      car2.set({x:730,y:0, rotation:90});
      createjs.Tween.get(car2).to({x: 730, y: 320}, 900)
      .to({rotation: 100, x: 750}, 100).set({x:750,y:320, rotation:100});

      smoke1 = addSmoke(690, 350);
      smoke2 = addSmoke(690, 350);
      smoke3 = addSmoke(690, 350);
      map1.addChild(smoke1);
      map1.addChild(smoke2);
      map1.addChild(smoke3);
      createjs.Tween.get(smoke1)
      .wait(2000)
      .call(animateSmoke);

      createjs.Tween.get(incorrectSound).wait(5000).call(function(){
      createjs.Sound.play("incorrectSound");
    });

    createjs.Tween.get(crash).wait(430).call(function(){
    createjs.Sound.play("crash");
  });

    setTimeout(postScreen, 5000, "Incorrect!");

    } else if (click == 2) {
      correct += 1;
      console.log("correct = " + correct, "incorrect = " + incorrect);
      information.innerHTML =
      "Correct! The car at the top of the T intersection always has the right of way.";

      car1.set({x:340,y:320, rotation:0});
      createjs.Tween.get(car1)
      .wait(1000)
      .to({x: 500, y: 320}, 700)
      .to({guide:{ path:[500,320, 730,320,730,450] }, rotation:90},700)
      .to({x: 730, y: 800}, 1000);

      setTimeout(postScreen, 3000, "Correct!");

      car2.set({x:730,y:100, rotation:90});
      createjs.Tween.get(car2).to({x: 730, y: 800}, 2200);

      createjs.Tween.get(incorrectSound).wait(3000).call(function(){
      createjs.Sound.play("correctSound");
    });
    }

  }

}
