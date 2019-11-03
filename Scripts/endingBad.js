"use strict";

class endingBad extends Phaser.Scene{
    constructor(){
        super("ending_bad");
    }

    preload(){

        this.load.image("BE1", "Assets/Endings/Good Ending/g1.png");
        this.load.image("BE2", "Assets/Endings/Good Ending/g2.png");
        this.load.image("BE3", "Assets/Endings/Good Ending/g3.png");
        this.load.image("BE4", "Assets/Endings/Bad Ending/b4.png");
        this.load.image("BE5", "Assets/Endings/Good Ending/g4.png");
        this.load.image("BE6", "Assets/Endings/Bad Ending/b5.png");
        this.load.image("BE7", "Assets/Endings/Bad Ending/b6.png");

        this.load.image("imageBE", "Assets/Endings/Bad Ending/ending 1 cutscene.png");

        // load white / black screen
        this.load.image("titleBG", "Assets/UI Assets/Title_Screen_Background_Image.png");
        this.load.image("loadingBG", "Assets/UI Assets/loading_screen_bg_art.png");

    }

    create(){
        
        this.blackBG = this.add.image(game.config.width*0.5,game.config.height*0.5, "titleBG");
        this.blackBG.scale  = 1;
        this.blackBG.alpha = 1;
        this.whiteScreen = this.add.image(game.config.width*0.5,game.config.height*0.5, "loadingBG");
        this.whiteScreen.depth = 100;
        //this.blackScreen.depth = 100;
        this.whiteScreen.scale  = 1;
        this.whiteScreen.alpha = 1;
        this.whiteAlphaTar = 0;
        
        this.animArr = new Array();
        for(let i = 7; i>0; i--){
            let imgName = "BE"+i;
            let img = this.add.image(0, 0, imgName);
            img.setOrigin(0,0);
            img.scale = 1.2;
            this.animArr.push(img);
        }
        this.countdownMax = 4;
        this.countdown = 9999;
        this.lastImg = null;

        this.showCG = false;
        this.endCG = this.add.image(game.config.width*0.5,game.config.height*0.5, "imageBE");
        this.endCG.alpha = 0;

        this.time.delayedCall(1000, ()=>{
            this.whiteAlphaTar = 0;
        }, []);
        this.time.delayedCall(1500, ()=>{
            this.countdown = this.countdownMax;
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

        if(this.lastImg != null){
            if(this.lastImg.alpha >=0){
                this.lastImg.alpha -= delta/500;
            }
        }
        
        if(this.showCG){
            this.endCG.alpha += delta/1200;
            if(this.endCG.alpha >= 1){
                this.endCG.alpha = 1;
                this.showCG = false;
                this.time.delayedCall(6000, ()=>{ this.whiteAlphaTar = 1}, []);
                this.time.delayedCall(8000, ()=>{ this.scene.start("title")}, []);
            }
        }

        if(this.animArr.length <= 0 && this.endCG.alpha == 0){
            this.showCG = true;
        }
        if(this.animArr.length <= 0){
            return;
        }else if (this.countdown < 0){
            this.lastImg = this.animArr.pop();
            this.countdown = this.countdownMax;
        }else{
            this.countdown -= delta/1000;
        }
    }
}

