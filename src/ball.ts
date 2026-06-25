/* eslint-disable prettier/prettier */
import { Graphics, Assets, Sprite} from "pixi.js";

function Randomizer(min: number, max: number) {
    return Math.ceil(Math.random() * (max - min)) + min;
}

const ball = new Sprite(await Assets.load("/assets/ball.png"));
ball.anchor = 0.5;
const shadowball = new Graphics().arc(0, 0, 10, 0, Math.PI*2);
const fallspeed = 0.5;

let score = 0;
let hscore = 0;

shadowball.fill({color: "rgb(255,0,0)"});

export class Ball {
    x: number;
    y: number;
    z: number;
    speed: {x: number, y: number, z: number};
    rotation: number;

    constructor(x: number, y: number, z: number, speed: {x: number, y: number, z: number}, rotation) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.speed = speed;
        this.rotation = rotation;
    }
    getscore(): {score: number, hscore: number} {
        return {score, hscore};
    }
    async pixiElement() {
        const toreturn = {ball, shadowball};
        this.z = Randomizer(50,innerHeight/2);
        return toreturn;
    }

     collidewall(dt: number) {
        if (this.x - ball.width/2 * dt <= 0) {
            this.x = ball.width/2;
            this.speed.x *= -1; 
        }
        if (this.x + ball.height/2 * dt >= innerWidth) {
            this.x = innerWidth - ball.width/2;
            this.speed.x *= -1;
        }
        if (this.y + ball.height/2 + (innerHeight/2 - this.z) * dt >= innerHeight) {
            this.y = innerHeight - ball.height/2 - (innerHeight/2 - this.z);
            this.speed.y *= -0.9;
            score = 0;
        }
    }

    collidewithrocket(otherobj: Graphics, otherobjz: number) {
        if ( ball.y + ball.height* 0.75 + this.speed.y > otherobj.y + otherobj.height*5
        ) {
            if  (ball.x < otherobj.x + otherobj.width * 1.5 &&
            ball.x + ball.width > otherobj.x + otherobj.width * 0.8 &&
            //ball.y - ball.height < otherobj.y + otherobj.height &&
            this.z > otherobjz - otherobj.height*6 &&
            this.z < otherobjz + otherobj.height*6) {
                score++;
                if (score > hscore) {
                    hscore = score;
                }
                this.speed.z += Randomizer(-15,15);
                this.speed.y += 2 * Randomizer(-15,-11);
                this.speed.x += Randomizer(-12,12);
                this.rotation += Randomizer(-20,20);
            }
        }
    }

    update(dt: number) {
        console.log(score);
        this.speed.x *= 0.99;
        this.speed.y = (this.speed.y + fallspeed) * 0.99;
        this.speed.z *= 0.99;
        this.rotation *= 0.99;
        this.x += this.speed.x;
        this.y += this.speed.y;
        this.z += this.speed.z;
        this.z = Math.min(this.z, innerHeight/2-ball.height);
        this.z = Math.max(this.z, 100)
        this.collidewall(dt);
        ball.x = this.x;
        ball.y = this.y;
        ball.rotation = this.rotation;
        shadowball.y = innerHeight - (innerHeight/2 - this.z);
        shadowball.x = ball.x;
    }
}