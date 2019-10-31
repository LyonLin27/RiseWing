"use strict";

class endingBad extends Phaser.Scene{
    constructor(){
        super("ending_bad");
    }

    preload(){
        this.load.spritesheet("sheetBE", "Assets/Endings/Bad Ending/Bad_Ending_Sprite_Sheet.png",{
            frameWidth: 1024,
            frameHeight: 2048
        });

        this.load.image("imageBE", "Assets/Endings/Bad Ending/ending 1 cutscene.png");

        // load white / black screen
        this.load.image("titleBG", "Assets/UI Assets/Title_Screen_Background_Image.png");
        this.load.image("loadingBG", "Assets/UI Assets/loading_screen_bg_art.png");

    }

    create(){
        // create animations
        this.anims.create({
            key: "anim_BE",
            frames: this.anims.generateFrameNumbers("sheetBE"),
            frameRate: 0.3,
            repeat: 0
        });

        this.blackBG = this.add.image(game.config.width*0.5,game.config.height*0.5, "titleBG");
        this.blackBG.scale  = 1;
        this.blackBG.alpha = 1;
        this.whiteScreen = this.add.image(game.config.width*0.5,game.config.height*0.5, "loadingBG");
        this.whiteScreen.depth = 100;
        //this.blackScreen.depth = 100;
        this.whiteScreen.scale  = 1;
        this.whiteScreen.alpha = 1;
        this.whiteAlphaTar = 0;

        this.animBE = this.add.sprite(0,0, "anim_BE");
        this.animBE.setOrigin(0,0);
        this.animBE.scale = 1.2;
        this.animBE.play("anim_BE");

        this.showCG = false;
        this.endCG = this.add.image(game.config.width*0.5,game.config.height*0.5, "imageBE");
        this.endCG.alpha = 0;

        this.time.delayedCall(1000, ()=>{this.whiteAlphaTar = 0}, []);
        this.time.delayedCall(1500, ()=>{
            this.animBE.play("anim_BE");
            this.animBE.on('animationcomplete', BEAnimEnd, this);
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

        if(this.showCG){
            this.endCG.alpha += delta/800;
            if(this.endCG.alpha >= 1){
                this.endCG.alpha = 1;
                this.showCG = false;
                this.time.delayedCall(6000, ()=>{ this.whiteAlphaTar = 1}, []);
                this.time.delayedCall(8000, ()=>{ this.scene.start("title")}, []);
            }
        }
    }
}

function BEAnimEnd (animation, frame)
{
    this.showCG = true;
}

