import 'phaser'

class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'Texture', 'Frame'); // The frame is optional
        this.scene.add.existing(this);
    }
    // Add sprite from preload 
    addSprite (sprite) {
        this.setTexture(sprite);
    }
    
    addRules () {
        this.setGravityY(10000);
        this.setBounce(0.2);
        this.setCollideWorldBounds(true);
    }
}

export default Player