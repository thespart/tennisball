/* eslint-disable prettier/prettier */

import { Application, Graphics, Assets, Sprite } from "pixi.js";
import { Ball } from "./ball";
import uinterface from "./ui";

(async () => {
  const app = new Application();
  await app.init({ background: "#ffffff", resizeTo: window });
  document.getElementById("pixi-container")!.appendChild(app.canvas);

  const mousePos = {
    x: 0,
    y: 0,
    prevx: 0,
    prevy: 0,
    dx: 0,
    dy: 0,
  };
  window.addEventListener("pointermove", (event) => {
    mousePos.x = event.x;
    mousePos.y = Math.max(event.y, innerHeight/2);
  });
  window.addEventListener("resize", () => {
    offset = 0.5 * (innerHeight/1000);
    others.width = innerWidth/0.3 - 600;
    others.position.x = innerWidth;
  })
  let offset = 0.5 * (innerHeight/1000);

  function update(dt: number) {
    area.scale.set(0.003 * mousePos.y);
    ballPixi.scale.set(0.001 * ball.z + offset);
      area.position.set(mousePos.x - area.width, mousePos.y - area.height*5);
      racket.position = area.position;
      racket.scale.set(area.scale.x*0.3, area.scale.y*0.3);
      ball.collidewithrocket(area, -Math.min(innerHeight/2 - mousePos.y, -100));
      ball.update(dt);
      textscore.text = ball.getscore().score;
      texthscore.text = "<b>" + ball.getscore().hscore;
  }

  const area = new Graphics().rect(50, 50, 100, 10);
  const racket = new Sprite(await Assets.load("/src/assets/racket.png"));
  racket.anchor.set(-1, -0.25);
  const ball = new Ball(0,0,0,{x: 0, y: 0, z: 0}, 0);
  const a = await ball.pixiElement();
  const ballPixi = a.ball;
  const shadowball = a.shadowball;
  const textscore = uinterface.count(app);
  const texthscore = uinterface.hcount(app);
  const others = uinterface.others(app);

  area.stroke({ width: 2, color: "rgb(0,0,0)" });
  app.stage.addChild(racket);
  //app.stage.addChild(area);
  app.stage.addChild(shadowball); 
  app.stage.addChild(ballPixi);

  app.ticker.add((time) => {
    mousePos.dx = mousePos.x - mousePos.prevx;
    mousePos.dy = mousePos.y - mousePos.prevy;
    update(time.deltaTime);
    mousePos.prevx = mousePos.x;
    mousePos.prevy = mousePos.y;
  });
})();
