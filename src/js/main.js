import '../css/style.css';
import { Color, DisplayMode, Engine, Physics, Vector } from "excalibur";
import { ResourceLoader } from './resources.js';
import { Menuscreen } from "./scenes/menuscreen.js";
import { Settings } from "./settings.js";
import { Level1 } from "./scenes/level1.js";
import { Gameover } from "./scenes/gameover.js";

export class Main extends Engine {
    constructor() {
        super({ width: Settings.screenWidth, height: Settings.screenHeight, displayMode: DisplayMode.FitScreen });
        this.start(ResourceLoader).then(() => {
            this.addScene('menuScreen', new Menuscreen());
            this.addScene('gameover', new Gameover());
            this.addScene("level1", new Level1());
            this.goToScene('menuScreen');
        });
        Physics.useArcadePhysics();
        Physics.gravity = new Vector(0, Settings.gravity);

        ResourceLoader.suppressPlayButton = true;
    }
}

new Main();
