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

function setStarOverlap (game, Player, stars, score, scoreText, bombs, bombSprite) {
    game.physics.add.overlap(game.player, game.stars, collectStar, null, game);

    function collectStar (player, star) { 
        star.disableBody(true, true);
        score += 10;
        scoreText.setText('Score: ' + score);

        if (stars.countActive(true) === 0)
        {
            stars.children.iterate(function (child) {

                child.enableBody(true, child.x, 0, true, true);

            });

            bombs.release(Player, bombSprite); 
            bombs.addRules();
        }
    }
}


export { StarGroup, setStarOverlap }