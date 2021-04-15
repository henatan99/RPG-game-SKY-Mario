import Phaser from 'phaser';
import { gameIsOver } from './GameOver';
import GooseLaser from './GooseLaser';

class Goose extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'Texture', 'Frame', 'Goose');
    this.scene.add.existing(this);
  }

  addSprite(sprite) {
    this.setTexture(sprite).setScale(0.4).refreshBody();
  }

  addRules(userName) {
    this.setGravityY(8);
    this.setCollideWorldBounds(true);

    function gameisOver() {
      return gameIsOver(this.scene, userName, this.scene.score);
    }

    this.shootTimer = this.scene.time.addEvent({
      delay: 5000,
      callback() {
        const laser = new GooseLaser(
          this.scene,
          this.x,
          this.y,
        );
        this.scene.physics.add.existing(laser);

        this.scene.physics.add.overlap(this.scene.player, laser, gameisOver, null, this);

        if (this.body.velocity.x >= 0) {
          laser.body.velocity.x = 100;
          laser.flipX = false;
        } else {
          laser.body.velocity.x = -200;
          laser.flipX = true;
        }
      },

      callbackScope: this,
      loop: true,
    });
  }
}

export default Goose;