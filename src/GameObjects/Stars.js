import 'phaser'

const StarGroup = function (game, sprite) {
    var stars = game.physics.add.group({
        key: sprite,
        repeat: 6,
        setXY: { x: 6, y: 200, stepX: Phaser.Math.Between(100, 150), stepY: Phaser.Math.Between(-70, 70) }
    });
    
    return stars;
}

function bigStar (game, group_img, x = 10) {
    var bigStars = game.physics.add.group();
    bigStars.create(x, 200, group_img).setScale(2.0).refreshBody();    
    return bigStars;     
}

function setStarOverlap (game, Player, stars, bigStars, score, scoreText) {
    game.physics.add.overlap(game.player, game.stars, collectStar, null, game);
    game.physics.add.overlap(game.player, game.bigStars, collectBigStar, null, game);

    function collectStar (player, star) { 
        star.disableBody(true, true);
        score += 10;
        scoreText.setText('Score: ' + score);
    }

    function collectBigStar (player, bigstar) { 
        bigstar.disableBody(true, true);
        score += 50;
        scoreText.setText('Score: ' + score);
        
        game.bigStars = bigStar(game, 'big_star', 800 - Player.x);
        // if (Player.x >= 300) {
        //     game.bigStars = bigStar(game, 'big_star', 10);
        //     // setStarOverlap (game, Player, stars, bigStars, score, scoreText);
        // }

        // else {
        //     game.bigstars = bigStar(game, 'big_star', 750);
        //     // setStarOverlap (game, Player, stars, bigStars, score, scoreText)
        // }
        
        game.stars = StarGroup(game, 'star');
        setStarOverlap (game, Player, stars, bigStars, score, scoreText);
    }
    game.physics.add.overlap(game.player, game.bigStars, collectBigStar, null, game);
}


export { StarGroup, bigStar, setStarOverlap }