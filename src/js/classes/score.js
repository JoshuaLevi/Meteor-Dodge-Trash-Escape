import { Label, Actor, Vector, Font, Color } from "excalibur";

export class Score extends Actor {
    constructor() {
        super({
            pos: new Vector(50, 50)
        });

        this.score = 0;

        this.scoreLabel = new Label({
            pos: new Vector(0, 0),
            text: `Score: ${this.score}`,
            color: Color.Black,
            font: new Font({
                family: 'Arial',
                size: 40,
                color: Color.Black
            })
        });
        this.addChild(this.scoreLabel);
    }

    increment() {
        this.score++;
        this.scoreLabel.text = `Score: ${this.score}`;
    }
}
