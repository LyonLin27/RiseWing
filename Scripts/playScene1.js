"use strict";

class playScene1 extends Phaser.Scene{
    constructor(){
        super("scene1");
        this.name = "scene1";
    }

    create(){
        this.physics.world.setBounds(0, 0, game.config.width, game.config.height * 7.04);

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

        // background
        let bg = this.add.image(game.config.width*0.5,this.physics.world.bounds.bottom/3*1.4,"bg_1_1");
        bg.setOrigin(0.5,1);
        bg.scale = 1;
        bg.setScrollFactor(0.2);
        bg = this.add.image(game.config.width*0.5,(this.physics.world.bounds.bottom-6000)/3*1.4,"bg_1_2");
        bg.setOrigin(0.5,1);
        bg.scale = 1;
        bg.setScrollFactor(0.2);
        bg = this.add.image(game.config.width*0.5,(this.physics.world.bounds.bottom-12000)/3*1.4,"bg_1_3");
        bg.setOrigin(0.5,1);
        bg.scale = 1;
        bg.setScrollFactor(0.2);

        let scrollFac = 0.3;
        let bg_scale = 0.75;
        let assetNamePrefix = "back_1l";
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

        assetNamePrefix = "back_1r";
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
        assetNamePrefix = "mid_1l";
        magicNum = 1/3*(1+scrollFac*2);
        for(let h = 0; h < this.physics.world.bounds.bottom; h += 750){
            let randInt = Math.floor(Math.random()*6)+1; // 1~6
            let deltaHeight = randInt * 100;
            let assetName = assetNamePrefix + (randInt%3+1);
            h+= deltaHeight;
            let hgt = this.normalize(h)*magicNum;
            let asset = this.add.image(0, hgt, assetName);
            asset.setOrigin(0.0 + 0.5*Math.random(), 1.0);
            asset.scale = bg_scale;
            asset.setScrollFactor(scrollFac);
        }

        assetNamePrefix = "mid_1r";
        for(let h = 0; h < this.physics.world.bounds.bottom; h += 750){
            let randInt = Math.floor(Math.random()*6)+1; // 1~6
            let deltaHeight = randInt * 100;
            let assetName = assetNamePrefix + (randInt%3+1);
            h+= deltaHeight;
            let hgt = this.normalize(h)*magicNum;
            let asset = this.add.image(fullWid, hgt, assetName);
            asset.setOrigin(1.0 - 0.5*Math.random(), 1.0);
            asset.scale = bg_scale;
            asset.setScrollFactor(scrollFac);
        }

        scrollFac = 0.8;
        assetNamePrefix = "fore_1l";
        magicNum = 1/3*(1+scrollFac*2);
        for(let h = 0; h < this.physics.world.bounds.bottom; h += 1050){
            let randInt = Math.floor(Math.random()*6)+1; // 1~6
            let deltaHeight = randInt * 500;
            let assetName = assetNamePrefix + (randInt%3+1);
            h+= deltaHeight;
            let hgt = this.normalize(h)*magicNum;
            let asset = this.add.image(0, hgt, assetName);
            asset.setOrigin(0.0 + 0.5*Math.random(), 1.0);
            asset.scale = bg_scale+Math.random();
            asset.setScrollFactor(scrollFac);
        }

        assetNamePrefix = "fore_1r";
        for(let h = -3000; h < this.physics.world.bounds.bottom; h += 1050){
            let randInt = Math.floor(Math.random()*6)+1; // 1~6
            let deltaHeight = randInt * 500;
            let assetName = assetNamePrefix + (randInt%3+1);
            h+= deltaHeight;
            let hgt = this.normalize(h)*magicNum;
            let asset = this.add.image(fullWid, hgt, assetName);
            asset.setOrigin(1.0 - 0.5*Math.random(), 1.0);
            asset.scale = bg_scale+Math.random();
            asset.setScrollFactor(scrollFac);
        }

        let overlay = this.add.image(game.config.width*0.5,this.physics.world.bounds.bottom*0.5,"overlay1");
        overlay.setScrollFactor(0);


        // add platforms

        //create static group
        this.platformGroup = this.add.group();
        this.spiderWebGroup = this.add.group();
        this.GameObjects = this.constructScene(this.platformGroup, this.spiderWebGroup);
        //this.platformGroup.refresh();

        //checkpoints
        this.checkpointData = this.cache.json.get("checkpointData");
        this.curentCheckpoint = this.checkpointData.CurrentCheckpoint;

        this.npcDialogData = this.cache.json.get('dialogData');
        // add npcs before player
        this.npcGroup = this.add.group();
        let faceLeft = true;
        new NPC(this, 950, this.normalize(2360), "npc_moth3",  this.npcGroup, this.npcDialogData, 3, faceLeft, 0.4, 0.6);
        new NPC(this, 85, this.normalize(2040), "npc_butterfly2",  this.npcGroup, this.npcDialogData, 2, !faceLeft, 0.5);
        this.npc2 = new NPC(this, 150, this.normalize(1000), "npc_moth1", this.npcGroup, this.npcDialogData, 2, !faceLeft, 1, 0.4);
        this.npc1 = new NPC(this, 820, this.normalize(600), "npc_butterfly1", this.npcGroup, this.npcDialogData, 1, faceLeft, 0.5);
        new NPC(this, 950, this.normalize(200), "npc_moth2",  this.npcGroup, this.npcDialogData, 2, faceLeft, 0.4);


        // add items
        this.itemGroup = this.add.group();
        new WingItem(this, 900, this.normalize(3600), "jump_ui_gold", this.itemGroup);

        // add player after level
        this.player = new Player(this, 100, this.normalize(200), "player");
        let checkpointIndex = localStorage.getItem('save_checkpoint') || "1";
        this.player.player.x = this.checkpointData.Checkpoints.lv1[checkpointIndex]["x"];
        this.player.player.y = this.normalize(this.checkpointData.Checkpoints.lv1[checkpointIndex]["y"]);

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


        // add ui layer last
        // add ui
        this.jumpUI = new JumpUI(this,game.config.width*0.9,game.config.height*0.1, "jump_ui_gold", "jump_ui_black");


        //set camera to follow player
        this.cameras.main.setBounds(0,0,this.physics.world.bounds.right, this.physics.world.bounds.bottom);
        this.cameras.main.startFollow(this.player.getBody());

        // spider webs
        this.physics.add.overlap(this.player.getBody(), this.spiderWebGroup, this.KillPlayer);

        // checkpoints
        this.checkpointGroup = this.add.group();
        this.check1 = new Checkpoint(this, 200, this.normalize(135), "checkpoint_start", this.checkpointGroup, this.checkpointData, "1");
        this.check2 = new Checkpoint(this, 200, this.normalize(3730), "checkpoint_start", this.checkpointGroup, this.checkpointData, "2");
        this.check3 = new Checkpoint(this, 200, this.normalize(6330), "checkpoint_start", this.checkpointGroup, this.checkpointData, "3");
        this.check4 = new Checkpoint(this, 200, this.normalize(9930), "checkpoint_start", this.checkpointGroup, this.checkpointData, "4");
        this.playerCheckColl = this.physics.add.overlap(this.player.getBody(), this.checkpointGroup, this.TriggerCheckpoint);
        this.physics.add.collider(this.platformGroup, this.checkpointGroup);

        // levelend
        this.end = new LevelEnd(this, game.config.width*0.5, 0);
        this.physics.add.overlap(this.player.getBody(), this.end.levelEnd, this.AdvanceLevel);

        this.time.delayedCall(1000, ()=>{this.whiteAlphaTar = 0}, []);

        this.music = this.sound.add("bgm1");
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
            player.x = player.scene.checkpointData.Checkpoints.lv1[checkpointIndex]["x"];
            player.y = player.scene.normalize(player.scene.checkpointData.Checkpoints.lv1[checkpointIndex]["y"])
        }, []);
        player.scene.time.delayedCall(2000, ()=>{ player.scene.blackAlphaTar = 0}, []);
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

        localStorage.setItem('save_level',1);
        localStorage.setItem('save_checkpoint', check.index);
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
            player.scene.scene.start("load2");
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

        // update UI
        this.jumpUI.update(time, delta, this.player.remainJump, this.player.maxJump);

        if(this.testMode){
            // checkpoint cheat
            let num_key = this.input.keyboard.addKey("ZERO");
            if(num_key.isDown){
                this.player.player.x = this.checkpointData.Checkpoints.lv1["1"]["x"];
                this.player.player.y = this.normalize(this.checkpointData.Checkpoints.lv1["1"]["y"]);
            }
            num_key = this.input.keyboard.addKey("ONE");
            if(num_key.isDown){
                this.player.player.x = this.checkpointData.Checkpoints.lv1["1"]["x"];
                this.player.player.y = this.normalize(this.checkpointData.Checkpoints.lv1["1"]["y"]);
            }
            num_key = this.input.keyboard.addKey("TWO");
            if(num_key.isDown){
                this.player.player.x = this.checkpointData.Checkpoints.lv1["2"]["x"];
                this.player.player.y = this.normalize(this.checkpointData.Checkpoints.lv1["2"]["y"]);
            }
            num_key = this.input.keyboard.addKey("THREE");
            if(num_key.isDown){
                this.player.player.x = this.checkpointData.Checkpoints.lv1["3"]["x"];
                this.player.player.y = this.normalize(this.checkpointData.Checkpoints.lv1["3"]["y"]);
            }
            num_key = this.input.keyboard.addKey("FOUR");
            if(num_key.isDown){
                this.player.player.x = this.checkpointData.Checkpoints.lv1["4"]["x"];
                this.player.player.y = this.normalize(this.checkpointData.Checkpoints.lv1["4"]["y"]);
            }
            num_key = this.input.keyboard.addKey("FIVE");
            if(num_key.isDown){
                this.player.player.x = 100;
                this.player.player.y = this.normalize(12495);
            }
            num_key = this.input.keyboard.addKey("SIX");
            if(num_key.isDown){
                this.player.player.x = 100;
                this.player.player.y = this.normalize(14092);
            }
        }
    }

    normalize(y){
        return (y - (this.physics.world.bounds.bottom)) * -1;
    }

    denormalize(y){
        return -y + this.physics.world.bounds.bottom;
    }

    constructScene(platformGroup, webGroup, checkpointGroup){
        //construct scene 1
        let plats = new Array();

        //very bottom of the level
        plats.push(new Center6(this, 300, this.normalize(0)));
        plats.push(new Center6(this, 600, this.normalize(0)));
        plats.push(new Center6(this, 900, this.normalize(0)));

        plats.push(new Right1(this, 900, this.normalize(300)));

        plats.push(new Left1(this, 300, this.normalize(600)));

        plats.push(new Center2(this, 600, this.normalize(1000)));
        plats.push(new Center2(this, 800, this.normalize(1200)));
        plats.push(new Center2(this, 1000, this.normalize(1400)));

        plats.push(new Left2(this, 300, this.normalize(1800)));

        plats.push(new Center4(this, 900, this.normalize(2200)));

        plats.push(new Center5(this, 200, this.normalize(2400)));

        plats.push(new Center1(this, 900, this.normalize(2700)));
        plats.push(new Center1(this, 400, this.normalize(3000)));

        //soft checkPoint
        plats.push(new Right1(this, 900, this.normalize(3400)));
        plats.push(new Left1(this, 300, this.normalize(3600)));
        plats.push(new Right1(this, 900, this.normalize(3800)));

        plats.push(new Left1(this, 300, this.normalize(4400)));

        plats.push(new Center3(this, 600, this.normalize(4800)));
        plats.push(new Center3(this, 600, this.normalize(5200)));
        plats.push(new Center3(this, 600, this.normalize(5600)));

        //soft checkPoint
        plats.push(new Right1(this, 900, this.normalize(6000)));
        plats.push(new Left1(this, 300, this.normalize(6200)));
        plats.push(new Right1(this, 900, this.normalize(6400)));

        plats.push(new Moving6(this, 900, this.normalize(6800), 150, 0, 1125));
        plats.push(new Moving6(this, 300, this.normalize(7200), 150, 0, 1125));

        plats.push(new Center1(this, 600, this.normalize(7900)));

        plats.push(new Moving2(this, 600, this.normalize(8300), 100, 0, 1125));
        plats.push(new Moving6(this, 600, this.normalize(8700), 150, 0, 1125));
        plats.push(new Moving2(this, 600, this.normalize(9100), 100, 0, 1125));

        //soft checkPoint
        plats.push(new Right1(this, 900, this.normalize(9500)));
        plats.push(new Left1(this, 300, this.normalize(9800)));
        plats.push(new Right1(this, 900, this.normalize(10100)));

        new SpiderWeb(this, 200, this.normalize(10500), webGroup);
        new SpiderWeb(this, 50, this.normalize(10400), webGroup, 0.8, 0.8);
        plats.push(new Left2(this, 0, this.normalize(10600)));
        new SpiderWeb(this, 700, this.normalize(10700), webGroup, 0.8, 0.8);
        new SpiderWeb(this, 750, this.normalize(10800), webGroup);
        new SpiderWeb(this, 1000, this.normalize(10700), webGroup, 1.2, 1.2);
        plats.push(new Right2(this, 900, this.normalize(10900)));
        plats.push(new Moving6(this, 600, this.normalize(11300), 150, 0, 1125));
        new SpiderWeb(this, 50, this.normalize(11600), webGroup, 0.8, 0.8);
        new SpiderWeb(this, 200, this.normalize(11700), webGroup);
        new SpiderWeb(this, 700, this.normalize(11800), webGroup);
        new SpiderWeb(this, 1000, this.normalize(11900), webGroup, 1.2, 1.2);
        new SpiderWeb(this, 750, this.normalize(12000), webGroup);
        plats.push(new Right1(this, 900, this.normalize(12050)));
        plats.push(new Left2(this, 100, this.normalize(12400)));
        plats.push(new Moving6(this, 600, this.normalize(12750), 100, 0, 1125));
        new SpiderWeb(this, 750, this.normalize(12900), webGroup);
        plats.push(new Moving2(this, 600, this.normalize(13150), 120, 0, 1125));
        new SpiderWeb(this, 250, this.normalize(13300), webGroup);
        plats.push(new Left2(this, 300, this.normalize(14000)));
        new SpiderWeb(this, 50, this.normalize(14300), webGroup, 0.8, 0.8);
        new SpiderWeb(this, 250, this.normalize(14400), webGroup, 1.2, 1.2);
        new SpiderWeb(this, 300, this.normalize(14600), webGroup, 0.8, 0.8);
        new SpiderWeb(this, 1000, this.normalize(14400), webGroup, 1.2, 1.2);
        new SpiderWeb(this, 500, this.normalize(14600), webGroup, 1.1, 1.1);
        new SpiderWeb(this, 1050, this.normalize(14600), webGroup, 0.8, 0.8);
        new SpiderWeb(this, 950, this.normalize(14800), webGroup, 1.2, 1.2);
        plats.push(new Left2(this, 300, this.normalize(14700)));
        plats.push(new Right1(this, 900, this.normalize(15100)));
        plats.push(new Left1(this, 100, this.normalize(15600)));
        plats.push(new Right2(this, 1200, this.normalize(16100)));

        //add all platforms from array to group after
        for(let i = 0; i < plats.length; i+= 1){

            switch(plats[i].type){
                case "platform":
                    platformGroup.add(plats[i].getPlatform());
                    break;
                case "checkpoint":
                    //checkpointGroup.add(plats[i].getPlatform());
                    break;
                case "death":
                    //webGroup.add(plats[i].getPlatform());
                    break;
            }

        }

        return plats; // return full array of thing, calls update on objects
    }

    //only need to normalize the y coord
    //will make game relative to bottom left instead of top left
}
