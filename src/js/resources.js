import { ImageSource, Loader, Sound, ImageWrapping } from 'excalibur';
import walkSheet from '../img/characters/player_spritesheet_walk_1x15.png'
import runSheet from '../img/characters/player_spritesheet_run_1x15.png'
import jumpSheet from '../img/characters/player_spritesheet_jump_1x15.png'
import backgroundImage from '../img/backgrounds/background3.png'
import meteor from '../img/objects/meteor.png'
import trash from '../img/objects/trashcan.png'
import medkit from '../img/objects/medkit.png'
import jump from '../sound/jump.mp3'
import music from '../sound/music.mp3'
import thanks from '../sound/thanks.mp3'
import explosion from '../img/objects/explosion_spritesheet.png'

/**
 * Resources loader
 * @type {{Player: ImageSource, Background: ImageSource}}
 */

const Resources = {
    PlayerWalk: new ImageSource(walkSheet),
    PlayerRun: new ImageSource(runSheet),
    PlayerJump: new ImageSource(jumpSheet),
    Background: new ImageSource(backgroundImage, { wrapping: ImageWrapping.Repeat }),
    Trash: new ImageSource(trash),
    Meteor: new ImageSource(meteor),
    Medkit: new ImageSource(medkit),
    Explosion: new ImageSource(explosion),
    JumpSound: new Sound(jump),
    Music: new Sound(music),
    ThanksSound: new Sound(thanks)

}
const ResourceLoader = new Loader([
    Resources.PlayerWalk, Resources.PlayerRun,
    Resources.PlayerJump, Resources.Background,
    Resources.Trash, Resources.Meteor,
    Resources.JumpSound, Resources.Music,
    Resources.ThanksSound, Resources.Medkit,
    Resources.Explosion
])

export { Resources, ResourceLoader }