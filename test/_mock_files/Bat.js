class Bat {
  constructor(scene, x, y) {
    this.scene = scene;
    this.x = x;
    this.y = y;
  }

  createAnim({ key: myKey, repeat: num }) {
    this.key = myKey;
    this.repeat = num === -1 ? Infinity : num;
  }

  addAnim() {
    this.createAnim({
      key: 'fly',
      repeat: -1,
    });
  }
}

export default Bat;