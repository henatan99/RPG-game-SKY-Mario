import setData from '../GameData/set';

function gameOverConfig(game) {
  const gameOverText = game.add.text(400, 300, 'Game Over', { fontSize: '64px', fill: '#000' });
  gameOverText.setOrigin(0.5);
  gameOverText.visible = false;
  return gameOverText;
}

function gameIsOver(game) {
  const gameOverText = gameOverConfig(game);
  setData('Henok', 10);

  game.physics.pause();
  game.player.setTint(0xff0000);
  game.player.anims.play('turn');
  gameOverText.visible = true;

  game.input.on('pointerdown', () => game.scene.start('Preloader'));
}

export { gameOverConfig, gameIsOver };