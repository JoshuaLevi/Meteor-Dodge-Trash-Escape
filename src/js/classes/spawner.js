import {Actor, Random, Timer} from "excalibur";
import {Trash} from "./trash.js";
import {Settings} from "../settings.js";
import {Meteor} from "./meteor.js";
import {Medkit} from "./medkit.js";

export class Spawner extends Actor {
    constructor() {
        super()
        this.random = new Random()
    }

    onInitialize(engine) {
        this.trashTimer = new Timer({
            fcn: () => this.spawnTrash(engine),
            interval: this.getRandomInterval(
                Settings.trashIntervalMin,
                Settings.trashIntervalMax
            ),
            repeats: true
        });
        engine.currentScene.add(this.trashTimer)

        this.meteorTimer = new Timer({
            fcn: () => this.spawnMeteor(engine),
            interval: this.getRandomInterval(
                Settings.meteorIntervalMin,
                Settings.meteorIntervalMax
            ),
            repeats: true
        });
        engine.currentScene.add(this.meteorTimer)

        this.medkitTimer = new Timer({
            fcn: () => this.spawnMedkit(engine),
            interval: Settings.medkitInterval,
            repeats: true
        });
        engine.currentScene.add(this.medkitTimer)

        this.trashTimer.start()
        this.meteorTimer.start()
        this.medkitTimer.start()
    }

    spawnTrash(engine) {
        const trash = new Trash(
            this.random.integer(Settings.trashSpeedMin, Settings.trashSpeedMax)
        )
        engine.currentScene.add(trash)
    }

    spawnMeteor(engine) {
        const meteorLeft = new Meteor(
            this.random.integer(100, Settings.screenWidth / 2 - 100),
            this.random.integer(Settings.meteorSpeedMin, Settings.meteorSpeedMax)
        )
        const meteorRight = new Meteor(
            this.random.integer(Settings.screenWidth / 2, Settings.screenWidth - 200),
            this.random.integer(Settings.meteorSpeedMin, Settings.meteorSpeedMax)
        )
        engine.currentScene.add(meteorLeft)
        engine.currentScene.add(meteorRight)
    }

    spawnMedkit(engine){
        const medkit = new Medkit(
            this.random.integer(100, Settings.screenWidth - 200)
        )
        engine.currentScene.add(medkit)
    }

    getRandomInterval(rangeMin, rangeMax) {
        return this.random.integer(rangeMin, rangeMax)
    }
}
