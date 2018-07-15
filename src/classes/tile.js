import Phaser from 'phaser';

export default class Tile extends Phaser.GameObjects.Sprite {
  constructor (parameters) {
    super({
      key: 'tile'
    });
  }
}
