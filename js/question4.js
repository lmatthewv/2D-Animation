function drawStraightHoriRoad() {
  map4 = new createjs.Container();
  drawRoad(0, 300, 800, 200);

  map4.addChild(water);
  map4.addChild(road);
  map4.addChild(roadLines);

  no = addBridgeSign(460,290,270, "no");
  map4.addChild(no);

  yes = addBridgeSign(340,240,90, "yes");
  map4.addChild(yes);

  var split = new createjs.Shape();
  split.graphics.beginFill("black").drawRect(350,0,100,800);
  map4.addChild(split);

  car1 = addCar("orange", 50, 320, 0);
  map4.addChild(car1);
  car2 = addCar("yellow", 700, 480, 180);
  map4.addChild(car2);

  button1 = addButton(110, 600, 130, "Orange", "orange");
  button2 = addButton(570, 600, 100, "Yellow", "yellow");
  map4.addChild(button1);
  map4.addChild(button2);

  stage.addChild(map4);

  button1.addEventListener("click", function()
  { click = 1, animateBridge() });

  button2.addEventListener("click", function()
  { click = 2, animateBridge() });

    function animateBridge() {
      removeEverything();
      map4 = new createjs.Container();
      drawRiver(300, 0, 200, 800);
      drawOneWayRoad(0, 350, 800, 100);
      map4.addChild(water);
      map4.addChild(road);
      map4.addChild(roadLines);
      stage.addChild(map4);
      map4.removeChild(button1);
      map4.removeChild(button2);
      button = addButton(350, 500, 90, "Finish", "red");
      button.addEventListener("click", function()
      { finalScreen() });

      if (click == 2) {
        incorrect += 1;
        console.log("correct = " + correct, "incorrect = " + incorrect);
        information.innerHTML =
        "Incorrect! The yellow car did not have the righ of way.";

        map4.addChild(car1).set({x:-400,y:360});
        createjs.Tween.get(car1).to({x:150}, 1500, createjs.Ease.cubicOut);

        map4.addChild(car2).set({x:1200,y:440});
        createjs.Tween.get(car2).to({x:550}, 700)
        .to({x:400}, 700, createjs.Ease.cubicOut);

        createjs.Tween.get(skid).wait(200).call(function(){
        createjs.Sound.play("skid");
      });

        createjs.Tween.get(incorrectSound).wait(2000).call(function(){
        createjs.Sound.play("incorrectSound");
      });
        setTimeout(postScreen, 2000, "Incorrect!");




      } else if (click == 1) {
        correct += 1;
        console.log("correct = " + correct, "incorrect = " + incorrect);
        information.innerHTML =
        "Correct! The orange car has the right of way";

        map4.addChild(car1).set({x:-400,y:370});
        createjs.Tween.get(car1).to({x:800}, 2000);

        setTimeout(postScreen, 3000, "Correct!");
        createjs.Tween.get(incorrectSound).wait(3000).call(function(){
        createjs.Sound.play("correctSound");
      });
    }

  }

}
