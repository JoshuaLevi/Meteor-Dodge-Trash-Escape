import {Resources} from "../resources.js";
import {Actor, CollisionType, Shape, Vector} from "excalibur";
import {Settings} from "../settings.js";


export class Meteor extends Actor {
    constructor(meteorStartX, meteorSpeed) {
        super({
            collider: Shape.Box(130,500,Vector.Half, new Vector(0,0)),
            collisionType: CollisionType.Passive
        })
        this.meteorStartX = meteorStartX
        this.meteorSpeed = meteorSpeed
        this.graphics.use(Resources.Meteor.toSprite())
        this.scale.scaleEqual(0.5)
    }

    onInitialize(engine) {
        this.pos = new Vector(this.meteorStartX, Settings.meteorStartY)
        this.vel = new Vector(0, this.meteorSpeed)
    }
}
