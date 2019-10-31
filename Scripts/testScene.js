"use strict";

class testScene extends Phaser.Scene{
    constructor(){
        super("test");
    }

    preload(){
        this.loadPlayerAnim();
        this.load.image("center1", "Assets/Branch Platforms/Branch_Center_1.png");
        this.load.image("center2", "Assets/Branch Platforms/Branch_Center_2.png");
        this.load.image("center3", "Assets/Branch Platforms/Branch_Center_3.png");
        this.load.image("center4", "Assets/Branch Platforms/Branch_Center_4.png");
        this.load.image("center5", "Assets/Branch Platforms/Branch_Center_5.png");
        this.load.image("center6", "Assets/Branch Platforms/Branch_Center_6.png");
        this.load.image("bg_1_1", "Assets/Level 1/Sky/sky 1.1.png");
        this.load.image("star", "Assets/star.png");
        this.load.image("left1", "Assets/Branch Platforms/Branch_L_1.png");
        this.load.image("left2", "Assets/Branch Platforms/Branch_L_2.png");
        this.load.image("right1", "Assets/Branch Platforms/Branch_R_1.png");
        this.load.image("right2", "Assets/Branch Platforms/Branch_R_2.png");

        // this.load.spritesheet("crumbling_break", "Assets/Branch Platforms/Crumbling Branch/Crumbling_Break_Sprite_Sheet.png",{
        //     frameWidth: 1024,
        //     frameHeight: 589
        // });
        // this.load.spritesheet("crumbling_respawn", "Assets/Branch Platforms/Crumbling Branch/Crumbling_Respawn_Sprite_Sheet.png",{
        //     frameWidth: 1024,
        //     frameHeight: 589
        // });
        // this.load.spritesheet("crumbling_shake", "Assets/Branch Platforms/Crumbling Branch/Crumbling_Shaking_Loop_Sprite_Sheet.png",{
        //     frameWidth: 1024,
        //     frameHeight: 589
        // });

        this.load.image("crumbling_platform", "Assets/Branch Platforms/Crumbling Branch/crumbling_Platform.png");
        // //load spiderweb
        this.load.image("spiderWeb", "Assets/UI Assets/Spiderweb UI.png");

        this.load.image("spike1TB", "Assets/Branch Platforms/Spiked Platforms/Branch_Spike_2_Horizontal_Both.png");
        this.load.image("spike1B", "Assets/Branch Platforms/Spiked Platforms/Branch_Spike_2_Horizontal_Bottom.png");
        this.load.image("spike1T", "Assets/Branch Platforms/Spiked Platforms/Branch_Spike_2_Horizontal_Up.png");
        this.load.image("spike1LR", "Assets/Branch Platforms/Spiked Platforms/Branch_Spike_2_Vertical_Both.png");
        this.load.image("spike1L", "Assets/Branch Platforms/Spiked Platforms/Branch_Spike_2_Vertical_L.png");
        this.load.image("spike1R", "Assets/Branch Platforms/Spiked Platforms/Branch_Spike_2_Vertical_R.png");

        this.load.image("spike2TB", "Assets/Branch Platforms/Spiked Platforms/Branch_Spike_Horizontal_Both.png");
        this.load.image("spike2B", "Assets/Branch Platforms/Spiked Platforms/Branch_Spike_Horizontal_Down.png");
        this.load.image("spike2T", "Assets/Branch Platforms/Spiked Platforms/Branch_Spike_Horizontal_Up.png");
        this.load.image("spike2LR", "Assets/Branch Platforms/Spiked Platforms/Branch_Spike_Vertical_Both.png");
        this.load.image("spike2L", "Assets/Branch Platforms/Spiked Platforms/Branch_Spike_Vertical_L.png");
        this.load.image("spike2R", "Assets/Branch Platforms/Spiked Platforms/Branch_Spike_Vertical_R.png");
    }

    create(){
        this.blackBG = this.add.image(game.config.width*0.5,game.config.height*3, "bg_1_1");
        this.blackBG.scale  = 1;
        this.blackBG.alpha = 1;

        this.physics.world.setBounds(0, 0, game.config.width, game.config.height*3);
        // add player after level
        this.player = new Player(this, 0, this.normalize(200), "player");
        this.player.maxJump = 6;
        //set camera to follow player
        this.cameras.main.setBounds(0,0,this.physics.world.bounds.right, this.physics.world.bounds.bottom);
        this.cameras.main.startFollow(this.player.getBody());

        this.webGroup = this.add.group();
        let webGroup = this.webGroup;
        this.platformGroup = this.add.group();
        let plats = new Array();
        //very bottom of the level
        plats.push(new Center6(this, 300, this.normalize(0)));
        plats.push(new Center6(this, 600, this.normalize(0)));
        plats.push(new Center6(this, 900, this.normalize(0)));

        // plats.push(new SpikeVertical(this, 300, this.normalize(500), "spike1TB", "V"));
        // plats.push(new SpikeVertical(this, 600, this.normalize(1000), "spike1B", "H"));
        // plats.push(new SpikeVertical(this, 900, this.normalize(500), "spike1T", "V"));
        //
        // plats.push(new SpikeVertical(this, 300, this.normalize(1700), "spike2TB", "V"));
        // plats.push(new SpikeVertical(this, 600, this.normalize(1200), "spike2B", "H", undefined, 400, 400));
        // plats.push(new SpikeVertical(this, 900, this.normalize(1900), "spike2T", "V"));

        new SpiderWeb(this, 400, this.normalize(500), webGroup, 0.8, 0.8);
        new SpiderWeb(this, 600, this.normalize(500), webGroup, 0.8, 0.8);

        //end build test level

        for(let i = 0; i < plats.length; i+= 1){
            this.platformGroup.add(plats[i].getPlatform());
        }

        this.platformObjects = plats;
        this.playerPlatColl = this.physics.add.collider(this.player.getBody(), this.platformGroup, this.player.SyncSpd);
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
            player.x = player.scene.checkpointData.Checkpoints[checkpointIndex]["x"];
            player.y = player.scene.checkpointData.Checkpoints[checkpointIndex]["y"]
        }, []);
        player.scene.time.delayedCall(2000, ()=>{ player.scene.blackAlphaTar = 0}, []);
    }

    update(time, delta){
        // update player
        this.player.update(time, delta);

        for(let i = 0; i < this.platformObjects.length; i+=1){
            this.platformObjects[i].update(time, delta);
        }

    }

    normalize(y){
        return (y - (this.physics.world.bounds.bottom)) * -1;
    }

    denormalize(y){
        return -y + this.physics.world.bounds.bottom;
    }

    loadPlayerAnim(){
        this.load.spritesheet("player_idle_0", "Assets/Animations/Player Character/No Wing/Idle Sprite Sheet.png",{
            frameWidth: 1024,
            frameHeight: 1024
        });
        this.load.spritesheet("player_idle_1", "Assets/Animations/Player Character/One Wing/Idle Wing Sprite Sheet.png",{
            frameWidth: 1024,
            frameHeight: 1024
        });
        this.load.spritesheet("player_chargeStart_1", "Assets/Animations/Player Character/One Wing/Charge Wing Sprite Sheet.png",{
            frameWidth: 1024,
            frameHeight: 1024
        });
        this.load.spritesheet("player_chargeLoop_1", "Assets/Animations/Player Character/One Wing/Charge Loop Wing Sprite Sheet.png",{
            frameWidth: 1024,
            frameHeight: 1024
        });
        this.load.spritesheet("player_airCharge_1", "Assets/Animations/Player Character/One Wing/Jump Charge Wing Sprite Sheet.png",{
            frameWidth: 1024,
            frameHeight: 1024
        });
        this.load.spritesheet("player_jumpStart_1", "Assets/Animations/Player Character/One Wing/Jump Wing Sprite Sheet.png",{
            frameWidth: 1024,
            frameHeight: 1024
        });
        this.load.spritesheet("player_jumpLoop_1", "Assets/Animations/Player Character/One Wing/Mid-Jump Wing Sprite Sheet.png",{
            frameWidth: 1024,
            frameHeight: 1024
        });
        this.load.spritesheet("player_airChargeLoop_1", "Assets/Animations/Player Character/One Wing/Jump Charge Loop Wing Sprite Sheet.png",{
            frameWidth: 1024,
            frameHeight: 1024
        });
        this.load.spritesheet("player_fallStart_1", "Assets/Animations/Player Character/One Wing/Fall Wing Sprite Sheet.png",{
            frameWidth: 1024,
            frameHeight: 1024
        });
        this.load.spritesheet("player_fallLoop_1", "Assets/Animations/Player Character/One Wing/Falling Loop Wing Sprite Sheet.png",{
            frameWidth: 1024,
            frameHeight: 1024
        });
        this.load.spritesheet("player_death_1", "Assets/Animations/Player Character/One Wing/Death Sprite Sheet.png",{
            frameWidth: 1024,
            frameHeight: 1024
        });

        // wing 2
        this.load.spritesheet("player_idle_2", "Assets/Animations/Player Character/One Wing/Idle Wing Sprite Sheet.png",{
            frameWidth: 1024,
            frameHeight: 1024
        });
        this.load.spritesheet("player_chargeStart_2", "Assets/Animations/Player Character/One Wing/Charge Wing Sprite Sheet.png",{
            frameWidth: 1024,
            frameHeight: 1024
        });
        this.load.spritesheet("player_chargeLoop_2", "Assets/Animations/Player Character/One Wing/Charge Loop Wing Sprite Sheet.png",{
            frameWidth: 1024,
            frameHeight: 1024
        });
        this.load.spritesheet("player_airCharge_2", "Assets/Animations/Player Character/2 Wing/Jump Charge Wing 2x Sprite Sheet.png",{
            frameWidth: 1024,
            frameHeight: 1024
        });
        this.load.spritesheet("player_jumpStart_2", "Assets/Animations/Player Character/2 Wing/Jump Wing 2x Sprite Sheet.png",{
            frameWidth: 1024,
            frameHeight: 1024
        });
        this.load.spritesheet("player_jumpLoop_2", "Assets/Animations/Player Character/2 Wing/Mid-Jump Wing 2x Sprite Sheet.png",{
            frameWidth: 1024,
            frameHeight: 1024
        });
        this.load.spritesheet("player_airChargeLoop_2", "Assets/Animations/Player Character/One Wing/Jump Charge Loop Wing Sprite Sheet.png",{
            frameWidth: 1024,
            frameHeight: 1024
        });
        this.load.spritesheet("player_fallStart_2", "Assets/Animations/Player Character/2 Wing/Fall Wing 2x Sprite Sheet.png",{
            frameWidth: 1024,
            frameHeight: 1024
        });
        this.load.spritesheet("player_fallLoop_2", "Assets/Animations/Player Character/2 Wing/Falling Loop Wing 2x Sprite Sheet.png",{
            frameWidth: 1024,
            frameHeight: 1024
        });
        this.load.spritesheet("player_death_2", "Assets/Animations/Player Character/2 Wing/Death 2x Sprite Sheet.png",{
            frameWidth: 1024,
            frameHeight: 1024
        });

        // wing 3
        this.load.spritesheet("player_idle_3", "Assets/Animations/Player Character/One Wing/Idle Wing Sprite Sheet.png",{
            frameWidth: 1024,
            frameHeight: 1024
        });
        this.load.spritesheet("player_chargeStart_3", "Assets/Animations/Player Character/One Wing/Charge Wing Sprite Sheet.png",{
            frameWidth: 1024,
            frameHeight: 1024
        });
        this.load.spritesheet("player_chargeLoop_3", "Assets/Animations/Player Character/One Wing/Charge Loop Wing Sprite Sheet.png",{
            frameWidth: 1024,
            frameHeight: 1024
        });
        this.load.spritesheet("player_airCharge_3", "Assets/Animations/Player Character/3 Wing/Jump Charge Wing 3x Sprite Sheet.png",{
            frameWidth: 1024,
            frameHeight: 1024
        });
        this.load.spritesheet("player_jumpStart_3", "Assets/Animations/Player Character/3 Wing/Jump Wing 3x Sprite Sheet.png",{
            frameWidth: 1024,
            frameHeight: 1024
        });
        this.load.spritesheet("player_jumpLoop_3", "Assets/Animations/Player Character/3 Wing/Mid-Jump Wing 3x Sprite Sheet.png",{
            frameWidth: 1024,
            frameHeight: 1024
        });
        this.load.spritesheet("player_airChargeLoop_3", "Assets/Animations/Player Character/One Wing/Jump Charge Loop Wing Sprite Sheet.png",{
            frameWidth: 1024,
            frameHeight: 1024
        });
        this.load.spritesheet("player_fallStart_3", "Assets/Animations/Player Character/3 Wing/Fall Wing 3x Sprite Sheet.png",{
            frameWidth: 1024,
            frameHeight: 1024
        });
        this.load.spritesheet("player_fallLoop_3", "Assets/Animations/Player Character/3 Wing/Falling Loop Wing 3x Sprite Sheet.png",{
            frameWidth: 1024,
            frameHeight: 1024
        });
        this.load.spritesheet("player_death_3", "Assets/Animations/Player Character/3 Wing/Death 3x Sprite Sheet.png",{
            frameWidth: 1024,
            frameHeight: 1024
        });
    }
}
