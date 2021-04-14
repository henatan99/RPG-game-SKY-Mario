import setData from '../GameData/set';

function gameOverConfig(game) {
  const gameOverText = game.add.text(400, 300, 'Game Over', { fontSize: '64px', fill: '#000' });

  gameOverText.setOrigin(0.5);
  gameOverText.visible = false;
  return gameOverText;
}

function gameIsOver(game, userName, score) {
  const gameOverText = gameOverConfig(game);
  game.add.text(100, 50, `Name : ${userName}`, { fontSize: '14px', fill: '#000' });
  game.add.text(100, 100, `Score : ${score}`, { fontSize: '14px', fill: '#000' });

  // setData(userName, score);

  game.physics.pause();
  game.player.setTint(0xff0000);
  game.player.anims.play('turn');
  gameOverText.visible = true;

  const style = 'background: #0000FF; border: none; border-radius: 5px; color: #fff;';
  const back = game.add.dom(350, 400, 'button', style, 'Back');
  const restart = game.add.dom(350, 500, 'button', style, 'Restart');

  back.scaleX = 1.5;
  back.scaleY = 1.7;
  back.addListener('click');

  back.on('click', () => {
    setData(userName, score);
    game.scene.start('PreloaderScene');
  });

  restart.scaleX = 1.5;
  restart.scaleY = 1.7;
  restart.addListener('click');

  restart.on('click', () => {
    setData(userName, score);
    game.scene.start('Game');
  });

  // game.input.on('pointerdown', () => game.scene.start('Preloader'));
}

export { gameOverConfig, gameIsOver };