import 'phaser';
import sky from '../assets/WorldAssets/sky.png';
import platform from '../assets/WorldAssets/platform.png';
import star from '../assets/WorldAssets/star.png';
import dude from '../assets/WorldAssets/dude.png';
import bomb from '../assets/WorldAssets/bomb.png';
import bat from '../assets/WorldAssets/bat.png';
import moving_flat from '../assets/WorldAssets/moving_flat.png';
import Player from '../GameObjects/Player';
import { PlatformGroup, PlatformDynGroup } from '../GameObjects/Platforms';
import Bat from '../GameObjects/Bats';
import StarGroup from '../GameObjects/Stars';

import PreloaderScene from './PreloaderScene';

export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
    this.score = 0;
    this.gameOver = false;
  }

  preload () {
    // load images
    this.load.image('sky', sky);
    this.load.image('ground', platform);
    this.load.image('moving_flat', moving_flat);
    this.load.image('star', star);
    this.load.image('bomb', bomb);
    this.load.spritesheet('dude', 
        dude,
        { frameWidth: 32, frameHeight: 48 }
    );
    this.load.spritesheet('bat', 
      bat, 
      { frameWidth: 32, frameHeight: 48}
    )
  }

  create () {
    this.add.image(400, 300, 'sky');

    this.platforms = PlatformGroup(this, 'ground');
    this.movingPlatforms = PlatformDynGroup(this, 'moving_flat');

    this.player =  this.physics.add.existing(new Player(this, 100, 450));
    this.player.addSprite('dude');
    this.player.addRules();
    this.player.addAnim('dude');

    this.bat = this.physics.add.existing(new Bat(this, 120, 470));
    this.bat.addSprite('bat');
    this.bat.addRules();  
    
    this.stars = StarGroup(this, 'star');

    this.physics.add.collider(this.player, this.platforms);
    
    // this.stars = this.physics.add.group({
    //   key: 'star',
    //   repeat: 11,
    //   setXY: { x: 12, y: 0, stepX: 70 }
    // });
    
    
    // this.stars.children.iterate(function (child) {
      
    //   child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    //   child.setGravityY(1000);
    // });

    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.overlap(this.player, this.stars, collectStar, null, this);

    function collectStar (player, star)
    {
        star.disableBody(true, true);
        score += 10;
        scoreText.setText('Score: ' + score);

        if (this.stars.countActive(true) === 0)
        {
            this.stars.children.iterate(function (child) {

                child.enableBody(true, child.x, 0, true, true);

            });

            var x = (this.player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            var bomb = this.bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

        }
    }

    var score = 0;
    var scoreText;
    var gameOverText;

    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    gameOverText = this.add.text(400, 300, 'Game Over', { fontSize: '64px', fill: '#000' });
    gameOverText.setOrigin(0.5);
    gameOverText.visible = false;

    this.bombs = this.physics.add.group();

    this.physics.add.collider(this.bombs, this.platforms);

    this.physics.add.collider(this.player, this.bombs, hitBomb, null, this);


    function hitBomb (player, bomb)
    {
        this.physics.pause();

        this.player.setTint(0xff0000);

        this.player.anims.play('turn');

        this.gameOver = true;

        gameOverText.visible = true;

        this.input.on('pointerdown', () => this.scene.start('Preloader'));

        // timedEvent = this.time.delayedCall(3000, this.scene.start('Preloader'), [], this.gameOver);
    }
    
  }

  update () {
    this.player.moveUpdates();  
  }
};
