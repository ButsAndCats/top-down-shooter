import Phaser from 'phaser';

/*
  Create a new phaser scene called boot that preloads the assets
  that will be used in the loading screen scene.
*/
export default class Boot extends Phaser.Scene {
  constructor () {
    super({ key: 'boot' });
  }

  preload () {
    // load all files necessary for the loading screen
    this.load.json('assets', 'assets/json/assets.json');
    this.load.image('logo', 'assets/image/logo.png');
  }

  create () {
    console.log('starting loading screen');
    // Change scenes
    this.scene.start('loadingScreen');
  }

}
