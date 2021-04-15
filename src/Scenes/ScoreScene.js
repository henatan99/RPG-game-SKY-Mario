import Phaser from 'phaser';
import getData from '../GameData/get';

export default class ScoreScene extends Phaser.Scene {
  constructor() {
    super('Scores');
  }

  create() {
    this.model = this.sys.game.globals.model;
    this.scoring();
  }

  async scoring() {
    try {
      const data = await getData();

      let y = 100;
      this.text = this.add.text(300, y - 50, 'Best Scores', { fontSize: 40 });

      data.forEach((result, index) => {
        this.text = this.add.text(300, y, `${index + 1}. : ${result.user.name} : ${result.score}`, { fontSize: 40 });
        y += 50;
      });
    } catch {
      this.text = this.add.text(300, 100, 'unable to fetch data', { fontSize: 40 });
    }
  }
}
