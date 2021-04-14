class Player {
  constructor(scene, x, y, setCollideWorldBounds, setBounce, setGravity) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.setCollideWorldBounds = setCollideWorldBounds;
    this.setBounce = setBounce;
    this.setGravity = setGravity;
  }

  addRules(setCollideWorldBounds, setBounce, setGravity) {
    this.setCollideWorldBounds = setCollideWorldBounds;
    this.setBounce = setBounce;
    this.setGravity = setGravity;
  }
}

export default Player;
