import Phaser from 'phaser';

export default class Lobby extends Phaser.Scene {
  constructor () {
    super({key: 'lobby'});
  }

  preload () {}

  create () {
    this.add.image(100, 400, 'characters', 'hitman1_gun');
  }

  update () {
    
  }
}
