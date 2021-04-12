import 'phaser'
import { gameOverConfig, gameIsOver } from './GameOver';

class Goose extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'Texture', 'Frame', "Goose"); // The frame is optional
        this.scene.add.existing(this); 
    }
    // Add sprite from preload 
    addSprite (sprite) {
        this.setTexture(sprite).setScale(0.4).refreshBody();
    }

    addRules () {
        this.setGravityY(8);        
        this.setCollideWorldBounds(true);
        const enemyLasers = this.scene.physics.add.group();

        gameOverConfig(this.scene);
        function game_is_over () {
            return gameIsOver(this.scene);
        }
        // this.scene.physics.add.overlap(this.scene.player, this.body, game_is_over, null, this);
        
        this.shootTimer = this.scene.time.addEvent({
            delay: 5000,
            callback: function() {
              var laser = new GooseLaser(
                    this.scene,
                    this.x,
                    this.y
                );            
                this.scene.physics.add.existing(laser); 
                             
                this.scene.physics.add.overlap(this.scene.player, laser, game_is_over, null, this);

                if (this.body.velocity.x >= 0) {
                    laser.body.velocity.x = 100;
                    laser.flipX = false; 
                }
                else {
                    laser.body.velocity.x = -200;
                    laser.flipX = true;
                }                
            },
            
            callbackScope: this,
            loop: true
        });
    }
}

class GooseLaser extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
      super(scene, x, y, 'laser');      
      this.scene.add.existing(this);
      this.scene.physics.world.enableBody(this, 0);
      this.scale = 0.2;
    }
}

export { Goose, GooseLaser } 