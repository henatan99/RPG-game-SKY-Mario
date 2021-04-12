import 'phaser';
import sky from '../assets/WorldAssets/sky.png';
import platform from '../assets/WorldAssets/flat.png';
import star from '../assets/WorldAssets/star.png';
import big_star from '../assets/WorldAssets/star.png';
import dude from '../assets/WorldAssets/dude.png';
import bomb from '../assets/WorldAssets/bomb.png';
import bat from '../assets/WorldAssets/bat.png';
import goose from '../assets/WorldAssets/goose.png';
import laser from '../assets/WorldAssets/shot.png';
import moving_flat from '../assets/WorldAssets/moving_flat.png';
import moving_flat1 from '../assets/WorldAssets/moving_flat1.png';
import fire from '../assets/WorldAssets/animated_torch.gif';
import background from '../assets/WorldAssets/Full-Moon-background.png';
import Player from '../GameObjects/Player';
import { PlatformGroup, PlatformDynGroup, PlatformDynGroupFree ,FireFloor } from '../GameObjects/Platforms';
import Bat from '../GameObjects/Bats';
import { StarGroup, bigStar, setStarOverlap } from '../GameObjects/Stars';
// import Bombs from '../GameObjects/Bombs';
import { Goose, GooseLaser } from '../GameObjects/Goose';
import { gameOverConfig, gameIsOver } from '../GameObjects/GameOver';


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
    this.load.image('moving_flat1', moving_flat1);
    this.load.image('star', star);
    this.load.image('big_star', big_star);
    this.load.image('bomb', bomb);
    this.load.spritesheet('dude', 
        dude,
        { frameWidth: 32, frameHeight: 48 }
    );
    this.load.spritesheet('bat', 
      bat, 
      { frameWidth: 32, frameHeight: 30}
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
    this.freeMovingPlatforms = PlatformDynGroupFree (this, 'moving_flat1');    
    
    this.firefloor = FireFloor(this, 'fire');

    this.player =  this.physics.add.existing(new Player(this, 600, 350));
    this.player.addSprite('dude');
    this.player.addRules();
    this.player.addAnim('dude');

    this.movingPlatforms = PlatformDynGroup(this, 'moving_flat', this.player);

    this.bat = this.physics.add.existing(new Bat(this, 120, 470));
    this.bat.addSprite('bat');
    this.bat.addRules();  
    
    this.stars = StarGroup(this, 'star');
    this.bigStars = bigStar(this, 'big_star');

    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.player, this.movingPlatforms);
    this.physics.add.collider(this.player, this.freeMovingPlatforms);      
    this.physics.add.collider(this.stars, this.platforms);

    var score = 0;
    var scoreText;
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    setStarOverlap (this, this.player, this.stars, this.bigStars, score, scoreText);

    gameOverConfig(this);
    function game_is_over () {
      return gameIsOver(this);
    }
    
    this.physics.add.overlap(this.player, this.firefloor, game_is_over, null, this);
    this.physics.add.overlap(this.player, this.bat, game_is_over, null, this);       
    
  }

  update () {
    this.player.moveUpdates();
    this.bat.addAnim('bat');  
  }
};
