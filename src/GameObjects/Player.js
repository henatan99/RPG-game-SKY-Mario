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

    addAnim (sprite) {
        this.scene.anims.create({
            key: 'left',
            frames: this.scene.anims.generateFrameNumbers(sprite, { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
    
        this.scene.anims.create({
            key: 'turn',
            frames: [ { key: sprite, frame: 4 } ],
            frameRate: 20
        });
    
        this.scene.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers(sprite, { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
    }

    moveUpdates() {
        this.body.setVelocity(0);
        // this.addAnim(sprite);

        var cursors = this.scene.input.keyboard.createCursorKeys(); 

        if (cursors.left.isDown)
        {
            this.setVelocityX(-260);

            this.anims.play('left', true);
        }
        else if (cursors.right.isDown)
        {
            this.setVelocityX(260);

            this.anims.play('right', true);
        }
        else
        {
            this.setVelocityX(0);

            this.anims.play('turn');
        }

        if (cursors.up.isDown && this.body.touching.down)
        {
            this.setVelocityY(-20000);
        }
    }
   
}

export default Player