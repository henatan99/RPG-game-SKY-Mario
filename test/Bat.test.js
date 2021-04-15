import Bat from './_mock_files/Bat';

describe('Bat', () => {
  const bat = new Bat();
  bat.addAnim();

  it('Should set the belonging scene to the bat', () => {
    bat.scene = 'GameScene';
    expect(bat.scene).toBe('GameScene');
  });

  it('Should return an error if bat\'s assinged scene doesn\'t match', () => {
    bat.scene = 'GameScene';
    expect(bat.scene).not.toBe('GameOver');
  });

  it('Should return an error if bat\'s assinged scene doesn\'t match', () => {
    expect(bat.key).toBe('fly');
  });

  it('Should return an error if bat\'s assinged scene doesn\'t match', () => {
    expect(bat.repeat).toEqual(Infinity);
  });
});
