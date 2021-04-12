import 'phaser';
import Button from '../Objects/Button';
// import geData from '../GameData/get';
import getData from '../GameData/get';

export default class ScoreScene extends Phaser.Scene {
  constructor () {
    super('Scores');
  }

  create () {
    this.model = this.sys.game.globals.model;   
    // this.text = this.add.text(300, 100, `0. ${result.user.name} : ${result.score}`, { fontSize: 40 });
    this.scoring();
  }

  async scoring() {
    try {
        const data = await getData();
        
        var y = 100; 
        data.forEach((result, index) => {
            this.text = this.add.text(300, y, `${index + 1}. ${result.user.name} : ${result.score}`, { fontSize: 40 });
            y += 50;
        });
    }
    catch {
        this.text = this.add.text(300, 100, `uaable to fetch data`, { fontSize: 40 });
    }
            
}    

}
