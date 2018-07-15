import Phaser from 'phaser';
import Tile from '../classes/tile';

export default class Lobby extends Phaser.Scene {
  constructor() {
    super({
      key: 'lobby'
    });
  }

  preload () {}

  create() {
    const Bullet = new Phaser.Class({
      Extends: Phaser.GameObjects.Image,
      initialize: function Bullet (scene) {
        console.warn(scene)
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');
        this.speed = 1;
        this.born = 0;
        this.direction = 0;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.setSize(12, 12, true);
      },
      fire: function (shooter, target) {
        this.setPosition(shooter.x, shooter.y); // Initial position
        this.direction = Math.atan( (target.x-this.x) / (target.y-this.y));

        // Calculate X and y velocity of bullet to moves it from shooter to target
        if (target.y >= this.y) {
          this.xSpeed = this.speed*Math.sin(this.direction);
          this.ySpeed = this.speed*Math.cos(this.direction);
        } else {
          this.xSpeed = -this.speed*Math.sin(this.direction);
          this.ySpeed = -this.speed*Math.cos(this.direction);
        }

        this.rotation = shooter.rotation; // angle bullet with shooters rotation
        this.born = 0; // Time since new bullet spawned
      },

      // Updates the position of the bullet each cycle
      update: function (time, delta) {
        this.x += this.xSpeed * delta;
        this.y += this.ySpeed * delta;
        this.born += delta;
        if (this.born > 1800) {
            this.setActive(false);
            this.setVisible(false);
        }
      }

    });
    //  move the reticle on mouse move
    this.input.on('pointermove', function (pointer) {
      if (this.input.mouse.locked) {
        if(pointer.movementX > 0 && !this.reticle.freezePlusX) {
          this.reticle.setVelocityX(pointer.movementX*(this.player.speed/2));
        }
        if(pointer.movementX < 0 && !this.reticle.freezeMinusX) {
          this.reticle.setVelocityX(pointer.movementX*(this.player.speed/2));
        }
        if(pointer.movementY > 0 && !this.reticle.freezePlusY) {
          this.reticle.setVelocityY(pointer.movementY*(this.player.speed/2));
        }
        if(pointer.movementY < 0 && !this.reticle.freezeMinusY) {
          this.reticle.setVelocityY(pointer.movementY*(this.player.speed/2));
        }
      }
    }, this);

    // Fires bullet from player on left click of mouse
    this.input.on('pointerdown', function (pointer, time, lastFired) {
      if (this.input.mouse.locked) {
        if (this.player.active === false) {
          return;
        }
        console.log(this.player.bullets)
        // Get bullet from bullets group
        var bullet = this.player.bullets.get().setActive(true).setVisible(true);

        if (bullet) {
          bullet.fire(this.player, this.reticle);
          // this.physics.add.collider(enemy, bullet, enemyHitCallback);
        }
      }
    }, this);


    // Pointer lock will only work after mousedown
    game.canvas.addEventListener('mousedown', function () {
      game.input.mouse.requestPointerLock();
    });

    this.allTiles = [
      [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
      [16,17,18,18,19,20,21,22,23,24,25,26,27,28,29,30],
      [31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46],
      [47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62],
      [63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78],
      [79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94],
      [95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110],
      [220,221,1,1,1,1,1,1,1,1,1,0,34,32,71,72],
      [0,1,1,1,1,1,1,1,1,1,1,0,54,23,73,74],
      [0,1,1,1,1,1,1,1,1,1,0,0,23,3,75,76],
      [0,0,1,1,1,1,1,1,1,1,0,0,23,77,78,89],
      [0,0,1,1,1,1,1,1,1,0,0,0,79,80,84,90]
    ];
    this.tileMap = [
      [0,0,0,1,1,1,1,1,1,0,0,0,1,2,54,54],
      [2,0,1,1,3,1,1,1,1,0,0,0,3,4,45,60],
      [0,  1,  1,  1,  68, 68, 68, 68,  68,109,1,1,0,7,8,65,66],
      [0,  1,  1,  1,  68, 68, 68, 68,  68,137,1,1,0,7,8,65,66],
      [0,  1,  1,  1,  68, 68, 68, 68,  68,137,1,0,7,8,65,66],
      [1,  1,  1,  0,  140,68, 68, 68,  68,137,1,0,9,10,67,68],
      [2,  1,  1,  0,  137,68, 68, 68,  68,137,1,2,12,13,69,70],
      [1,  1,  1,  1,  135,110,110,110,110,136,0,34,32,71,72],
      [0,1,1,1,1,1,1,1,1,1,1,0,54,23,73,74],
      [0,1,1,1,1,1,1,1,1,1,0,0,23,3,75,76],
      [0,0,1,1,1,1,1,1,1,1,0,0,23,77,78,89],
      [0,0,1,1,1,1,1,1,1,0,0,0,79,80,84,90]
    ];

    this.tiles = [];

    for (var i = 0; i < this.tileMap.length; i++) {
      const row = {
        key: 'tiles',
        frame: this.tileMap[i],
        setXY: {
          x: 32,
          y: (64*i)+32,
          stepX: 64,
        }
      }
      this.tiles.push(row)
    }
    // Set world bounds
    this.physics.world.setBounds(0, 0, 3200, 3200);
    this.grid = this.add.group(this.tiles);
    this.grid.x = 0;
    this.grid.y = 0;
    this.player = this.physics.add.sprite(100, 400, 'characters', 'hitman1_gun');

    this.player.bullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });
    this.reticle = this.physics.add.sprite(100, 500, 'target');
    this.player.setOrigin(0.5, 0.5).setCollideWorldBounds(true).setDrag(500, 500);
    this.reticle.setOrigin(0.5, 0.5);
    console.log(this.reticle)
    this.player.speed = 400;
    this.keys = {
      W: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      A: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      S: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      D: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      shift: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT),
    };
    this.vector = new Phaser.Math.Vector2();
    this.cameras.main.setBounds(0, 0, 3200, 3200);
    console.log(this)
  }

  update() {
    this.player.setMaxVelocity(600);
    this.reticle.setMaxVelocity(600);
    if (this.keys.W.isDown) {
      this.vector.y -= this.player.speed;
    }
    if (this.keys.A.isDown) {
      this.vector.x -= this.player.speed;
    }
    if (this.keys.S.isDown) {
      this.vector.y += this.player.speed;
    }
    if (this.keys.D.isDown) {
      this.vector.x += this.player.speed;
    }
    if (this.keys.shift.isDown) {
      this.player.setMaxVelocity(600);
      this.reticle.setMaxVelocity(600);
    }
    this.vector.normalize();
    this.vector.scale(this.player.speed);

    this.player.setVelocityX(this.vector.x);
    this.player.setVelocityY(this.vector.y);
    this.reticle.setVelocityX(this.vector.x);
    this.reticle.setVelocityY(this.vector.y);
    this.vector.set(0, 0);

    this.player.rotation = Phaser.Math.Angle.Between(this.player.x, this.player.y, this.reticle.x, this.reticle.y);

    // Keep the player in the cener when possible
    this.cameras.main.scrollX = this.player.x - 400;
    this.cameras.main.scrollY = this.player.y - 300;
    this.constrainReticle(this.reticle);
  }

  // Ensures reticle does not move offscreen
  constrainReticle() {
    this.reticle.freezePlusX = false;
    this.reticle.freezeMinusX = false;
    this.reticle.freezePlusY = false;
    this.reticle.freezeMinusY = false;

    var distX = this.reticle.x-this.player.x; // X distance between this.player & this.reticle
    var distY = this.reticle.y-this.player.y; // Y distance between this.player & this.reticle
    // Ensures this.reticle cannot be moved offscreen (this.player follow)
    if (distX > 400) {
      this.reticle.freezePlusX = true;
    }
    if (distX < -400) {
      this.reticle.freezeMinusX = true;
      // console.log(this.reticle.x)
    }
    if (distY > 300) {
      this.reticle.freezePlusY = true;
    }
    if (distY < -300) {
      this.reticle.freezeMinusY = true;
      // console.log(this.reticle.x)
    }
  }
}
