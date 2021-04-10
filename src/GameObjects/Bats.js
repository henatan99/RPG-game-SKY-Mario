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
        this.setBounce(1, 1);
        this.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }

    addAnim (sprite) {
        this.scene.anims.create({
            key: 'fly',
            frames: this.scene.anims.generateFrameNumbers(sprite, { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
    
        // this.scene.anims.create({
        //     key: 'turn',
        //     frames: [ { key: sprite, frame: 4 } ],
        //     frameRate: 20
        // });
    
        // this.scene.anims.create({
        //     key: 'right',
        //     frames: this.anims.generateFrameNumbers(sprite, { start: 5, end: 8 }),
        //     frameRate: 10,
        //     repeat: -1
        // });

        this.anims.play('fly', true);
    }
}

export default Bat