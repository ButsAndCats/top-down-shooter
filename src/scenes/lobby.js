import Phaser from 'phaser';

export default class Lobby extends Phaser.Scene {
  constructor() {
    super({
      key: 'lobby'
    });
  }

  preload () {}

  create() {
    this.player = this.add.image(100, 400, 'characters', 'hitman1_gun');
    this.player.speed = 4;
    this.keys = {
      W: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      A: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      S: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      D: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    };
  }

  update() {
    if (this.keys.W.isDown) {
      this.player.y -= this.player.speed;
    }
    if (this.keys.A.isDown) {
      this.player.x -= this.player.speed;
    }
    if (this.keys.S.isDown) {
      this.player.y += this.player.speed;
    }
    if (this.keys.D.isDown) {
      this.player.x += this.player.speed;
    }
  }
}
