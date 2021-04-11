import 'phaser'

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
        this.shootTimer = this.scene.time.addEvent({
            delay: 1000,
            callback: function() {
              var laser = new GooseLaser(
                    this.scene,
                    this.x,
                    this.y
                );            
                this.scene.physics.add.existing(laser);            
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
      this.body.velocity.x = 200;
      this.scale = 0.2;
    }
}

export { Goose, GooseLaser } 