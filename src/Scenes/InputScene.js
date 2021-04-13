import Phaser from 'phaser';

export default class InputScene extends Phaser.Scene {
  constructor() {
    super('Input');
  }

  create() {
    this.intro = this.add.text(250, 200, 'Enter your name: ', { fontSize: 20, fontFamily: 'monospace' });

    const input = this.add.dom(350, 300, 'input', {
      type: 'text',
      name: 'nameField',
      fontSize: '32px',
      backgroundColor: '#fff',
    });
    input.scaleX = 0.4;
    input.scaleY = 0.6;

    const style = 'background: #0000FF; border: none; border-radius: 5px; color: #fff;';
    const gameButton = this.add.dom(350, 400, 'button', style, 'Proceed');
    gameButton.scaleX = 1.5;
    gameButton.scaleY = 1.7;
    gameButton.addListener('click');

    gameButton.on('click', () => {
      if (input.node.value) {
        this.model = this.sys.game.globals.model;
        this.model.userName = input.node.value;
        this.scene.start('Game');
      }
    });
  }
}
