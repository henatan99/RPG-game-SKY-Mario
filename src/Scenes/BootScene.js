import 'phaser';
import zenva_logo from '../assets/zenva_logo.png';

export default class BootScene extends Phaser.Scene {
  constructor () {
    super('Boot');
  }

  preload () {
    this.load.image('logo', zenva_logo);
  }

  create () {
    this.scene.start('Preloader');
  }
};