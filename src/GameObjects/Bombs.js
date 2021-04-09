import 'phaser'

class Bombs extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene)
    }   

    addRules() {
        this.setBounce(1);
        this.setCollideWorldBounds(true);
        this.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }

    release (player, sprite) {
        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
        var bomb = this.scene.bombs.create(x, 16, sprite);
        return bomb;
    }
}

export default Bombs