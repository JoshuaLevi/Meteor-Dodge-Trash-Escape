// import {Actor, CollisionType, Vector} from "excalibur";
// import {Settings} from "../settings.js";
//
// /**
//  * Floor/ground class
//  *
//  * New instance creates fixed floor that interacts with Excalibur
//  * gravity physics (Collisiontype.Fixed and active)
//  *
//  * param:
//  */
//
// export class Ground extends Actor{
//     constructor(height) {
//         super({
//             width: Settings.screenWidth,
//             height: height,
//             y: Settings.screenHeight - height,
//             anchor: new Vector(0, 0)
//         })
//         this.body.collisionType = CollisionType.Fixed
//     }
// }
//
//
//


import { Actor, CollisionType, Vector, Color } from 'excalibur';
import { Settings } from '../settings.js';

export class Ground extends Actor {
    constructor(height) {
        super({
            width: Settings.screenWidth,
            height: height,
            anchor: new Vector(0.5, 0.5),
            collisionType: CollisionType.Fixed,
            color: Color.Green // Adding a color to visualize the ground
        });
    }

    onInitialize(engine) {
        this.pos = new Vector(engine.drawWidth / 2, engine.drawHeight - this.height / 2);
    }
}
