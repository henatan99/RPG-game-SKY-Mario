import Player from './_mock_files/Player';

describe('Player', () => {
  const player = new Player();
  player.addRules(true, 1, 1000);

  it('Should set the belonging scene to the player', () => {
    player.scene = 'GameScene';
    expect(player.scene).toBe('GameScene');
  });

  it('Should return an error if player\'s assinged scene doesn\'t match', () => {
    player.scene = 'GameScene';
    expect(player.scene).not.toBe('GameOver');
  });

  it('Should return gavity value of player', () => {
    expect(player.setGravity).toEqual(1000);
  });

  it('Should return colliderWOrldBoundValue to true', () => {
    expect(player.setCollideWorldBounds).toEqual(true);
  });
});
