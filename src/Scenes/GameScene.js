import 'phaser';
import sky from '../assets/WorldAssets/sky.png';
import platform from '../assets/WorldAssets/flat.png';
import star from '../assets/WorldAssets/star.png';
import dude from '../assets/WorldAssets/dude.png';
import bomb from '../assets/WorldAssets/bomb.png';
import bat from '../assets/WorldAssets/bat.png';
import goose from '../assets/WorldAssets/goose.png';
import laser from '../assets/WorldAssets/shot.png';
import moving_flat from '../assets/WorldAssets/moving_flat.png';
import fire from '../assets/WorldAssets/animated_torch.gif';
import background from '../assets/WorldAssets/Full-Moon-background.png';
import Player from '../GameObjects/Player';
import { PlatformGroup, PlatformDynGroup, FireFloor } from '../GameObjects/Platforms';
import Bat from '../GameObjects/Bats';
import { StarGroup, setStarOverlap } from '../GameObjects/Stars';
import Bombs from '../GameObjects/Bombs';
import { Goose, GooseLaser } from '../GameObjects/Goose';


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
    this.load.image('background', background);
    this.load.image('ground', platform);
    this.load.image('moving_flat', moving_flat);
    this.load.image('star', star);
    this.load.image('bomb', bomb);
    this.load.spritesheet('dude', 
        dude,
        { frameWidth: 15, frameHeight: 48 }
    );
    this.load.spritesheet('bat', 
      bat, 
      { frameWidth: 32, frameHeight: 48}
    )
    this.load.spritesheet('goose', 
      goose, 
      { frameWidth: 70, frameHeight: 80}
    )
    this.load.image('fire', fire);
    this.load.image('laser', laser);
  }

  create () {
    this.add.image(400, 300, 'background');

    this.platforms = PlatformGroup(this, 'ground');
    this.movingPlatforms = PlatformDynGroup(this, 'moving_flat');
    this.firefloor = FireFloor(this, 'fire');

    this.player =  this.physics.add.existing(new Player(this, 600, 350));
    this.player.addSprite('dude');
    this.player.addRules();
    this.player.addAnim('dude');

    this.goose = this.physics.add.existing(new Goose(this, 450, 350));
    this.goose.addSprite('goose');
    this.goose.addRules();

    this.bat = this.physics.add.existing(new Bat(this, 120, 470));
    this.bat.addSprite('bat');
    this.bat.addRules();  
    
    this.stars = StarGroup(this, 'star');

    this.bombs =  this.physics.add.existing(new Bombs(this));

    this.physics.add.collider(this.player, this.platforms);
    
    this.physics.add.collider(this.stars, this.platforms);

    var score = 0;
    var scoreText;
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    // setStarOverlap (this, this.player, this.stars, score, scoreText, this.bombs, 'bomb'); 

    var gameOverText;

    
    gameOverText = this.add.text(400, 300, 'Game Over', { fontSize: '64px', fill: '#000' });
    gameOverText.setOrigin(0.5);
    gameOverText.visible = false;

    // this.bombs = this.physics.add.group();
 

    // this.physics.add.collider(this.bombs, this.platforms);

    // this.physics.add.collider(this.player, this.bombs, hitBomb, null, this);

    // this.bombs.hitBombAction(this, this.player, this.bombs, gameOverText);


    // function hitBomb (player, bomb)
    // {
    //     this.physics.pause();

    //     this.player.setTint(0xff0000);

    //     this.player.anims.play('turn');

    //     this.gameOver = true;

    //     gameOverText.visible = true;

    //     this.input.on('pointerdown', () => this.scene.start('Preloader'));
    // }
    
  }

  update () {
    this.player.moveUpdates();
    this.bat.addAnim('bat');  
  }
};
