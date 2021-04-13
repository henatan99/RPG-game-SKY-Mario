import Goose from './Goose';
import { gameOverConfig, gameIsOver } from './GameOver';

const PlatformGroup = function (game, groupImg) {
  const platforms = game.physics.add.staticGroup();

  platforms.create(600, 400, groupImg).setScale(0.1).refreshBody();
  platforms.create(0, 350, groupImg).setScale(0.1).refreshBody();
  platforms.create(750, 320, groupImg).setScale(0.1).refreshBody();
  return platforms;
};

const PlatformDynGroupFree = function (game, groupImg) {
  const platforms = game.physics.add.group();

  platforms.create(500, 50, groupImg).setScale(0.1).refreshBody();
  platforms.create(100, 50, groupImg).setScale(0.1).refreshBody();
  platforms.create(200, 550, groupImg).setScale(0.1).refreshBody();

  platforms.children.iterate((child) => {
    child.setVelocityY(10);
    child.setVelocityX(0);
    child.setImmovable(true);
    child.setCollideWorldBounds(true);
    child.setBounce(1, 1);
  });

  return platforms;
};

const PlatformDynGroup = function (game, groupImg, player) {
  const platforms = game.physics.add.group();

  platforms.create(300, 50, groupImg).setScale(0.1).refreshBody();
  platforms.create(400, 550, groupImg).setScale(0.1).refreshBody();
  platforms.children.iterate((child) => {
    child.setVelocityY(10);
    child.setVelocityX(0);
    child.setImmovable(true);
    child.setCollideWorldBounds(true);
    child.setBounce(1, 1);


    const goose = game.physics.add.existing(new Goose(game, child.x, child.y - 50));
    game.physics.add.collider(goose, child);
    goose.setVelocityY(10);
    let velX = 10;
    goose.addSprite('goose');
    goose.addRules();

    gameOverConfig(game);
    function gameisOver() {
      return gameIsOver(game);
    }

    game.physics.add.overlap(player, goose, gameisOver, null, game);

    game.time.addEvent({
      delay: 1000,
      callback() {
        if (goose.x <= (child.x - 40) || goose.x >= (child.x + 40)) {
          velX = -velX;
          if (velX < 0) {
            goose.flipX = true;
          } else {
            goose.flipX = false;
          }
        }
        goose.setVelocityX(velX);
      },

      callbackScope: platforms,
      loop: true,
    });
  });
  return platforms;
};

const FireFloor = function (game, groupImg) {
  const firefloor = game.physics.add.staticGroup();
  let x = 0;

  for (let i = 0; i < 50; i += 1) {
    firefloor.create(x, 550, groupImg);
    x += 20;
  }
  return firefloor;
};

export {
  PlatformGroup, PlatformDynGroup, PlatformDynGroupFree, FireFloor,
};