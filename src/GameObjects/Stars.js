import 'phaser'

const StarGroup = function (game, sprite) {
    var stars = game.physics.add.group({
        key: sprite,
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });      
      
    stars.children.iterate(function (child) {        
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        child.setGravityY(1000);
    });
    return stars;
}

export default StarGroup