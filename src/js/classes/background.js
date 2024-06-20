import { Actor, Vector, Sprite } from 'excalibur';
import { Resources } from '../resources.js';

export class Background extends Actor {
    sprite;

    onInitialize(engine) {
        this.sprite = new Sprite({
            image: Resources.Background,
            sourceView: { x: 0, y: 0, width: engine.drawWidth, height: engine.drawHeight }
        });
        this.anchor = Vector.Zero;
        this.graphics.use(this.sprite);
    }

    onPostUpdate(engine, delta) {
        this.sprite.sourceView.x += 0.05 * delta;
        // Reset to 0 to avoid precision issues after a long time
        if (this.sprite.sourceView.x >= this.sprite.image.width) {
            this.sprite.sourceView.x = 0;
        }
    }
}
