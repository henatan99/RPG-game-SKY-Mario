import Phaser from 'phaser';
import logo from '../assets/logo.png';
import preloaderScene from './PreloaderScene';
 
export default class BootScene extends Phaser.Scene {
  constructor () {
    super('Boot');
  }
 
  preload () {
    this.load.image('logo', logo);
  }
 
  create () {
    this.scene.start(preloaderScene);
  }
};