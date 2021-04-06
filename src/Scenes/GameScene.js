import 'phaser';
import sky from '../assets/WorldAssets/sky.png';
import platform from '../assets/WorldAssets/platform.png';
import star from '../assets/WorldAssets/star.png';
import dude from '../assets/WorldAssets/dude.png';
import bomb from '../assets/WorldAssets/bomb.png';
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
    this.load.image('star', star);
    this.load.image('bomb', bomb);
    this.load.spritesheet('dude', 
        dude,
        { frameWidth: 32, frameHeight: 48 }
    );
  }

  create () {
    this.add.image(400, 300, 'sky');

    var platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    platforms.create(600, 400, 'ground');
    platforms.create(50, 350, 'ground');
    platforms.create(750, 320, 'ground');


    this.player = this.physics.add.sprite(100, 450, 'dude');

    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    this.physics.add.collider(this.player, platforms);  
    
    this.stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 }
      });
      
    this.stars.children.iterate(function (child) {
      
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      
    });

    this.physics.add.collider(this.stars, platforms);
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

    this.physics.add.collider(this.bombs, platforms);

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
    this.player.body.setVelocity(0);

    var cursors = this.input.keyboard.createCursorKeys(); 

    if (cursors.left.isDown)
    {
        this.player.setVelocityX(-260);

        this.player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        this.player.setVelocityX(260);

        this.player.anims.play('right', true);
    }
    else
    {
        this.player.setVelocityX(0);

        this.player.anims.play('turn');
    }

    if (cursors.up.isDown && this.player.body.touching.down)
    {
        this.player.setVelocityY(-20000);
    }
  }
};
