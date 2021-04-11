import 'phaser'
import { Goose, GooseLaser} from './Goose';

const PlatformGroup = function (game, group_img) {

    var platforms = game.physics.add.staticGroup();

    // platforms.create(400, 568, group_img).setScale(0.1).refreshBody();

    platforms.create(600, 400, group_img).setScale(0.1).refreshBody();
    platforms.create(50, 350, group_img).setScale(0.1).refreshBody();
    platforms.create(750, 320, group_img).setScale(0.1).refreshBody();
    return platforms;
};

const PlatformDynGroup = function (game, group_img) {
    var platforms = game.physics.add.group();

    platforms.create(500, 100, group_img).setScale(0.1).refreshBody();
    platforms.create(100, 100, group_img).setScale(0.1).refreshBody();
    platforms.children.iterate(function (child) {      
        child.setVelocityY(10);
        child.setVelocityX(0);
        child.setImmovable(true);


        var goose = game.physics.add.existing(new Goose(game, child.x, -20));
        game.physics.add.collider(goose, child);
        // game.physics.add.collider(goose, game.movingPlatforms);
        goose.setVelocityY(10);
        goose.addSprite('goose');
        goose.addRules();
    });
    return platforms;
}

const FireFloor = function (game, group_img) {
    var firefloor = game.physics.add.staticGroup();
    var x = 0;
     
    for (var i=0; i<50; i += 1) {
        firefloor.create(x, 550, group_img);
        x += 20;
    }

}

export { PlatformGroup, PlatformDynGroup, FireFloor }