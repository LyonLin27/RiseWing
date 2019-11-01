class playScene3 extends Phaser.Scene{
    constructor(){
        super("scene3");
        this.name = "scene3";
    }

    create(){
        this.physics.world.setBounds(0, 0, game.config.width, 31700);


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
        let bg = this.add.image(game.config.width*0.5,(this.physics.world.bounds.bottom-20000)/3*1.1,"bg_3_1");
        bg.setOrigin(0.5,1);
        bg.scale = 1;
        bg.setScrollFactor(0.05);
        bg = this.add.image(game.config.width*0.5,(this.physics.world.bounds.bottom-26000)/3*1.1,"bg_3_2");
        bg.setOrigin(0.5,1);
        bg.scale = 1;
        bg.setScrollFactor(0.05);
        bg = this.add.image(game.config.width*0.5,(this.physics.world.bounds.bottom-34000)/3*1.1,"bg_3_3");
        bg.setOrigin(0.5,1);
        bg.scale = 1;
        bg.setScrollFactor(0.05);

        let scrollFac = 0.3;
        let bg_scale = 0.6;
        let assetNamePrefix = "back_3l";
        let fullWid = game.config.width;
        let magicNum = 1/3*(1+scrollFac*2);
        for(let h = 0; h < this.physics.world.bounds.bottom; h += 1700){
            let randInt = Math.floor(Math.random()*6)+1; // 1~6
            let deltaHeight = randInt * 300;
            let assetName = assetNamePrefix + (randInt%2+1);
            h+= deltaHeight;
            let hgt = this.normalize(h)*magicNum;
            let asset = this.add.image(0, hgt, assetName);
            asset.setOrigin(0.0 + 0.5*Math.random(), 1.0);
            asset.scale = bg_scale + Math.random()*0.5;
            asset.setScrollFactor(scrollFac);
        }

        assetNamePrefix = "back_3r";
        for(let h = 0; h < this.physics.world.bounds.bottom; h += 1700){
            let randInt = Math.floor(Math.random()*6)+1; // 1~6
            let deltaHeight = randInt * 300;
            let assetName = assetNamePrefix + (randInt%2+1);
            h+= deltaHeight;
            let hgt = this.normalize(h)*magicNum;
            let asset = this.add.image(fullWid, hgt, assetName);
            asset.setOrigin(1.0 - 0.5*Math.random(), 1.0);
            asset.scale = bg_scale + Math.random()*0.5;
            asset.setScrollFactor(scrollFac);
        }

        scrollFac = 0.5;
        assetNamePrefix = "mid_3l";
        magicNum = 1/3*(1+scrollFac*2);
        for(let h = 0; h < this.physics.world.bounds.bottom; h += 1250){
            let randInt = Math.floor(Math.random()*6)+1; // 1~6
            let deltaHeight = randInt * 100;
            let assetName = assetNamePrefix + (randInt%3+1);
            h+= deltaHeight;
            let hgt = this.normalize(h)*magicNum;
            let asset = this.add.image(0, hgt, assetName);
            asset.setOrigin(0.0 + 0.5*Math.random(), 1.0);
            asset.scale = bg_scale + Math.random();
            asset.setScrollFactor(scrollFac);
        }

        assetNamePrefix = "mid_3r";
        for(let h = 0; h < this.physics.world.bounds.bottom; h += 1250){
            let randInt = Math.floor(Math.random()*6)+1; // 1~6
            let deltaHeight = randInt * 100;
            let assetName = assetNamePrefix + (randInt%3+1);
            h+= deltaHeight;
            let hgt = this.normalize(h)*magicNum;
            let asset = this.add.image(fullWid, hgt, assetName);
            asset.setOrigin(1.0 - 0.5*Math.random(), 1.0);
            asset.scale = bg_scale + Math.random();
            asset.setScrollFactor(scrollFac);
        }

        scrollFac = 1.0;
        assetNamePrefix = "fore_3l";
        magicNum = 1/3*(1+scrollFac*2);
        for(let h = 0; h < this.physics.world.bounds.bottom; h += 1050){
            let randInt = Math.floor(Math.random()*6)+1; // 1~6
            let deltaHeight = randInt * 500;
            let assetName = assetNamePrefix + (randInt%3+1);
            h+= deltaHeight;
            let hgt = this.normalize(h)*magicNum;
            let asset = this.add.image(0, hgt, assetName);
            asset.setOrigin(0.0 + 0.2*Math.random(), 1.0);
            asset.scale = bg_scale+Math.random()*0.7;
            asset.setScrollFactor(scrollFac);
        }

        assetNamePrefix = "fore_3r";
        for(let h = -3000; h < this.physics.world.bounds.bottom; h += 1050){
            let randInt = Math.floor(Math.random()*6)+1; // 1~6
            let deltaHeight = randInt * 500;
            let assetName = assetNamePrefix + (randInt%3+1);
            h+= deltaHeight;
            let hgt = this.normalize(h)*magicNum;
            let asset = this.add.image(fullWid, hgt, assetName);
            asset.setOrigin(1.0 - 0.2*Math.random(), 1.0);
            asset.scale = bg_scale+Math.random()*0.7;
            asset.setScrollFactor(scrollFac);
        }

        let overlay = this.add.image(game.config.width*0.5,this.physics.world.bounds.bottom*0.5,"overlay3");
        overlay.setScrollFactor(0);

        //end Background

        //construct GameObjects
        this.platformGroup = this.add.group();
        this.spiderWebGroup = this.add.group();
        this.checkpointGroup = this.add.group();
        this.npcGroup = this.add.group();
        this.itemGroup = this.add.group();

        this.npcDialogData = this.cache.json.get('dialogData');

        this.GameObjects = this.constructScene(this.platformGroup, this.spiderWebGroup, this.npcGroup, this.itemGroup);
        //this.platformGroup.refresh();
        
        //checkpoints
        this.checkpointData = this.cache.json.get("checkpointData");
        this.CurrentCheckpoint = this.checkpointData.CurrentCheckpoint;
        

        // add player after level
        this.player = new Player(this, 100, this.normalize(200), "player");
        let checkpointIndex = localStorage.getItem('save_checkpoint') || "1";
        let collectedWings = localStorage.getItem('collected_wings');
        this.player.player.x = this.checkpointData.Checkpoints.lv3[checkpointIndex]["x"];
        this.player.player.y = this.normalize(this.checkpointData.Checkpoints.lv3[checkpointIndex]["y"]);
        console.log(collectedWings);
        if(collectedWings == 1){
            this.player.maxJump = 4;
        } else {
            this.player.maxJump = 3;
        }
        //end add player

        //add player to world for debugging/level creation: comment out for production builds
        //this.player = new Player(this, 600, this.normalize(9300), "player");


        // testing

        // test end


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
            if(collectedWings == "1"){
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

        this.music = this.sound.add("bgm3");
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
           player.x = player.scene.checkpointData.Checkpoints.lv3[checkpointIndex]["x"];
           player.y = player.scene.normalize(player.scene.checkpointData.Checkpoints.lv3[checkpointIndex]["y"])
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

       localStorage.setItem('save_level', 3);
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
       // localStorage.setItem("save_checkpoint", 1);
       // localStorage.setItem("save_level", 1);
       // localStorage.setItem("collected_wings", 0);
       if(localStorage.getItem("collected_wings") == "1"){
            player.scene.time.delayedCall(1000, ()=>{
                player.scene.music.stop();
                player.scene.scene.start("ending_bad");
            }, []);
       }else{
            player.scene.time.delayedCall(1000, ()=>{
                player.scene.music.stop();
                player.scene.scene.start("ending_good");
            }, []);
       }
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

        //checkpoint cheat
        if(this.testMode){

            let num_key = this.input.keyboard.addKey("ZERO");
            if(num_key.isDown){
                this.player.player.x = this.checkpointData.Checkpoints.lv3["1"]["x"];
                this.player.player.y = this.normalize(this.checkpointData.Checkpoints.lv3["1"]["y"]);
            }
            num_key = this.input.keyboard.addKey("ONE");
            if(num_key.isDown){
                this.player.player.x = this.checkpointData.Checkpoints.lv3["1"]["x"];
                this.player.player.y = this.normalize(this.checkpointData.Checkpoints.lv3["1"]["y"]);
            }
            num_key = this.input.keyboard.addKey("TWO");
            if(num_key.isDown){
                this.player.player.x = this.checkpointData.Checkpoints.lv3["2"]["x"];
                this.player.player.y = this.normalize(this.checkpointData.Checkpoints.lv3["2"]["y"]);
            }
            num_key = this.input.keyboard.addKey("THREE");
            if(num_key.isDown){
                this.player.player.x = this.checkpointData.Checkpoints.lv3["3"]["x"];
                this.player.player.y = this.normalize(this.checkpointData.Checkpoints.lv3["3"]["y"]);
            }
            num_key = this.input.keyboard.addKey("FOUR");
            if(num_key.isDown){
                this.player.player.x = this.checkpointData.Checkpoints.lv3["4"]["x"];
                this.player.player.y = this.normalize(this.checkpointData.Checkpoints.lv3["4"]["y"]);
            }
            num_key = this.input.keyboard.addKey("FIVE");
            if(num_key.isDown){
                this.player.player.x = 550;
                this.player.player.y = 500;
            }
        }
    }

    HandleEvent(time, delta){
        switch (this.eventState){
            case -1:
                this.eventL.platform.y = this.normalize(12500);
                this.eventM.platform.y = this.normalize(12800);
                this.eventR.platform.y = this.normalize(12500);
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
                if(this.normalize(this.eventL.platform.y) > 19000){
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


        //build level 3
        plats.push(new Center5(this, 900, this.normalize(300)));
        plats.push(new Center1(this, 300, this.normalize(600)));
        plats.push(new Center1(this, 900, this.normalize(600)));
        plats.push(new Center5(this, 550, this.normalize(900)));
        plats.push(new Left1(this, 200, this.normalize(1200)));
        plats.push(new Right1(this, 1000, this.normalize(1200)));
        new WingItem(this, 1050, this.normalize(1375), "jump_ui_gold", this.itemGroup);
        plats.push(new Right2(this, 1000, this.normalize(1600)));

        plats.push(new Moving2(this, 200, this.normalize(2400), 150, 0, 1125));
        plats.push(new SpikePlatform(this, 1, this.normalize(2800), "spike1TB", "H", webGroup, 300, 1, 1124));
        plats.push(new Moving2(this, 500, this.normalize(3200), 200, 0, 1125));
        plats.push(new SpikePlatform(this, 550, this.normalize(3600), "spike1TB", "H", webGroup, 100, 550, 575));
        plats.push(new Moving2(this, 200, this.normalize(4000), 150, 0, 1125));
        plats.push(new SpikePlatform(this, 1, this.normalize(4400), "spike1TB", "H", webGroup, 200, 1, 1124));
        plats.push(new Moving2(this, 500, this.normalize(4800), 100, 0, 1125));
        plats.push(new SpikePlatform(this, 300, this.normalize(5200), "spike1TB", "H", webGroup, 150, 300, 825));
        plats.push(new Moving2(this, 800, this.normalize(5600), 200, 0, 1125));
        plats.push(new SpikePlatform(this, 1, this.normalize(6000), "spike1TB", "H", webGroup, 300, 1, 1024));
        plats.push(new Moving2(this, 800, this.normalize(6400), 150, 0, 1125));
        plats.push(new SpikePlatform(this, 1, this.normalize(6900), "spike1TB", "H", webGroup, 200, 1, 1024));
        plats.push(new Right1(this, 1000, this.normalize(7400)));
        new Checkpoint(this, 1000, this.normalize(7525), "checkpoint_start", this.checkpointGroup, this.checkpointData, "2");

        //part 2 level 3
        plats.push(new MovingV(this, 550, this.normalize(8000), "center1", 100, 800, 1, true));
        new SpiderWeb(this, 550, this.normalize(8400), webGroup, 0.8, 0.8);
        plats.push(new Crumbling(this, 550, this.normalize(8800)));
        plats.push(new Moving1(this, 550, this.normalize(9800), 150, 0, 1125));
        plats.push(new SpikePlatform(this, 100, this.normalize(10799), "spike2B", "V", webGroup, 200, 1, 799));
        plats.push(new SpikePlatform(this, 575, this.normalize(10001), "spike2B", "V", webGroup, 200, 799, 1));
        plats.push(new SpikePlatform(this, 1050, this.normalize(10799), "spike2B", "V", webGroup, 200, 1, 799));

        plats.push(new SpikePlatform(this, 1, this.normalize(11200), "spike1LR", "H", webGroup, 200, 1, 1024));
        plats.push(new SpikePlatform(this, 1024, this.normalize(11200), "spike1LR", "H", webGroup, 200, 1024, 1));
        plats.push(new Left1(this, 200, this.normalize(11800)));
        new Checkpoint(this, 200, this.normalize(11925), "checkpoint_start", this.checkpointGroup, this.checkpointData, "3");

        //part 3 level 3

        //moving platform event
        this.eventState = 0;
        this.eventL = new MovingVS(this, 100, this.normalize(12500));
        this.eventM = new MovingVS(this, 600, this.normalize(12800));
        this.eventR = new MovingVS(this, 1100, this.normalize(12500));
        plats.push(this.eventL);
        plats.push(this.eventM);
        plats.push(this.eventR);

        this.eventTrigger = new Trigger(this, 600, this.normalize(13000), 500, 200);
        //end moving platform event

        plats.push(new SpikePlatform(this, 1, this.normalize(14000), "spike1LR", "H", webGroup, 150, 1, 1024));
        plats.push(new SpikePlatform(this, 1024, this.normalize(14000), "spike1LR", "H", webGroup, 150, 1024, 1));

        plats.push(new SpikePlatform(this, 300, this.normalize(15000), "spike1TB", "V", webGroup, 300, 500, 500));
        plats.push(new SpikePlatform(this, 825, this.normalize(15000), "spike1TB", "V", webGroup, 300, 500, 500));

        plats.push(new SpikePlatform(this, 50, this.normalize(15000), "spike1TB", "V", webGroup, 400, 1000, 1000));
        plats.push(new SpikePlatform(this, 1075, this.normalize(15000), "spike1TB", "V", webGroup, 400, 1000, 1000));

        new SpiderWeb(this, 550, this.normalize(15200), webGroup, 0.8, 0.8);
        new SpiderWeb(this, 800, this.normalize(15600), webGroup, 0.8, 0.8);
        new SpiderWeb(this, 200, this.normalize(16000), webGroup, 0.8, 0.8);

        new SpiderWeb(this, 200, this.normalize(15200), webGroup, 0.8, 0.8);
        new SpiderWeb(this, 1000, this.normalize(15600), webGroup, 0.8, 0.8);
        new SpiderWeb(this, 600, this.normalize(16000), webGroup, 0.8, 0.8);

        plats.push(new SpikePlatform(this, 250, this.normalize(17000), "spike1TB", "V", webGroup, 300, 500, 500));
        plats.push(new SpikePlatform(this, 550, this.normalize(17000), "spike1TB", "V", webGroup, 300, 500, 500));
        plats.push(new SpikePlatform(this, 850, this.normalize(17000), "spike1TB", "V", webGroup, 300, 500, 500));

        plats.push(new SpikePlatform(this, 1, this.normalize(17500), "spike1LR", "H", webGroup, 150, 1, 1024));
        plats.push(new SpikePlatform(this, 1024, this.normalize(17500), "spike1LR", "H", webGroup, 150, 1024, 1));

        plats.push(new SpikePlatform(this, 550, this.normalize(18000), "spike1LR", "H", webGroup, 150, 550, 550));
        plats.push(new SpikePlatform(this, 550, this.normalize(18000), "spike1LR", "H", webGroup, 250, 550, 550));
        plats.push(new SpikePlatform(this, 550, this.normalize(18250), "spike1TB", "V", webGroup, 300, 500, 250));

        new SpiderWeb(this, 200, this.normalize(18500), webGroup, 0.8, 0.8);
        new SpiderWeb(this, 1000, this.normalize(18500), webGroup, 0.8, 0.8);
        new SpiderWeb(this, 600, this.normalize(18500), webGroup, 0.8, 0.8);
        new SpiderWeb(this, 100, this.normalize(18800), webGroup, 0.8, 0.8);
        new SpiderWeb(this, 800, this.normalize(18800), webGroup, 0.8, 0.8);

        plats.push(new Left2(this, 100, this.normalize(19500)));
        new Checkpoint(this, 100, this.normalize(19625), "checkpoint_start", this.checkpointGroup, this.checkpointData, "4");

        plats.push(new Crumbling(this, 900, this.normalize(20000)));
        plats.push(new Crumbling(this, 550, this.normalize(20500)));
        plats.push(new Crumbling(this, 200, this.normalize(21000)));
        plats.push(new Crumbling(this, 550, this.normalize(21500)));

        plats.push(new SpikePlatform(this, 1, this.normalize(20150), "spike1LR", "H", webGroup, 150, 1, 1024));
        plats.push(new SpikePlatform(this, 1024, this.normalize(20650), "spike1LR", "H", webGroup, 150, 1024, 1));

        plats.push(new SpikePlatform(this, 250, this.normalize(21000), "spike1TB", "V", webGroup, 300, 1, 600));
        plats.push(new SpikePlatform(this, 550, this.normalize(20000), "spike1TB", "V", webGroup, 300, 600, 1));
        plats.push(new SpikePlatform(this, 850, this.normalize(20500), "spike1TB", "V", webGroup, 300, 300, 300));

        plats.push(new SpikePlatform(this, 1024, this.normalize(21650), "spike1LR", "H", webGroup, 200, 1024, 1));

        plats.push(new Right1(this, 1000, this.normalize(22500)));
        plats.push(new Left1(this, 100, this.normalize(22900)));
        plats.push(new Right1(this, 1000, this.normalize(23300)));

        plats.push(new Moving5(this, 200, this.normalize(24000), 150, 0, 1125));
        plats.push(new Moving5(this, 600, this.normalize(25000), 150, 0, 1125));
        plats.push(new Moving5(this, 200, this.normalize(26000), 150, 0, 1125));

        plats.push(new Moving6(this, 100, this.normalize(27000), 200, 0, 1125));
        plats.push(new Moving6(this, 1025, this.normalize(28000), 200, 0, 1125));

        new SpiderWeb(this, 600, this.normalize(24150), webGroup, 0.8, 0.8);
        new SpiderWeb(this, 300, this.normalize(25150), webGroup, 0.8, 0.8);
        new SpiderWeb(this, 800, this.normalize(26150), webGroup, 0.8, 0.8);

        new SpiderWeb(this, 600, this.normalize(27150), webGroup, 0.8, 0.8);
        new SpiderWeb(this, 300, this.normalize(28150), webGroup, 0.8, 0.8);
        new SpiderWeb(this, 800, this.normalize(29150), webGroup, 0.8, 0.8);

        plats.push(new Right2(this, 1000, this.normalize(29000)));
        plats.push(new Left1(this, 100, this.normalize(29400)));
        plats.push(new Right1(this, 1000, this.normalize(29800)));

        plats.push(new Center6(this, 550, this.normalize(30500)));

        new NPC(this, 900, this.normalize(1836), "npc_butterfly3", this.npcGroup, this.npcDialogData, 4, true, 0.5);
        new NPC(this, 760, this.normalize(1435), "npc_moth2", this.npcGroup, this.npcDialogData, 2, true, 0.4);
        new NPC(this, 100, this.normalize(1416), "npc_butterfly1", this.npcGroup, this.npcDialogData, 1, false, 0.5);
        new NPC(this, 200, this.normalize(1050), "npc_butterfly2", this.npcGroup, this.npcDialogData, 2, false, 0.5);
        new NPC(this, 1100, this.normalize(750), "npc_moth3", this.npcGroup, this.npcDialogData, 3, true, 0.4, 0.6);
        new NPC(this, 1000, this.normalize(250), "npc_moth1", this.npcGroup, this.npcDialogData, 1, true, 1, 0.4);


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
