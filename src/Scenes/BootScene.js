import Phaser from 'phaser';
import zenvaLogo from '../assets/zenva_logo.png';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('logo', zenvaLogo);
  }

  create() {
    this.scene.start('Preloader');    
  }
}