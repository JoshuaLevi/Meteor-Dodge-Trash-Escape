import { Color, Font, FontUnit, Label, Scene, TextAlign, Vector, Input } from "excalibur";
import { Settings } from "../settings.js";
import { Resources } from "../resources.js";
import { Background } from "../classes/background.js";

export class Gameover extends Scene {
    scoreLabel;

    onInitialize(engine) {
        const gameOverLabel = new Label({
            text: `GAME OVER`,
            textAlign: TextAlign.Center,
            pos: new Vector(Settings.screenWidth / 2, 300),
            font: new Font({
                textAlign: TextAlign.Center,
                family: 'bahnschrift',
                size: 200,
                unit: FontUnit.Px,
                color: Color.Red
            })
        });

        const restartLabel = new Label({
            text: `Press SPACE to restart`,
            textAlign: TextAlign.Center,
            pos: new Vector(Settings.screenWidth / 2, Settings.screenHeight - 100),
            font: new Font({
                textAlign: TextAlign.Center,
                family: 'bahnschrift',
                size: 50,
                unit: FontUnit.Px,
                color: Color.White
            })
        });

        const background = new Background("Background", 20);
        this.add(background);
        this.add(gameOverLabel);
        this.add(restartLabel);
        background.graphics.opacity = 0.5;
    }

    onActivate(ctx) {
        const { score } = ctx.data;

        // Remove the previous score label if it exists
        if (this.scoreLabel) {
            this.scoreLabel.kill();
        }

        this.scoreLabel = new Label({
            text: `Score: ${score}`,
            textAlign: TextAlign.Center,
            pos: new Vector(Settings.screenWidth / 2, 500),
            font: new Font({
                textAlign: TextAlign.Center,
                family: 'bahnschrift',
                size: 100,
                unit: FontUnit.Px,
                color: Color.White
            })
        });

        this.add(this.scoreLabel);

        this.engine.input.keyboard.once("press", (evt) => {
            if (evt.key === Input.Keys.Space) {
                this.engine.goToScene('level1');
                this.engine.currentScene.restart();  // Ensure the scene is restarted
            }
        });
    }

    onDeactivate() {
        // Remove the score label when the scene is deactivated
        if (this.scoreLabel) {
            this.scoreLabel.kill();
            this.scoreLabel = null;
        }
    }
}
