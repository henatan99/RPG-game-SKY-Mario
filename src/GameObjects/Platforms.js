import 'phaser'

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

    platforms.create(500, 350, group_img).setScale(0.1).refreshBody();
    platforms.create(100, 350, group_img).setScale(0.1).refreshBody();
    platforms.children.iterate(function (child) {      
        child.setVelocityY(10);
        child.setVelocityX(0);
        child.setImmovable(true);
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
    
    // firefloor.create(0, 550, group_img);
    // firefloor.create(50, 550, group_img);
}

export { PlatformGroup, PlatformDynGroup, FireFloor }