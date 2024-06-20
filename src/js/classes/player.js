// import { Resources } from "../resources.js";
// import { Actor, Animation, CollisionType, Input, range, SpriteSheet, Vector } from "excalibur";
// import { Settings } from "../settings.js";
// import { Trash } from "./trash.js";
// import { Meteor } from "./meteor.js";
// import { Medkit } from "./medkit.js";
// import { Ground } from "./ground.js";
//
// /**
//  * Main character (player) class
//  *
//  * New instance creates the main player
//  * Super constructs hitbox
//  *
//  * param:
//  */
//
// export class Player extends Actor {
//     constructor(healthbar, score) {
//         super({
//             width: 140,
//             height: 470,
//             anchor: new Vector(0.15, 0.35),
//             collisionType: CollisionType.Active,
//         });
//         this.healthbar = healthbar;
//         this.score = score;
//         this.speed = 0;
//         this.isJumping = false;
//         this.isFlying = false;
//
//         /**
//          * SpriteSheet settings (defining the SpriteSheet so that animations
//          * can be drawn from it)
//          * @type {SpriteSheet}
//          */
//
//         const walkSheet = SpriteSheet.fromImageSource({
//             image: Resources.PlayerWalk,
//             grid: {
//                 rows: 1,
//                 columns: 15,
//                 spriteHeight: 564,
//                 spriteWidth: 614
//             }
//         });
//
//         const runSheet = SpriteSheet.fromImageSource({
//             image: Resources.PlayerRun,
//             grid: {
//                 rows: 1,
//                 columns: 15,
//                 spriteHeight: 564,
//                 spriteWidth: 614
//             }
//         });
//
//         const jumpSheet = SpriteSheet.fromImageSource({
//             image: Resources.PlayerJump,
//             grid: {
//                 rows: 1,
//                 columns: 15,
//                 spriteHeight: 564,
//                 spriteWidth: 614
//             }
//         });
//
//         /**
//          * Animation setting (setting dimensions, selecting sheets and
//          * animation speed)
//          * @type {Animation}
//          */
//
//         const walk = Animation.fromSpriteSheet(walkSheet, range(0, 14), 30);
//         this.graphics.add("walk", walk);
//
//         const run = Animation.fromSpriteSheet(runSheet, range(0, 14), 30);
//         this.graphics.add("run", run);
//
//         const jump = Animation.fromSpriteSheet(jumpSheet, range(0, 14), 30);
//         this.graphics.add("jump", jump);
//
//         const runLeft = Animation.fromSpriteSheet(runSheet, range(0, 14), 150);
//         this.graphics.add("runleft", runLeft);
//
//         /**
//          * Standard animation setting, scale and position
//          */
//
//         this.graphics.use("walk");
//         this.scale.scaleEqual(0.6);
//     }
//
//     onInitialize(engine) {
//         this.engine = engine;
//         this.pos = new Vector(Settings.startX, Settings.startY);
//         this.vel = new Vector(this.speed, 0);
//         this.body.collisionType = CollisionType.Active;
//         this.body.useGravity = true;
//         this.on('collisionstart', (event) => this.collisionHandler(event));
//         this.on('collisionstart', (event) => this.enableJump(event));
//     }
//
//     /**
//      * Standard movement mechanics and keyboard controls
//      */
//
//     onPreUpdate(engine, delta) {
//         this.vel.x = this.speed;
//         if (this.isJumping || this.isFlying) {
//             return;
//         }
//
//         if (engine.input.keyboard.wasPressed(Input.Keys.Space)) {
//             this.vel = new Vector(0, -1000);
//             this.isJumping = true;
//             this.onGround = false;
//             Resources.JumpSound.play(1);
//         }
//
//         if (engine.input.keyboard.wasPressed(Input.Keys.D)) {
//             this.graphics.use('run');
//             if (this.speed <= 0) {
//                 this.speed = Settings.runSpeed;
//             }
//         }
//
//         if (engine.input.keyboard.wasPressed(Input.Keys.A)) {
//             this.graphics.use('runleft');
//             if (this.speed >= 0) {
//                 this.speed = -Settings.runSpeed;
//             }
//         }
//
//
//         this.engine.currentScene.actors.forEach(actor => {
//             if (actor instanceof Trash && actor.pos.x < this.pos.x && !actor.hasBeenPassed) {
//                 actor.hasBeenPassed = true;
//                 this.score.increment();
//             }
//         });
//     }
//
//     onPostUpdate(engine, delta) {
//         if (this.isJumping || this.isFlying) {
//             this.graphics.use('jump');
//         }
//
//         if (this.isJumping && this.pos.y >= Settings.startY) {
//             this.isJumping = false;
//             this.isFlying = false;
//             this.graphics.use('walk');
//         }
//
//         if (engine.input.keyboard.wasReleased(Input.Keys.D) || engine.input.keyboard.wasReleased((Input.Keys.A))) {
//             this.speed = 0;
//             this.graphics.use('walk');
//         }
//     }
//
//     collisionHandler(event) {
//
//         if (event.other instanceof Trash) {
//             this.healthbar.loseHealth(Settings.trashDamage);
//             event.other.kill();
//         }
//
//         if (event.other instanceof Meteor) {
//             this.healthbar.loseHealth(Settings.meteorDamage);
//             event.other.kill();
//         }
//
//         if (event.other instanceof Medkit) {
//             this.healthbar.resetHealth();
//             event.other.kill();
//         }
//     }
//
//     enableJump(event) {
//         if (event.other instanceof Ground) {
//             this.onGround = true;
//             this.isJumping = false;
//             this.isFlying = false;
//             this.graphics.use('walk');
//         }
//     }
// }
//

import { Resources } from "../resources.js";
import { Actor, Animation, CollisionType, Input, range, SpriteSheet, Vector, Timer } from "excalibur";
import { Settings } from "../settings.js";
import { Trash } from "./trash.js";
import { Meteor } from "./meteor.js";
import { Medkit } from "./medkit.js";

export class Player extends Actor {
    constructor(healthbar, score) {
        super({
            width: 140,
            height: 470,
            anchor: new Vector(0.15, 0.35),
            collisionType: CollisionType.Active,
        });
        this.healthbar = healthbar;
        this.score = score;
        this.speed = 0;

        const walkSheet = SpriteSheet.fromImageSource({
            image: Resources.PlayerWalk,
            grid: {
                rows: 1,
                columns: 15,
                spriteHeight: 564,
                spriteWidth: 614
            }
        });

        const runSheet = SpriteSheet.fromImageSource({
            image: Resources.PlayerRun,
            grid: {
                rows: 1,
                columns: 15,
                spriteHeight: 564,
                spriteWidth: 614
            }
        });

        const jumpSheet = SpriteSheet.fromImageSource({
            image: Resources.PlayerJump,
            grid: {
                rows: 1,
                columns: 15,
                spriteHeight: 564,
                spriteWidth: 614
            }
        });

        const walk = Animation.fromSpriteSheet(walkSheet, range(0, 14), 30);
        this.graphics.add("walk", walk);

        const run = Animation.fromSpriteSheet(runSheet, range(0, 14), 30);
        this.graphics.add("run", run);

        const jump = Animation.fromSpriteSheet(jumpSheet, range(0, 14), 30);
        this.graphics.add("jump", jump);

        const runLeft = Animation.fromSpriteSheet(runSheet, range(0, 14), 150);
        this.graphics.add("runleft", runLeft);

        this.graphics.use("walk");
        this.scale.scaleEqual(0.6);

        this.jumpCooldown = false; // Initialize jump cooldown flag
    }

    onInitialize(engine) {
        this.engine = engine;
        this.startY = 800; // Set the starting y-value to 800
        this.pos = new Vector(Settings.startX, this.startY);
        this.vel = new Vector(this.speed, 0);
        this.body.collisionType = CollisionType.Active;
        this.on('collisionstart', (event) => this.collisionHandler(event));

        // Create a timer for jump cooldown
        this.jumpCooldownTimer = new Timer({
            fcn: () => {
                this.jumpCooldown = false; // Reset the cooldown flag
            },
            interval: 1000, // Cooldown period in milliseconds
            repeats: false
        });

        engine.add(this.jumpCooldownTimer); // Add the timer to the engine
    }

    onPreUpdate(engine, delta) {
        if (engine.input.keyboard.wasPressed(Input.Keys.Space) && !this.jumpCooldown) {
            this.vel.y = -1000; // Set a negative velocity to jump
            Resources.JumpSound.play(1);
            this.jumpCooldown = true; // Activate the cooldown
            this.jumpCooldownTimer.reset(); // Reset and start the timer
            this.jumpCooldownTimer.start();
        }

        if (engine.input.keyboard.isHeld(Input.Keys.D)) {
            this.graphics.use('run');
            this.vel.x = Settings.runSpeed;
        } else if (engine.input.keyboard.isHeld(Input.Keys.A)) {
            this.graphics.use('runleft');
            this.vel.x = -Settings.runSpeed;
        } else {
            this.vel.x = 0;
            this.graphics.use('walk');
        }

        // Simulate falling
        this.vel.y += 15; // Adjust this value to control the falling speed

        // Prevent player from falling through the ground
        if (this.pos.y >= Settings.screenHeight - Settings.groundHeight - this.height / 2) {
            this.pos.y = Settings.screenHeight - Settings.groundHeight - this.height / 2;
            this.vel.y = 0;
            this.graphics.use('walk');
        }

        // Prevent player from jumping through the ceiling
        const ceilingY = 100; // Example ceiling y-value
        if (this.pos.y <= ceilingY + this.height / 2) {
            this.pos.y = ceilingY + this.height / 2;
            this.vel.y = 0;
        }

        // Update score based on trash position
        this.engine.currentScene.actors.forEach(actor => {
            if (actor instanceof Trash && actor.pos.x < this.pos.x && !actor.hasBeenPassed) {
                actor.hasBeenPassed = true;
                this.score.increment();
            }
        });
    }

    onPostUpdate(engine, delta) {
        console.log(`onPostUpdate: vel.y=${this.vel.y}, pos.y=${this.pos.y}`);
    }

    collisionHandler(event) {
        if (event.other instanceof Trash) {
            this.healthbar.loseHealth(Settings.trashDamage);
            event.other.kill();
        }

        if (event.other instanceof Meteor) {
            this.healthbar.loseHealth(Settings.meteorDamage);
            event.other.kill();
        }

        if (event.other instanceof Medkit) {
            this.healthbar.resetHealth();
            event.other.kill();
        }
    }
}
