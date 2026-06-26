/* eslint-disable prettier/prettier */
import { Application, Assets, HTMLText, NineSliceSprite, Sprite, Texture } from "pixi.js";
import fontz from "/src/assets/Cinzel-VariableFont_wght.ttf";
import asset from "/src/assets/ram.png";

await Assets.load(asset);
const texture = Texture.from(asset);
const uinterface = {
    count: (app: Application): HTMLText => {
        const text = new HTMLText(
            {text: "hello",
                style: {
                    align: "center",
                    fontFamily: fontz,
                    fontSize: 48,
                    fill: 0xffffff,
                }
            });
        const background = new NineSliceSprite({
            texture: texture,
            leftWidth: 40,
            topHeight: 40,
            rightWidth: 40,
            bottomHeight: 40,
            width: 300,
            height: 300,
        });
        text.anchor = 0.5;
        text.position.set(45,47);
        background.anchor = 0;
        background.scale = 0.3;
        app.stage.addChild(background);
        app.stage.addChild(text);
        return text;
    },
    hcount: (app: Application): HTMLText => {
        const text = new HTMLText(
            {text: "hello",
                style: {
                    align: "center",
                    fontFamily: fontz,
                    fontSize: 48,
                    fill: 0xfff2ac,
                }
            });
        const background = new NineSliceSprite({
            texture: texture,
            leftWidth: 40,
            topHeight: 40,
            rightWidth: 40,
            bottomHeight: 40,
            width: 300,
            height: 300,
        });
        text.anchor = 0.5;
        text.position.set(135,47);
        background.position.x += 90;
        background.anchor = 0;
        background.scale = 0.3;
        app.stage.addChild(background);
        app.stage.addChild(text);
        return text;
    },
    others: (app: Application): NineSliceSprite => {
         const background = new NineSliceSprite({
            texture: texture,
            leftWidth: 41,
            topHeight: 41,
            rightWidth: 41,
            bottomHeight: 41,
            width: 300,
            height: 300,
        });
        background.position.x = innerWidth;
        background.width = innerWidth/0.3 - 600;
        background.anchor.set(1,0);
        background.scale = 0.3;
        app.stage.addChild(background);
        return background;
    },
    button: async (app: Application, url: string, functodo): Promise<Sprite> => {
        const but = new Sprite(await Assets.load(url));
        but.eventMode = "static";
        but.on("pointerdown", functodo);
        return but;
    },
};

export default uinterface;