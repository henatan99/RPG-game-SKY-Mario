import 'phaser'

class Bombs extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene);
    }   

    addRules() {
        this.setBounce(1);
        this.setCollideWorldBounds(true);
        this.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }

    release (player, bombs, sprite) {
        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
        var bomb = bombs.create(x, 16, sprite);
        return bomb;
    }

    hitBombAction (game, Player, bombs, gameOverText) {
        game.physics.add.collider(Player, bombs, hitBomb, null, game);

        function hitBomb (player, bomb) {

            game.physics.pause();

            Player.setTint(0xff0000);

            Player.anims.play('turn');

            game.gameOver = true;

            gameOverText.visible = true;

            game.input.on('pointerdown', () => game.scene.start('Preloader'));
        }
    }


}

export default Bombs