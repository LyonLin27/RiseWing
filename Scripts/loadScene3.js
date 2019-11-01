"use strict";

class loadScene3 extends Phaser.Scene{
    constructor(){
        super("load3");
    }

    preload(){
        this.whiteScreen = this.add.image(game.config.width*0.5,game.config.height*0.5, "loadingBG");
        this.add.text(game.config.width*0.2,game.config.height*0.9, "Now Loading...", {font:"60px MyBolton",fill: "#555555"});
        this.add.text(game.config.width*0.05,game.config.height*0.95, "Pyotr Ilyich Tchaikovsky,Borodin Quartet,Yuri Yurov \nString Quartet No 1 in D Major, Op 11：II Andante cantabile", {font:"30px MyBolton",fill: "#555555"});

        this.loadPlayer();
        this.loadEnv();
        this.loadNPC();
        this.loadUtility();
        this.loadSpikes();
        this.loadAudio();

        this.load.image("ground", "Assets/platform.png");
    }

    create(){

        this.scene.start("scene3");
    }

    loadPlayer(){
        this.load.spritesheet("player_idle_0", "Assets/Animations/Player Character/No Wing/Idle Sprite Sheet.png",{
            frameWidth: 1024,
            frameHeight: 1024
        });

        this.load.spritesheet("player_chargeStart_0", "Assets/Animations/Player Character/No Wing/Charge Sprite Sheet.png",{
            frameWidth: 1024,
            frameHeight: 1024
        });
        this.load.spritesheet("player_chargeLoop_0", "Assets/Animations/Player Character/No Wing/Charge Loop Sprite Sheet.png",{
            frameWidth: 1024,
            frameHeight: 1024
        });
        this.load.spritesheet("player_jumpStart_0", "Assets/Animations/Player Character/No Wing/Jump Sprite Sheet.png",{
            frameWidth: 1024,
            frameHeight: 1024
        });
        this.load.spritesheet("player_jumpLoop_0", "Assets/Animations/Player Character/No Wing/Mid-Jump Sprite Sheet.png",{
            frameWidth: 1024,
            frameHeight: 1024
        });
        this.load.spritesheet("player_fallStart_0", "Assets/Animations/Player Character/No Wing/Fall Sprite Sheet.png",{
            frameWidth: 1024,
            frameHeight: 1024
        });
        this.load.spritesheet("player_fallLoop_0", "Assets/Animations/Player Character/No Wing/Falling Loop Sprite Sheet.png",{
            frameWidth: 1024,
            frameHeight: 1024
        });
        // wing 1
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


        // particle
        this.load.image("star", "Assets/star.png");
    }

    loadEnv(){
        // load environment assets
        this.load.image("bg_3_1", "Assets/Level 3/Sky/Sky_1.png");
        this.load.image("bg_3_2", "Assets/Level 3/Sky/Sky_2.png");
        this.load.image("bg_3_3", "Assets/Level 3/Sky/Sky_3.png");

        this.load.image("back_3l1", "Assets/Level 3/Background_1_L.png");
        this.load.image("back_3r1", "Assets/Level 3/Background_1_R.png");
        this.load.image("back_3l2", "Assets/Level 3/Background_2_L.png");
        this.load.image("back_3r2", "Assets/Level 3/Background_2_R.png");

        this.load.image("mid_3l1", "Assets/Level 3/Midground_Tree_1_L.png");
        this.load.image("mid_3r1", "Assets/Level 3/Midground_Tree_1_R.png");
        this.load.image("mid_3l2", "Assets/Level 3/Midground_Tree_2_L.png");
        this.load.image("mid_3r2", "Assets/Level 3/Midground_Tree_2_R.png");
        this.load.image("mid_3l3", "Assets/Level 3/Midground_Tree_3_L.png");
        this.load.image("mid_3r3", "Assets/Level 3/Midground_Tree_3_R.png");

        this.load.image("fore_3l1", "Assets/Level 3/Foreground_Building_1_L.png");
        this.load.image("fore_3r1", "Assets/Level 3/Foreground_Building_1_R.png");
        this.load.image("fore_3l2", "Assets/Level 3/Foreground_Building_2_L.png");
        this.load.image("fore_3r2", "Assets/Level 3/Foreground_Building_2_R.png");
        this.load.image("fore_3l3", "Assets/Level 3/Foreground_Building_3_L.png");
        this.load.image("fore_3r3", "Assets/Level 3/Foreground_Building_3_R.png");

        this.load.image("overlay3", "Assets/UI Assets/Level_3_Overlay.png");

    }
    
    loadUtility(){
        //load Branch PLatforms
        this.load.image("center1", "Assets/Branch Platforms/Branch_Center_1.png");
        this.load.image("center2", "Assets/Branch Platforms/Branch_Center_2.png");
        this.load.image("center3", "Assets/Branch Platforms/Branch_Center_3.png");
        this.load.image("center4", "Assets/Branch Platforms/Branch_Center_4.png");
        this.load.image("center5", "Assets/Branch Platforms/Branch_Center_5.png");
        this.load.image("center6", "Assets/Branch Platforms/Branch_Center_6.png");
        this.load.image("left1", "Assets/Branch Platforms/Branch_L_1.png");
        this.load.image("left2", "Assets/Branch Platforms/Branch_L_2.png");
        this.load.image("right1", "Assets/Branch Platforms/Branch_R_1.png");
        this.load.image("right2", "Assets/Branch Platforms/Branch_R_2.png");

        // this.load.image("center1ex", "Assets/Branch Platforms/White Platforms/White_Branch_Center_1.png");
        // this.load.image("center2ex", "Assets/Branch Platforms/White Platforms/White_Branch_Center_2.png");
        // this.load.image("center3ex", "Assets/Branch Platforms/White Platforms/White_Branch_Center_3.png");
        // this.load.image("center4ex", "Assets/Branch Platforms/White Platforms/White_Branch_Center_4.png");
        // this.load.image("center5ex", "Assets/Branch Platforms/White Platforms/White_Branch_Center_5.png");
        // this.load.image("center6ex", "Assets/Branch Platforms/White Platforms/White_Branch_Center_6.png");
        // this.load.image("left1ex", "Assets/Branch Platforms/White Platforms/White_Branch_L_1.png");
        // this.load.image("left2ex", "Assets/Branch Platforms/White Platforms/White_Branch_L_2.png");
        // this.load.image("right1ex", "Assets/Branch Platforms/White Platforms/White_Branch_R_1.png");
        // this.load.image("right2ex", "Assets/Branch Platforms/White Platforms/White_Branch_R_2.png");
        
        // load jump ui
        this.load.image("jump_ui_black", "Assets/UI Assets/UI_Jump_Black.png");
        this.load.image("jump_ui_gold", "Assets/UI Assets/UI_Jump_Gold.png");
        
        //load spiderweb
        this.load.image("spiderWeb", "Assets/UI Assets/Spiderweb UI.png");
        
        // load checkpoint
        this.load.spritesheet("checkpoint_grow", "Assets/UI Assets/Branch_UI_Sprite_Sheet.png",{
            frameWidth: 1024,
            frameHeight: 1024
        });
        this.load.spritesheet("checkpoint_end", "Assets/UI Assets/Branch_UI_Final.png",{
            frameWidth: 1024,
            frameHeight: 1024
        });
        this.load.spritesheet("checkpoint_start", "Assets/UI Assets/Branch_UI_First.png",{
            frameWidth: 1024,
            frameHeight: 1024
        });
        
        // load wing item
        this.load.spritesheet("wingItem", "Assets/UI Assets/Wing_Pickup_UI_Sprite_Sheet.png",{
            frameWidth: 1024,
            frameHeight: 1024
        });
        
        
        this.load.json("checkpointData", 'Assets/Text/checkpoints.json');

        // load white / black screen
        this.load.image("blackScreen", "Assets/black.png");
        this.load.image("whiteScreen", "Assets/white.png");
        
        //load crumbling platform
        this.load.spritesheet("crumbling_break", "Assets/Branch Platforms/Crumbling Branch/Crumbling_Break_Sprite_Sheet.png",{
            frameWidth: 1024,
            frameHeight: 589
        });
        this.load.spritesheet("crumbling_respawn", "Assets/Branch Platforms/Crumbling Branch/Crumbling_Respawn_Sprite_Sheet.png",{
            frameWidth: 1024,
            frameHeight: 589
        });
        this.load.spritesheet("crumbling_shake", "Assets/Branch Platforms/Crumbling Branch/Crumbling_Shaking_Loop_Sprite_Sheet.png",{
            frameWidth: 1024,
            frameHeight: 589
        });
        
        this.load.image("crumbling_platform", "Assets/Branch Platforms/Crumbling Branch/crumbling_Platform.png");
        
        // level end
        this.load.image("levelEnd", "Assets/UI Assets/Level_End_UI.png");
    }

    loadNPC(){
        // load dialog
        this.load.json("dialogData", 'Assets/Text/npcDialog.json');

        //load dialog box
        this.load.image("dialogbox1",  "Assets/UI Assets/Speech Bubble Tail UI.png");
        this.load.image("actionbox1", "Assets/UI Assets/Speech Bubble No Tail UI.png");

        //load NPCs
        this.load.spritesheet("npc_butterfly1", "Assets/Animations/NPCs/Birdwing Butterfly Idle Sprite Sheet.png",{
            frameWidth: 1024,
            frameHeight: 1024
        });
        this.load.spritesheet("npc_butterfly2", "Assets/Animations/NPCs/frame2/butterfly_crazywing.png",{
            frameWidth: 1024,
            frameHeight: 1024
        });
        this.load.spritesheet("npc_butterfly3", "Assets/Animations/NPCs/frame2/butterfly_snootyboi.png",{
            frameWidth: 1024,
            frameHeight: 1024
        });
        this.load.spritesheet("npc_moth1", "Assets/Animations/NPCs/Fluff Moth Sprite Sheet Idle.png",{
            frameWidth: 1024,
            frameHeight: 1024
        });
        this.load.spritesheet("npc_moth2", "Assets/Animations/NPCs/frame2/moth_luna.png",{
            frameWidth: 1024,
            frameHeight: 1024
        });
        this.load.spritesheet("npc_moth3", "Assets/Animations/NPCs/frame2/moth_brokenboi.png",{
            frameWidth: 1024,
            frameHeight: 1024
        });
    }

    loadSpikes(){
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

    loadAudio(){
        this.load.audio("deathSFX", "Assets/SFX/audio_death.wav");
        this.load.audio("jumpSFX", "Assets/SFX/audio_jump_and_fly.wav");
        this.load.audio("landSFX", "Assets/SFX/audio_landing_on_platform.wav");

        this.load.audio("bgm1", "Assets/Music/lv3.mp3");
    }

}
