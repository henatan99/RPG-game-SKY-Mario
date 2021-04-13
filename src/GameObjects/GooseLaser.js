import Phaser from 'phaser';

export default class GooseLaser extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'laser');
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);
    this.scale = 0.2;
  }
}