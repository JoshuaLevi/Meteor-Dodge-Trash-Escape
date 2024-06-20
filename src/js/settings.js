/**
 * Settings file for general used variable settings
 * @type {{groundHeight: number, runSpeed: number, startY: number, startX: number}}
 */
import {Vector} from "excalibur";

export const Settings = {
    //General
    gravity: 3000,
    screenWidth: 1920,
    screenHeight: 1080,
    groundHeight: 80,

    //Player:
    startY: 600,
    startX: 200,
    runSpeed: 400,

    //Trashcan
    trashStartX: 2100,
    trashStartY: 900,
    trashIntervalMin: 1000,
    trashIntervalMax: 3500,
    trashSpeedMin: 600,
    trashSpeedMax: 900,
    trashDamage: 100,

    //Meteor
    meteorStartY: -500,
    meteorIntervalMin: 2500,
    meteorIntervalMax: 4500,
    meteorSpeedMin: 400,
    meteorSpeedMax: 900,
    meteorDamage: 200,

    //Healthbar
    healthbarWidth: 500,
    healthbarHeight: 50,

    //Medkit
    medkitStartY: -500,
    medkitInterval: 15000,
}