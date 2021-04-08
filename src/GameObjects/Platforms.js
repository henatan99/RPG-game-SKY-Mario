import 'phaser'

const PlatformGroup = function (game, group_img) {

    var platforms = game.physics.add.staticGroup();

    platforms.create(400, 568, group_img).setScale(2).refreshBody();

    platforms.create(600, 400, group_img);
    platforms.create(50, 350, group_img);
    platforms.create(750, 320, group_img);
    return platforms;
};

const PlatformDynGroup = function (game, group_img) {
    var platforms = game.physics.add.group();

    platforms.create(500, 350, group_img).setScale(0.1).refreshBody();
    platforms.create(100, 350, group_img).setScale(0.1).refreshBody();
    platforms.children.iterate(function (child) {      
        child.setGravityY(10);
    });
    return platforms;
}

export { PlatformGroup, PlatformDynGroup }