(function(){
    sBoot = function(game){
      console.log("%c booting system; heart[startPumping[80]] ", "color:white; background:#3bcbe0");
    }
    sPreload = function(game){}; 
    sTitle = function(game){}; 
    sScene = function(game){}; 
    sGameOver = function(game){};
    
    sBoot.prototype = {
      preload: function(){
        var preloadImage, preloadDataURI;
              preloadImage = new Image();
              preloadImage.src = preloadData;
              this.game.cache.addImage('preload', preloadDataURI, preloadImage);
          },
          create:function(){
              this.game.state.start('Preload');
          }	
    }
    //=========end boot
    //=========start preload
    
    sPreload.prototype = {
      preload: function(){
        var loadbar = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preload', 0);
        var loadText = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 50, 'loading ...', {fill:'#fff', font:'16px "VT323"'});
  
        loadbar.anchor.setTo(.5);
        loadText.anchor.setTo(.5);
        this.load.setPreloadSprite(loadbar);
        
        //add images
        this.pngImages = {};
        this.cachedImages = {};
        this.imageData = imageArray;this.addImage('andro', {w:32, h:33, frames:30});
        this.addImage('tile', {w:25, h:25, frames: 100});
        
        
      },
      create:function(){
        this.game.state.start('Scene');
      },
      addImage: function(name, sheet){
        if(!sheet || sheet == undefined){
          sheet = false;
        }
        if(this.imageData.hasOwnProperty(name)){
          var imageName, imageDataURI, theImage;
          imageDataURI = this.imageData[name]
          this.pngImages[name] = new Image();
          this.pngImages[name].src = imageDataURI;
          imageName = ''+name;
          theImage = this.pngImages[name];
          this.game.cache.addImage(imageName, imageDataURI, theImage);
          //create spritesheet
  
          if(sheet){
            var sheetName, cachedImage;
            cachedImage = this.game.cache.getImage(imageName).src;
            sheetName = imageName + 'Sheet';
            this.game.load.spritesheet(sheetName, cachedImage, sheet.w, sheet.h, sheet.frames);
          }
        }
      }
    }
    //=========end preload
    
    sScene.prototype = {
      preload: function(){
                  
        console.log('preload scene')
      },
      create:function(){
        this.currentTime = Date.now();
        this.game.stage.backgroundColor = "#181818";
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
       
        
        //inputs
        this.cursor = this.game.input.keyboard.createCursorKeys();
        this.cursor.jump = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        
        
        //settings
        this.settings = {
          playerSpeed: 140,
          playerJump:-300,
          playerWidth:20,
          playerHeight:31,
          scale:1,
          playerGravity:700,
          playerClimbGravity:300,
        }
        
        this.buildWorld();
        this.addPlayer();
       
      },//create
      buildWorld: function(){
        this.platforms = this.game.add.group();
        this.platforms.enableBody = true;
                                            
        this.pSwitches = this.game.add.group();
        this.pSwitches.enableBody = true;
        
        this.monoTiles = this.game.add.group();
        this.monoTiles.enableBody = true;
        
        var ground = this.game.add.sprite(-100, 400, 'bleh', 0, this.platforms);
        ground.width= 700;
        ground.height = 40;
        ground.anchor.setTo(0,1)
        
        var ps1 = this.game.add.sprite(300, 50, 'bleh', 0, this.pSwitches)
        var eg = this.game.add.text(330, 50, "← Platform direction switch", {fill:'#efefef', font:'14px arial'})
        var ps2 = this.game.add.sprite(300, 360, '', 0, this.pSwitches)
        ps1.width = ps1.height = 25;
        ps2.width = ps2.height = 25;
        var ps3 = this.game.add.sprite(30, 200, '', 0, this.pSwitches)
        var ps4 = this.game.add.sprite(500, 200, '', 0, this.pSwitches)
        ps3.width = ps3.height = 25;
        ps4.width = ps4.height = 25;
                                            
        
        var mono1 = this.monoTiles.create(300, 100, 'bleh')
        mono1.width = 60;
        mono1.height = 15;
        mono1.body.allowGravity = false;
        mono1.body.collideWorldBounds = true
        mono1.body.velocity.y = 100;
                                            
        var mono2 = this.monoTiles.create(120, 210, 'bleh')
        mono2.width = 60;
        mono2.height = 15;
        mono2.body.allowGravity = false;
        mono2.body.collideWorldBounds = true
        mono2.body.velocity.x = 100;
                                            
        this.platforms.setAll('body.immovable', true);
        this.pSwitches.setAll('body.immovable', true);
        this.monoTiles.setAll('body.immovable', true)
        //monoDirectional
        this.monoTiles.forEach((function(mt){
          mt.body.checkCollision.down = false;
          mt.body.checkCollision.left = false;
          mt.body.checkCollision.right = false;
        }), this)
        
          mono2.body.checkCollision.left = true;
          mono2.body.checkCollision.right = true;
        
      },//build the world
      addPlayer: function(){
        this.player = this.game.add.sprite(100, 50, 'androSheet', 0);
        this.player.animations.add('stand', [0, 1, 2, 3, 0, 0, 0, 0], 10, true);
        this.player.animations.add('run', [4,5,6,7,8,9], 10, true);
        this.player.animations.add('jump', [ 12,13,14,14,14,14,14,14,14,14,14], 10, false);
        this.player.animations.add('fall', [15,14,16,17], 8, false);
        
        this.game.physics.arcade.enable(this.player)
        this.player.anchor.setTo(.5, 1);
        this.player.onGround = true;
        this.player.body.gravity.y = this.settings.playerGravity;
        this.player.body.width = this.settings.playerWidth;
        this.player.body.height = this.settings.playerHeight;
        
        
      },//add player
      update: function(){
        //collisions
        this.doCollisions();
        
        //playerUpdates
        if(this.player.body.touching.down){
          this.player.onGround = true;
          this.player.canDoubleJump = true;
        }else{
          this.player.onGround = false;
        }
        
        //move player
        this.movePlayer();
        this.animatePlayer();
        
       
       
        //camera
        //this.camera.follow(this.player);
        this.camera.focusOnXY(this.player.x, this.player.y -50 )
        
        
      },//update
      doCollisions: function(){
        
       //player and walls
       this.game.physics.arcade.collide(this.player, this.platforms);
        
        //player and monodirectional tiles
        this.player.onMono = false;
        this.game.physics.arcade.collide(this.player, this.monoTiles, (function(a,b){
          if(this.player.body.touching.down){
                this.player.onMono = true; 
          }else{
            this.player.onMono = false;
          }
        }), (function(player, tile){
          player.body.moves = true;
          if(this.player.ghosting && tile.body.velocity.y <= 0){
            player.body.moves= false;
            player.y += 2;
            this.player.body.velocity.y = 120
          }else{
            player.moves = true;
          }
        }), this);
                                            
        //platforms and pSwitches
        this.game.physics.arcade.overlap(this.monoTiles, this.pSwitches, (function(a,b){
          a.body.velocity.y == 0? a.body.velocity.x *= -1 : a.body.velocity.y *= -1;
        }))
      },//collisions
      movePlayer: function(){
        var that = this;
        
        //left
        if(this.cursor.left.isDown){
          this.player.scale.x = -1;
          this.player.body.velocity.x = this.player.scale.x * this.settings.playerSpeed
        }else if(this.cursor.right.isDown){
          this.player.scale.x = 1;
          this.player.body.velocity.x = this.player.scale.x * this.settings.playerSpeed
        }else{
          this.player.body.velocity.x = 0;
        }
        
        if(this.cursor.down.isDown){
          if(this.player.onMono){
            this.player.ghosting = true;
            this.game.time.events.add(120, (function(){
               this.player.ghosting = false;
            }), this)
          }else{
            this.player.ghosting = false;
          }
        }
        
        //jump
        if(this.cursor.jump.isDown && !this.holdingJump && this.player.onGround){
          this.holdingJump = true;
          this.player.body.velocity.y = this.settings.playerJump;
        }
        
        this.input.keyboard.onUpCallback = function(e){
          var key = e.keyCode;
          if(key == that.cursor.jump.keyCode){
            that.holdingJump = false;
            if(that.player.body.velocity.y <= 0){
              that.player.body.velocity.y = 0;
            }
          }
        }
        
      },//move player
      animatePlayer: function(){
        if(this.player.onGround){
          if(this.player.body.velocity.x != 0){
            this.player.play('run')
          }else{
            this.player.play('stand')
          }
          
        }else{
          if(this.player.body.velocity.y <=0){
            this.player.play('jump');
          }else{
            this.player.play('fall');
          }
        }
        
      },//animate player
     
    }
    
    
    
    var game = new Phaser.Game(600, 400, Phaser.AUTO, 'game');
    
    game.state.add('Boot', sBoot);
          game.state.add('Preload', sPreload);
          game.state.add('Scene', sScene);
          game.state.start('Boot');
    
  })()