import Phaser from 'phaser';
import zenvaLogo from '../assets/skymario.png';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('logo', zenvaLogo);
  }

  create() {
    this.scene.start('Input');
    // this.scene.start('Preloader');
  }
}