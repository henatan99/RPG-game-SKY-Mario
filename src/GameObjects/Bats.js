import 'phaser'

class Bat extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'Texture', 'Frame'); // The frame is optional
        this.scene.add.existing(this);
    }
    // Add sprite from preload 
    addSprite (sprite) {
        this.setTexture(sprite);
    }
    
    addRules () {
        this.setCollideWorldBounds(true);
        this.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
}

export default Bat