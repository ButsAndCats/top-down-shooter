import Phaser from 'phaser';

/*
  The scenes
*/
import Boot from './scenes/boot';
import LoadingScreen from './scenes/loadingScreen';
import Lobby from './scenes/lobby';

/*
  When the page is ready initialize the game with the config
  The boot scene will fire first
*/
const config = {
  backgroundColor: '0x292A36',
  scene: [ Boot, LoadingScreen, Lobby ]
};

document.addEventListener('DOMContentLoaded', () => {
  window.game = new Phaser.Game(config);
});
