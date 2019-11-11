function drawGivewayIntersect() {
  map3 = new createjs.Container();
  drawRoadIntersect(290, 303, 220, 194);
  drawRoadIntersect(303, 290, 194, 220);
  drawRoad(300, 0, 200, 800);
  drawRoad(0, 300, 800, 200);
  map3.addChild(road);
  map3.addChild(roadLines);
  map3.addChild(roadIntersect);

  var giveway1 = new createjs.Bitmap("img/give-way.svg");
  giveway1.set({scaleX: 0.08, scaleY: 0.08, rotation:90, x: 290, y: 225});
  map3.addChild(giveway1);
  var giveway2 = new createjs.Bitmap("img/give-way.svg");
  giveway2.set({scaleX: 0.08, scaleY: 0.08, rotation:270, x: 510, y: 575});
  map3.addChild(giveway2);

  car1 = addCar("orange", 100, 320, 0);
  map3.addChild(car1);

  car2 = addCar("blue", 320, 700, 270);
  map3.addChild(car2);

  button1 = addButton(100, 700, 160, "Orange Car", "orange");
  button2 = addButton(540, 700, 130, "Blue Car", "blue");
  map3.addChild(button1);
  map3.addChild(button2);

  stage.addChild(map3);

  button1.addEventListener("click", function()
  { click = 1, animateGivewayIntersection() });

  button2.addEventListener("click", function()
  { click = 2, animateGivewayIntersection() });

  function animateGivewayIntersection() {
    map3.removeChild(button1);
    map3.removeChild(button2);
    button = nextQuestion();
    button.addEventListener("click", function()
    { question4() });


      if (click == 1) {
        smoke1 = addSmoke(513, 317);
        smoke2 = addSmoke(513, 317);
        smoke3 = addSmoke(513, 317);
        map3.addChild(smoke1);
        map3.addChild(smoke2);
        map3.addChild(smoke3);
        incorrect += 1;
        console.log("correct = " + correct, "incorrect = " + incorrect);

        createjs.Tween.get(incorrectSound).wait(8000).call(function(){
        createjs.Sound.play("incorrectSound");
      });

      createjs.Tween.get(crash).wait(1000).call(function(){
      createjs.Sound.play("crash");
    });

      setTimeout(postScreen, 8000, "Incorrect!");

        ambulance = addAmbulance(320, 1000, 270);
        map3.addChild(ambulance);
        createjs.Tween.get(ambulance)
        .wait(6000)
        .to({y:550}, 2000, createjs.Ease.cubicOut);

        createjs.Tween.get(smoke1)
        .wait(1600)
        .call(animateSmoke);

        car1.set({x: -150});
        createjs.Tween.get(car1)
        .wait(800)
        .to({x: 220}, 500, createjs.Ease.sinusoidalOut);

        createjs.Tween.get(car2)
        .to({y: 400}, 1300)
        .to({x: 550, y: 300, rotation: 130, rotationDir:-1}, 300, createjs.Ease.exponentialOut)
        .set({rotation: 130});


      } else if (click == 2) {
        correct += 1;
        console.log("correct = " + correct, "incorrect = " + incorrect);

        createjs.Tween.get(car2).wait(5000).call(function(){
        createjs.Sound.play("correctSound");
      });

      setTimeout(postScreen, 5000, "Correct!");

        car2.set({y: 1000});
        createjs.Tween.get(car2)
        .to({y: 0}, 2000, createjs.Ease.cubicIn);

        createjs.Tween.get(car1)
        .wait(2000)
        .to({x: 800}, 2000, createjs.Ease.cubicIn);
      }
  }

}
