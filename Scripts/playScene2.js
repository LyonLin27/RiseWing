class playScene2 extends Phaser.Scene{
    constructor(){
        super("scene2");
        this.name = "scene2";
    }

    create(){
        this.physics.world.setBounds(0, 0, game.config.width, 2436 * 12.4);

        this.npcDialogData = this.cache.json.get('dialogData');
        // create animations
        this.anims.create({
            key: "cp_grow",
            frames: this.anims.generateFrameNumbers("checkpoint_grow"),
            frameRate: 12,
            repeat: 0
        });
        this.anims.create({
            key: "cp_inactive",
            frames: this.anims.generateFrameNumbers("checkpoint_start"),
            frameRate: 1,
            repeat: 0
        });
        this.anims.create({
            key: "wingItemLoop",
            frames: this.anims.generateFrameNumbers("wingItem"),
            frameRate: 6,
            repeat: -1
        });

        // screen overlay
        this.whiteScreen = this.add.image(game.config.width*0.5,game.config.height*0.5, "whiteScreen");
        this.blackScreen = this.add.image(game.config.width*0.5,game.config.height*0.5, "blackScreen");
        this.whiteScreen.setScrollFactor(0);
        this.blackScreen.setScrollFactor(0);
        this.whiteScreen.depth = 100;
        this.blackScreen.depth = 100;
        this.whiteScreen.scale  = 20;
        this.blackScreen.scale  = 20;
        this.whiteScreen.alpha = 1;
        this.blackScreen.alpha = 0;
        this.whiteAlphaTar = 1;
        this.blackAlphaTar = 0;

        //load in background
        let bg = this.add.image(game.config.width*0.5,this.physics.world.bounds.bottom/3*1.4,"bg_2_1");
        bg.setOrigin(0.5,1);
        bg.scale = 1;
        bg.setScrollFactor(0.2);
        bg = this.add.image(game.config.width*0.5,(this.physics.world.bounds.bottom-6000)/3*1.4,"bg_2_2");
        bg.setOrigin(0.5,1);
        bg.scale = 1;
        bg.setScrollFactor(0.2);
        bg = this.add.image(game.config.width*0.5,(this.physics.world.bounds.bottom-12000)/3*1.4,"bg_2_3");
        bg.setOrigin(0.5,1);
        bg.scale = 1;
        bg.setScrollFactor(0.2);
        bg = this.add.image(game.config.width*0.5,(this.physics.world.bounds.bottom-18000)/3*1.4,"bg_2_4");
        bg.setOrigin(0.5,1);
        bg.scale = 1;
        bg.setScrollFactor(0.2);
        bg = this.add.image(game.config.width*0.5,(this.physics.world.bounds.bottom-24000)/3*1.4,"bg_2_5");
        bg.setOrigin(0.5,1);
        bg.scale = 1;
        bg.setScrollFactor(0.2);

        let scrollFac = 0.3;
        let bg_scale = 0.75;
        let assetNamePrefix = "back_2l";
        let fullWid = game.config.width;
        let magicNum = 1/3*(1+scrollFac*2);
        for(let h = 0; h < this.physics.world.bounds.bottom; h += 1000){
            let randInt = Math.floor(Math.random()*6)+1; // 1~6
            let deltaHeight = randInt * 200;
            let assetName = assetNamePrefix + (randInt%3+1);
            h+= deltaHeight;
            let hgt = this.normalize(h)*magicNum;
            let asset = this.add.image(0, hgt, assetName);
            asset.setOrigin(0.0 + 0.5*Math.random(), 1.0);
            asset.scale = bg_scale;
            asset.setScrollFactor(scrollFac);
        }

        assetNamePrefix = "back_2r";
        for(let h = 0; h < this.physics.world.bounds.bottom; h += 1000){
            let randInt = Math.floor(Math.random()*6)+1; // 1~6
            let deltaHeight = randInt * 200;
            let assetName = assetNamePrefix + (randInt%3+1);
            h+= deltaHeight;
            let hgt = this.normalize(h)*magicNum;
            let asset = this.add.image(fullWid, hgt, assetName);
            asset.setOrigin(1.0 - 0.5*Math.random(), 1.0);
            asset.scale = bg_scale;
            asset.setScrollFactor(scrollFac);
        }

        scrollFac = 0.5;
        assetNamePrefix = "mid_2l";
        magicNum = 1/3*(1+scrollFac*2);
        for(let h = 0; h < this.physics.world.bounds.bottom; h += 1250){
            let randInt = Math.floor(Math.random()*6)+1; // 1~6
            let deltaHeight = randInt * 150;
            let assetName = assetNamePrefix + (randInt%2+2);
            h+= deltaHeight;
            let hgt = this.normalize(h)*magicNum;
            let asset = this.add.image(0, hgt, assetName);
            asset.setOrigin(0.0 + 0.5*Math.random(), 1.0);
            asset.scale = bg_scale;
            asset.setScrollFactor(scrollFac);
        }

        assetNamePrefix = "mid_2r";
        for(let h = 0; h < this.physics.world.bounds.bottom; h += 1250){
            let randInt = Math.floor(Math.random()*6)+1; // 1~6
            let deltaHeight = randInt * 150;
            let assetName = assetNamePrefix + (randInt%2+2);
            h+= deltaHeight;
            let hgt = this.normalize(h)*magicNum;
            let asset = this.add.image(fullWid, hgt, assetName);
            asset.setOrigin(1.0 - 0.5*Math.random(), 1.0);
            asset.scale = bg_scale;
            asset.setScrollFactor(scrollFac);
        }

        scrollFac = 0.8;
        assetNamePrefix = "fore_2l";
        magicNum = 1/3*(1+scrollFac*2);
        for(let h = 0; h < this.physics.world.bounds.bottom; h += 1050){
            let randInt = Math.floor(Math.random()*6)+1; // 1~6
            let deltaHeight = randInt * 500;
            let assetName = assetNamePrefix + (randInt%3+1);
            h+= deltaHeight;
            let hgt = this.normalize(h)*magicNum;
            let asset = this.add.image(0, hgt, assetName);
            asset.setOrigin(0.0 + 0.5*Math.random(), 1.0);
            asset.scale = bg_scale+Math.random()*0.5;
            asset.setScrollFactor(scrollFac);
        }

        assetNamePrefix = "fore_2r";
        for(let h = -3000; h < this.physics.world.bounds.bottom; h += 1050){
            let randInt = Math.floor(Math.random()*6)+1; // 1~6
            let deltaHeight = randInt * 500;
            let assetName = assetNamePrefix + (randInt%3+1);
            h+= deltaHeight;
            let hgt = this.normalize(h)*magicNum;
            let asset = this.add.image(fullWid, hgt, assetName);
            asset.setOrigin(1.0 - 0.5*Math.random(), 1.0);
            asset.scale = bg_scale+Math.random()*0.5;
            asset.setScrollFactor(scrollFac);
        }

        let overlay = this.add.image(game.config.width*0.5,this.physics.world.bounds.bottom*0.5,"overlay2");
        overlay.setScrollFactor(0);

        //end Background

        //construct GameObjects
        this.platformGroup = this.add.group();
        this.spiderWebGroup = this.add.group();
        this.checkpointGroup = this.add.group();
        this.npcGroup = this.add.group();
        this.itemGroup = this.add.group();


        this.GameObjects = this.constructScene(this.platformGroup, this.spiderWebGroup, this.npcGroup, this.itemGroup);
        //this.platformGroup.refresh();

        //checkpoints
        this.checkpointData = this.cache.json.get("checkpointData");
        this.CurrentCheckpoint = this.checkpointData.CurrentCheckpoint;

        this.npcDialogData = this.cache.json.get('dialogData');

        // add player after level
        this.player = new Player(this, 100, this.normalize(200), "player");
        let checkpointIndex = localStorage.getItem('save_checkpoint') || "1";
        this.player.player.x = this.checkpointData.Checkpoints.lv2[checkpointIndex]["x"];
        this.player.player.y = this.normalize(this.checkpointData.Checkpoints.lv2[checkpointIndex]["y"]);
        this.player.maxJump = 2;
        //end add player

        //add player to world for debugging/level creation: comment out for production builds
        //this.player = new Player(this, 600, this.normalize(9300), "player");

        // add all physics here
        this.playerPlatColl = this.physics.add.collider(this.player.getBody(), this.platformGroup, this.player.SyncSpd);

        let npcs = this.npcGroup.getChildren();
        for(let i = 0; i<npcs.length; i+=1){
            this.physics.add.overlap(npcs[i].npc, this.player.getBody());
            this.physics.add.collider(npcs[i].npc, this.platformGroup);
        }

        let items = this.itemGroup.getChildren();
        for(let i = 0; i<items.length; i+=1){
            this.physics.add.overlap(items[i].item, this.player.getBody());
            this.physics.add.collider(items[i].item, this.platformGroup);

            // for all wing below player position, assume previously collected
            if(items[i].item.y > this.player.player.y){
                this.player.maxJump+=1;
                items[i].item.disableBody(true, true);
            }
        }

        // spider webs
        this.physics.add.overlap(this.player.getBody(), this.spiderWebGroup, this.KillPlayer);
        this.physics.add.overlap(this.player.getBody(), this.eventTrigger, this.TriggerEvent);

        // add ui layer last
        // add ui
        this.jumpUI = new JumpUI(this,game.config.width*0.9,game.config.height*0.1, "jump_ui_gold", "jump_ui_black");


        //set camera to follow player
        this.cameras.main.setBounds(0,0,this.physics.world.bounds.right, this.physics.world.bounds.bottom);
        this.cameras.main.startFollow(this.player.getBody());

        //add checkpoints
        this.check1 = new Checkpoint(this, 200, this.normalize(135), "checkpoint_start", this.checkpointGroup, this.checkpointData, "1");
        this.playerCheckColl = this.physics.add.overlap(this.player.getBody(), this.checkpointGroup, this.TriggerCheckpoint);
        this.physics.add.collider(this.platformGroup, this.checkpointGroup);
        //end add checkpoints

        // levelend
        this.end = new LevelEnd(this, game.config.width*0.5, 0);
        this.physics.add.overlap(this.player.getBody(), this.end.levelEnd, this.AdvanceLevel);

        // level begin
        this.time.delayedCall(1000, ()=>{this.whiteAlphaTar = 0}, []);

        this.music = this.sound.add("bgm2");
        var musicConfig = {
            volume: 0.5,
            loop: true
        }
        this.music.play(musicConfig);

        this.testMode = localStorage.getItem("test_mode") == "1";
    }

    KillPlayer(player, web){
       if(player.dead) return;

       player.scene.playerPlatColl.active = false;
       player.scene.playerCheckColl.active = false;

       player.scene.player.Death(player, web);
       player.scene.time.delayedCall(1000, ()=>{ player.scene.blackAlphaTar = 1}, []);
       player.scene.time.delayedCall(1500, ()=>{
           player.scene.player.Revive(player);
           player.scene.playerPlatColl.active = true;
           player.scene.playerCheckColl.active = true;

           let checkpointIndex = localStorage.getItem('save_checkpoint') || "1";
           player.x = player.scene.checkpointData.Checkpoints.lv2[checkpointIndex]["x"];
           player.y = player.scene.normalize(player.scene.checkpointData.Checkpoints.lv2[checkpointIndex]["y"])
       }, []);
       player.scene.time.delayedCall(2000, ()=>{
           player.scene.blackAlphaTar = 0;
           player.scene.eventState = -1;
           player.scene.eventTrigger.triggered = false;
        }, []);
   }

   TriggerCheckpoint(player, check){
       if(check.checked){
           return;
       }

       let cps = check.scene.checkpointGroup.getChildren();
       for(let i = 0; i<cps.length; i++){
           cps[i].checked = false;
           cps[i].play("cp_inactive");
       }

       check.checked = true;
       check.play("cp_grow");

       check.scene.checkpointData.CurrentCheckpoint = check.index;

       localStorage.setItem('save_level', 2);
       localStorage.setItem('save_checkpoint', check.index);
   }

   TriggerEvent(player, trigger){
        if(trigger.triggered){
            return;
        }
        trigger.triggered = true;
        player.scene.eventM.platform.setVelocityY(200);
        player.scene.eventState = 1;
   }

   AdvanceLevel(player, end){
        if(end.triggered){
            return;
        }
        end.triggered=true;
        player.scene.whiteAlphaTar = 0;
        player.body.setImmovable(true);
        player.body.setAllowGravity(false);
        player.scene.checkpointData.CurrentCheckpoint = 1;
        localStorage.setItem("save_checkpoint", 1);
        player.scene.time.delayedCall(1000, ()=>{
            player.scene.music.stop();
            player.scene.scene.start("load3");
        }, []);
   }

    update(time, delta){
        // update white/black screen overlay
        if(this.whiteAlphaTar == 1){
            this.whiteScreen.alpha += delta/1000;
            if(this.whiteScreen.alpha >= 1){
                this.whiteScreen.alpha = 1;
            }
        }
        if(this.whiteAlphaTar == 0){
            this.whiteScreen.alpha -= delta/1000;
            if(this.whiteScreen.alpha <= 0){
                this.whiteScreen.alpha = 0;
            }
        }
        if(this.blackAlphaTar == 1){
            this.blackScreen.alpha += delta/500;
            if(this.blackScreen.alpha >= 1){
                this.blackScreen.alpha = 1;
            }
        }
        if(this.blackAlphaTar == 0){
            this.blackScreen.alpha -= delta/500;
            if(this.blackScreen.alpha <= 0){
                this.blackScreen.alpha = 0;
            }
        }

        // update player
        this.player.update(time, delta);

        // update npc
        let npcs = this.npcGroup.getChildren();
        for(let i = 0; i<npcs.length; i+=1){
            npcs[i].update(time, delta);
        }

        // update item
        let items = this.itemGroup.getChildren();
        for(let i = 0; i<items.length; i+=1){
            items[i].update(time, delta);
        }

        //update platforms
        for(let i = 0; i < this.GameObjects.length; i+=1){
            this.GameObjects[i].update(time, delta);
        }

        // handle event
        this.HandleEvent(time, delta);

        // update UI
        this.jumpUI.update(time, delta, this.player.remainJump, this.player.maxJump);

        if(this.testMode){
            // checkpoint cheat
            let num_key = this.input.keyboard.addKey("ZERO");
            if(num_key.isDown){
                this.player.player.x = this.checkpointData.Checkpoints.lv2["1"]["x"];
                this.player.player.y = this.normalize(this.checkpointData.Checkpoints.lv2["1"]["y"]);
            }
            num_key = this.input.keyboard.addKey("ONE");
            if(num_key.isDown){
                this.player.player.x = this.checkpointData.Checkpoints.lv2["1"]["x"];
                this.player.player.y = this.normalize(this.checkpointData.Checkpoints.lv2["1"]["y"]);
            }
            num_key = this.input.keyboard.addKey("TWO");
            if(num_key.isDown){
                this.player.player.x = this.checkpointData.Checkpoints.lv2["2"]["x"];
                this.player.player.y = this.normalize(this.checkpointData.Checkpoints.lv2["2"]["y"]);
            }
            num_key = this.input.keyboard.addKey("THREE");
            if(num_key.isDown){
                this.player.player.x = this.checkpointData.Checkpoints.lv2["3"]["x"];
                this.player.player.y = this.normalize(this.checkpointData.Checkpoints.lv2["3"]["y"]);
            }
            num_key = this.input.keyboard.addKey("FOUR");
            if(num_key.isDown){
                this.player.player.x = this.checkpointData.Checkpoints.lv2["4"]["x"];
                this.player.player.y = this.normalize(this.checkpointData.Checkpoints.lv2["4"]["y"]);
            }
            num_key = this.input.keyboard.addKey("FIVE");
            if(num_key.isDown){
                this.player.player.x = this.checkpointData.Checkpoints.lv2["5"]["x"];
                this.player.player.y = this.normalize(this.checkpointData.Checkpoints.lv2["5"]["y"]);
            }
        }
    }

    HandleEvent(time, delta){
        switch (this.eventState){
            case -1:
                this.eventL.platform.y = this.normalize(20000);
                this.eventM.platform.y = this.normalize(20300);
                this.eventR.platform.y = this.normalize(20000);
                this.eventL.platform.body.velocity.y = 0;
                this.eventM.platform.body.velocity.y = 0;
                this.eventR.platform.body.velocity.y = 0;
                this.eventState = 0;
            case 0:
                return;
            case 1:
                if(this.eventM.platform.y > this.eventL.platform.y){
                    this.eventM.platform.y = this.eventL.platform.y;
                    this.eventM.platform.setVelocityY(0);
                }
                this.eventState = 2;
                break;
            case 2:
                this.time.delayedCall(1500, ()=>{this.eventState = 3;}, []);
                break;
            case 3:
                let v = this.eventL.platform.body.velocity.y;
                this.eventL.platform.setVelocityY(v-delta*0.1);
                this.eventM.platform.setVelocityY(v-delta*0.1);
                this.eventR.platform.setVelocityY(v-delta*0.1);
                if(v < -200){
                    this.eventState = 4;
                }
            case 4:
                if(this.normalize(this.eventL.platform.y) > 24500){
                    this.eventL.platform.setVelocityY(0);
                    this.eventM.platform.setVelocityY(0);
                    this.eventR.platform.setVelocityY(0);
                }
                break;
        }
    }

    normalize(y){
        return (y - (this.physics.world.bounds.bottom)) * -1;
    }

    denormalize(y){
        return -y + this.physics.world.bounds.bottom;
    }

    constructScene(platformGroup, webGroup, npcGroup, itemGroup){
        //construct scene 1
        let plats = new Array();

        //very bottom of the level
        plats.push(new Center6(this, 300, this.normalize(0)));
        plats.push(new Center6(this, 600, this.normalize(0)));
        plats.push(new Center6(this, 900, this.normalize(0)));

        //level 2
        plats.push(new Center1(this, 900, this.normalize(200)));
        plats.push(new Center2(this, 600, this.normalize(500)));
        plats.push(new Center1(this, 200, this.normalize(800)));
        plats.push(new Right1(this, 900, this.normalize(1000)));
        plats.push(new Moving6(this, 600, this.normalize(1400), 150, 0, 1125));
        plats.push(new Moving2(this, 1100, this.normalize(1800), 150, 700, 1125));
        plats.push(new MovingV(this, 550, this.normalize(1800), "center1", 100, 400, 1, true));

        plats.push(new Left2(this, 300, this.normalize(2800)));//600
        plats.push(new Right2(this, 900, this.normalize(3100)));

        plats.push(new MovingV(this, 300, this.normalize(3600), "center1", 100, 1000, 100));
        plats.push(new MovingV(this, 800, this.normalize(3600), "center1", 100, 1000, 100));

        new SpiderWeb(this, 300, this.normalize(4000), webGroup, 0.8, 0.8);
        new SpiderWeb(this, 800, this.normalize(4400), webGroup, 0.8, 0.8);
        new SpiderWeb(this, 300, this.normalize(5000), webGroup, 0.8, 0.8);

        plats.push(new Left1(this, 200, this.normalize(5200)));
        new SpiderWeb(this, 900, this.normalize(5200), webGroup,1,1);

        plats.push(new Right1(this, 900, this.normalize(5600)));
        plats.push(new Left1(this, 200, this.normalize(6000)));

        new WingItem(this, 250, this.normalize(6200), "jump_ui_gold", this.itemGroup);
        new Checkpoint(this, 950, this.normalize(7135), "checkpoint_start", this.checkpointGroup, this.checkpointData, "2");

        plats.push(new Right2(this, 900, this.normalize(7000)));
        plats.push(new Crumbling(this, 600, this.normalize(8000)));
        plats.push(new Crumbling(this, 300, this.normalize(9000)));
        plats.push(new Crumbling(this, 900, this.normalize(10000)));
        plats.push(new Left2(this, 100, this.normalize(11000)));
        plats.push(new Right2(this, 1100, this.normalize(11000)));

        new SpiderWeb(this, 420, this.normalize(11620), webGroup, 0.8, 0.8);
        new SpiderWeb(this, 620, this.normalize(11700), webGroup, 1.2, 1.2);
        plats.push(new Crumbling(this, 550, this.normalize(12000)));
        plats.push(new Crumbling(this, 550, this.normalize(13000)));
        plats.push(new Crumbling(this, 550, this.normalize(14000)));
        plats.push(new SpikePlatform(this, 900, this.normalize(14000),"spike1TB", "V", webGroup, 100, 1, 2000));
        plats.push(new SpikePlatform(this, 150, this.normalize(12000),"spike1TB", "V", webGroup, 100, 2000, 1));

        plats.push(new Center6(this, 550, this.normalize(15000)));
        new Checkpoint(this, 550, this.normalize(15135), "checkpoint_start", this.checkpointGroup, this.checkpointData, "3");

        plats.push(new Left1(this, 200, this.normalize(15400)));
        new SpiderWeb(this, 100, this.normalize(15650), webGroup, 0.8, 0.8);
        new SpiderWeb(this, 150, this.normalize(15800), webGroup, 1.2, 1.2);
        new SpiderWeb(this, 120, this.normalize(15950), webGroup, 0.6, 0.6);

        plats.push(new MovingV(this, 550, this.normalize(16200), "center1", 100, 1000, 1));
        new SpiderWeb(this, 550, this.normalize(16600), webGroup);

        plats.push(new Crumbling(this, 200, this.normalize(18000)));
        new SpiderWeb(this, 1000, this.normalize(18300), webGroup, 0.6, 0.6);
        new SpiderWeb(this, 900, this.normalize(18400), webGroup);
        new SpiderWeb(this, 1000, this.normalize(18500), webGroup, 0.8, 0.9);
        new SpiderWeb(this, 300, this.normalize(18550), webGroup);
        new SpiderWeb(this, 100, this.normalize(18600), webGroup);
        new SpiderWeb(this, 150, this.normalize(18800), webGroup, 1.2, 1.2);
        //new SpiderWeb(this, 500, this.normalize(18600), webGroup);
        new SpiderWeb(this, 900, this.normalize(19000), webGroup);
        new SpiderWeb(this, 720, this.normalize(19150), webGroup, 0.6, 0.7);
        new SpiderWeb(this, 1020, this.normalize(19150), webGroup, 0.5, 0.5);

        plats.push(new Right1(this, 1000, this.normalize(19200)));
        new Checkpoint(this, 1000, this.normalize(19325), "checkpoint_start", this.checkpointGroup, this.checkpointData, "4");

        this.eventState = 0;
        this.eventL = new MovingVS(this, 100, this.normalize(20000));
        this.eventM = new MovingVS(this, 600, this.normalize(20300));
        this.eventR = new MovingVS(this, 1100, this.normalize(20000));
        plats.push(this.eventL);
        plats.push(this.eventM);
        plats.push(this.eventR);

        this.eventTrigger = new Trigger(this, 600, this.normalize(20500), 500, 200);

        new SpiderWeb(this, 100, this.normalize(21000), webGroup, 0.8, 0.8);
        new SpiderWeb(this, 250, this.normalize(21200), webGroup, 0.8, 0.8);
        new SpiderWeb(this, 400, this.normalize(21400), webGroup, 0.8, 0.8);
        new SpiderWeb(this, 550, this.normalize(21600), webGroup, 0.8, 0.8);
        new SpiderWeb(this, 700, this.normalize(21800), webGroup, 0.8, 0.8);

        new SpiderWeb(this, 1000, this.normalize(22200), webGroup, 0.9, 0.9);
        new SpiderWeb(this, 850, this.normalize(22400), webGroup, 0.8, 0.8);
        new SpiderWeb(this, 700, this.normalize(22600), webGroup, 0.8, 0.8);
        new SpiderWeb(this, 550, this.normalize(22800), webGroup, 0.8, 0.8);
        new SpiderWeb(this, 400, this.normalize(23000), webGroup, 0.8, 0.8);

        new SpiderWeb(this, 100, this.normalize(23500), webGroup, 0.8, 0.8);
        new SpiderWeb(this, 400, this.normalize(23500), webGroup, 0.8, 0.8);
        new SpiderWeb(this, 700, this.normalize(23500), webGroup, 0.8, 0.8);
        new SpiderWeb(this, 1000, this.normalize(23500), webGroup, 0.8, 0.8);

        new SpiderWeb(this, 250, this.normalize(24000), webGroup, 0.8, 0.8);
        new SpiderWeb(this, 550, this.normalize(24000), webGroup, 0.8, 0.8);
        new SpiderWeb(this, 850, this.normalize(24000), webGroup, 0.8, 0.8);

        plats.push(new Left1(this, 200, this.normalize(25000)));
        new Checkpoint(this, 200, this.normalize(25135), "checkpoint_start", this.checkpointGroup, this.checkpointData, "5");
        plats.push(new Right1(this, 1000, this.normalize(25400)));

        new SpiderWeb(this, 100, this.normalize(25800), webGroup, 1, 1);
        new SpiderWeb(this, 300, this.normalize(25700), webGroup, 1.2, 1.2);
        new SpiderWeb(this, 500, this.normalize(25720), webGroup, 0.8, 0.8);

        plats.push(new Crumbling(this, 200, this.normalize(25800)));
        new SpiderWeb(this, 1000, this.normalize(25600), webGroup, 0.8, 0.8);
        new SpiderWeb(this, 950, this.normalize(25750), webGroup);
        new SpiderWeb(this, 800, this.normalize(26000), webGroup, 0.8, 0.8);

        plats.push(new Crumbling(this, 1000, this.normalize(26200)));

        plats.push(new Moving2(this, 200, this.normalize(26800), 150, 0, 1125));
        plats.push(new Moving2(this, 500, this.normalize(27400), 150, 0, 1125));
        plats.push(new Moving2(this, 800, this.normalize(28000), 150, 0, 1125));

        new SpiderWeb(this, 100, this.normalize(26850), webGroup, 0.8, 0.8);
        new SpiderWeb(this, 100, this.normalize(27450), webGroup, 0.8, 0.8);
        new SpiderWeb(this, 100, this.normalize(28050), webGroup, 0.8, 0.8);

        new SpiderWeb(this, 1000, this.normalize(26850), webGroup, 0.8, 0.8);
        new SpiderWeb(this, 1000, this.normalize(27450), webGroup, 0.8, 0.8);
        new SpiderWeb(this, 1000, this.normalize(28050), webGroup, 0.8, 0.8);
        plats.push(new Center4(this, 1000, this.normalize(29000)));


        new NPC(this, 1000, this.normalize(29250), "npc_moth2", this.npcGroup, this.npcDialogData, 5, true, 0.4);
        new NPC(this, 100, this.normalize(6250), "npc_butterfly3", this.npcGroup, this.npcDialogData, 5, false, 0.5);
        new NPC(this, 1000, this.normalize(5850), "npc_butterfly2", this.npcGroup, this.npcDialogData, 3, true, 0.5);
        new NPC(this, 900, this.normalize(3350), "npc_butterfly3", this.npcGroup, this.npcDialogData, 4, true, 0.5);
        new NPC(this, 100, this.normalize(3050), "npc_butterfly1", this.npcGroup, this.npcDialogData, 1, false, 0.5);
        new NPC(this, 100, this.normalize(1050), "npc_butterfly2", this.npcGroup, this.npcDialogData, 2, false, 0.5);
        new NPC(this, 640, this.normalize(750), "npc_moth3", this.npcGroup, this.npcDialogData, 3, true, 0.4, 0.6);
        new NPC(this, 940, this.normalize(450), "npc_moth2", this.npcGroup, this.npcDialogData, 2, true, 0.4);
        new NPC(this, 1000, this.normalize(250), "npc_moth1", this.npcGroup, this.npcDialogData, 1, true, 1, 0.4);
        //new NPC(this, 700, this.normalize(25650), "npc_moth1", this.npcGroup, this.npcDialogData, 4, true, 1, 0.4);


        //add all platforms from array to group after
        for(let i = 0; i < plats.length; i+= 1){

            switch(plats[i].type){
                case "platform":
                    platformGroup.add(plats[i].getPlatform());
                    break;
                case "item":
                    //checkpointGroup.add(plats[i].getPlatform());
                    break;
                case "death":
                    //webGroup.add(plats[i].getPlatform());
                    break;
            }

        }

        return plats; // return full array of thing, calls update on objects
    }


}
