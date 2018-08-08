var player,platforms,cursors,stars,score=0,scoreText,gameOver = false,bombs,button;
export class SimpleScene extends Phaser.Scene {
    preload() {
        this.load.image('cokecan', 'assets/cokecan.png');
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('dude', 
            'assets/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
      }
    create() {
     
      this.add.image(400, 300, 'sky');
      // this.add.image(380, 170, 'star');
      // this.add.image(380, 150, 'star');
      // this.add.image(380, 130, 'star');
      // this.add.image(200, 200, 'ground');
      // this.add.image(300, 170, 'bomb');
      // this.add.image(200, 170, 'bomb');      
      // this.add.image(100, 160, 'dude');
      // this.add.image(600, 300, 'ground');
      // this.add.image(200, 400, 'ground');
      // this.add.image(600, 500, 'ground');
           platforms = this.physics.add.staticGroup();
      
          platforms.create(400, 568, 'ground').setScale(2).refreshBody();
      
          platforms.create(600, 400, 'ground');
          platforms.create(50, 250, 'ground');
          platforms.create(750, 220, 'ground');
      
          player = this.physics.add.sprite(90, 450, 'dude');
          
          player.setBounce(0.2);
          player.setCollideWorldBounds(true);
          
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
          cursors = this.input.keyboard.createCursorKeys();
          this.physics.add.collider(player, platforms);
          
          stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });
        
        stars.children.iterate(function (child) {
        
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        
        });
        this.physics.add.collider(stars, platforms);
        this.physics.add.overlap(player, stars, collectStar, null, this);
        scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        function collectStar (player, star)
        {
            star.disableBody(true, true);
            score += 10;
            scoreText.setText('Score: ' + score);
            if (stars.countActive(true) === 0)
            {
                //  A new batch of stars to collect
                stars.children.iterate(function (child) {
        
                    child.enableBody(true, child.x, 0, true, true);
        
                });
        
                var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
        
                var bomb = bombs.create(x, 16, 'bomb');
                bomb.setBounce(1);
                bomb.setCollideWorldBounds(true);
                bomb.setVelocity(Phaser.Math.Between(-200, 200), 25);
                bomb.allowGravity = false;
        
            }
        }
        bombs = this.physics.add.group();


        this.physics.add.collider(bombs, platforms);
        
        this.physics.add.collider(player, bombs, hitBomb, null, this);
        function hitBomb (player, bomb)
        {
            this.physics.pause();
            player.setTint(0xff0000);
            player.anims.play('turn');
            gameOver = true;
        }
    }

    update(){

      cursors = this.input.keyboard.createCursorKeys();
      console.log(cursors);
      if(cursors.space.keycode==32 && gameOver==false)
      {
          console.log("gameOver")
      }
      if (cursors.left.isDown)
      {
          player.setVelocityX(-160);

          player.anims.play('left', true);
      }
      else if (cursors.right.isDown)
      {
          player.setVelocityX(160);

          player.anims.play('right', true);
      }
      else
      {
          player.setVelocityX(0);

          player.anims.play('turn');
      }

      if (cursors.up.isDown && player.body.touching.down)
      {
          player.setVelocityY(-320);
      }
    }
  }