import 'phaser'
// import setData from '../GameData/set.js';
import setData from '../GameData/set.js';

function gameOverConfig (game) {
    var gameOverText;        
    gameOverText = game.add.text(400, 300, 'Game Over', { fontSize: '64px', fill: '#000' });
    gameOverText.setOrigin(0.5);
    gameOverText.visible = false;
    return gameOverText;
}

function gameIsOver (game) { 
    var gameOverText = gameOverConfig(game);
    var data = setData("Henok", game.score);
    console.log(data);

    game.physics.pause();
    game.player.setTint(0xff0000);
    game.player.anims.play('turn');
    gameOverText.visible = true;
    
    game.input.on('pointerdown', () => game.scene.start('Preloader'));    
}


export { gameOverConfig, gameIsOver }