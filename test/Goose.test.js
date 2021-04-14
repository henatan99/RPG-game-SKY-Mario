import Goose from './_mock_files/Goose';

describe('Goose', () => {
  const goose = new Goose();

  it('Should set the belonging scene to the bat', () => {
    goose.scene = 'GameScene';
    expect(goose.scene).toBe('GameScene');
  });

  it('Should return an error if bat\'s assinged scene doesn\'t match', () => {
    goose.scene = 'GameScene';
    expect(goose.scene).not.toBe('GameOver');
  });
});