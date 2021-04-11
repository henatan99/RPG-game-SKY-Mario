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

    platforms.create(500, 50, group_img).setScale(0.1).refreshBody();
    platforms.create(300, 50, group_img).setScale(0.1).refreshBody();
    platforms.create(100, 50, group_img).setScale(0.1).refreshBody();
    platforms.children.iterate(function (child) {      
        child.setVelocityY(10);
        child.setVelocityX(0);
        child.setImmovable(true);


        var goose = game.physics.add.existing(new Goose(game, child.x, child.y - 50));
        game.physics.add.collider(goose, child);
        goose.setVelocityY(10);
        var velX = 10;
        goose.addSprite('goose');
        goose.addRules();
        
        var dirTimer = game.time.addEvent({
            delay: 1000,
            callback: function() {
              if (goose.x <= (child.x - 50) || goose.x >= (child.x + 50)) {
                  velX = -velX;
                  if (velX < 0) {
                      goose.flipX = true;
                  }
                  else {
                      goose.flipX = false;
                  }                  
              }
              goose.setVelocityX(velX);          
            },
            
            callbackScope: platforms,
            loop: true
        });
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