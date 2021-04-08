import 'phaser'

// class Platforms extends Phaser.Physics.Arcade.StaticGroup {
//     constructor(scene) {
//         super(scene); // The frame is optional
//         // this.scene.add.existing(this);
//     }   
    
//     addPlatforms (group_img) {
//         this.create(400, 568, group_img).setScale(2).refreshBody();

//         this.create(600, 400, group_img);
//         this.create(50, 350, group_img);
//         this.create(750, 320, group_img);
//     }
// }

// export default Platforms


const PlatformGroup = function (game, group_img) {

    var platforms = game.physics.add.staticGroup();

    platforms.create(400, 568, group_img).setScale(2).refreshBody();

    platforms.create(600, 400, group_img);
    platforms.create(50, 350, group_img);
    platforms.create(750, 320, group_img);
};

export default PlatformGroup