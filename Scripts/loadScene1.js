"use strict";

class loadScene1 extends Phaser.Scene{
    constructor(){
        super("load1");
    }

    preload(){
        this.whiteScreen = this.add.image(game.config.width*0.5,game.config.height*0.5, "loadingBG");
        this.add.text(game.config.width*0.2,game.config.height*0.9, "Now Loading...", {font:"60px MyBolton",fill: "#555555"});
        this.add.text(game.config.width*0.05,game.config.height*0.95, "La Concordanza,Irene De Ruvo \nConcerto grosso No. 9 in C Minor ＂Victoria Maesta＂： III. Grave", {font:"30px MyBolton",fill: "#555555"});


        this.loadPlayer();
        this.loadEnv();
        this.loadNPC();
        this.loadUtility();

        this.loadAudio();

        this.load.image("ground", "Assets/platform.png");
    }

    create(){
        
        this.scene.start("scene1");
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
        this.load.image("bg_1_1", "Assets/Level 1/Sky/sky 1.1.png");
        this.load.image("bg_1_2", "Assets/Level 1/Sky/sky 1.2.png");
        this.load.image("bg_1_3", "Assets/Level 1/Sky/sky 1.3.png");
        this.load.image("bg_1_4", "Assets/Level 1/Sky/sky 1.4.png");
        this.load.image("bg_1_5", "Assets/Level 1/Sky/sky 1.5.png");
        this.load.image("bg_1_6", "Assets/Level 1/Sky/sky 1.6.png");
        this.load.image("bg_1_7", "Assets/Level 1/Sky/sky 1.7.png");
        this.load.image("bg_1_8", "Assets/Level 1/Sky/sky 1.8.png");

        this.load.image("back_1l1", "Assets/Level 1/Background Building 1_L.png");
        this.load.image("back_1r1", "Assets/Level 1/Background Building 1_R.png");
        this.load.image("back_1l2", "Assets/Level 1/Background Building 2_L.png");
        this.load.image("back_1r2", "Assets/Level 1/Background Building 2_R.png");
        this.load.image("back_1l3", "Assets/Level 1/Background Building 3_L.png");
        this.load.image("back_1r3", "Assets/Level 1/Background Building 3_R.png");

        this.load.image("mid_1l1", "Assets/Level 1/Midground Tree 1_L.png");
        this.load.image("mid_1r1", "Assets/Level 1/Midground Tree 1_R.png");
        this.load.image("mid_1l2", "Assets/Level 1/Midground Tree 2_L.png");
        this.load.image("mid_1r2", "Assets/Level 1/Midground Tree 2_R.png");
        this.load.image("mid_1l3", "Assets/Level 1/Midground Tree 3_L.png");
        this.load.image("mid_1r3", "Assets/Level 1/Midground Tree 3_R.png");

        this.load.image("fore_1l1", "Assets/Level 1/Foreground Building 1_L.png");
        this.load.image("fore_1r1", "Assets/Level 1/Foreground Building 1_R.png");
        this.load.image("fore_1l2", "Assets/Level 1/Foreground Building 2_L.png");
        this.load.image("fore_1r2", "Assets/Level 1/Foreground Building 2_R.png");
        this.load.image("fore_1l3", "Assets/Level 1/Foreground Building 3_L.png");
        this.load.image("fore_1r3", "Assets/Level 1/Foreground Building 3_R.png");

        this.load.image("overlay1", "Assets/UI Assets/Level_1_Overlay.png");

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

    loadAudio(){
        this.load.audio("deathSFX", "Assets/SFX/audio_death.wav");
        this.load.audio("jumpSFX", "Assets/SFX/audio_jump_and_fly.wav");
        this.load.audio("landSFX", "Assets/SFX/audio_landing_on_platform.wav");

        this.load.audio("bgm1", "Assets/Music/lv1.mp3");
    }
}
