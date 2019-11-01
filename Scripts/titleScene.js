"use strict";

class titleScene extends Phaser.Scene{
    constructor(){
        super("title");
    }

    preload(){
        this.load.image("titleImg", "Assets/UI Assets/Title_icon.png");
        this.load.image("startImg", "Assets/Start.png");
        this.load.image("continueImg", "Assets/Continue.png");
        //this.load.image("testImg", "Assets/Test.png");


        this.load.spritesheet("tree_grow", "Assets/UI Assets/Branch_UI_Sprite_Sheet.png",{
            frameWidth: 1024,
            frameHeight: 1024
        });
        this.load.spritesheet("tree_start", "Assets/UI Assets/Branch_UI_First.png",{
            frameWidth: 1024,
            frameHeight: 1024
        });

        // load white / black screen
        this.load.image("titleBG", "Assets/UI Assets/Title_Screen_Background_Image.png");
        this.load.image("loadingBG", "Assets/UI Assets/loading_screen_bg_art.png");

    }

    create(){
        // create animations
        this.anims.create({
            key: "click_tree",
            frames: this.anims.generateFrameNumbers("tree_grow"),
            frameRate: 12,
            repeat: 0
        });
        this.anims.create({
            key: "hover_tree",
            frames: this.anims.generateFrameNumbers("tree_start"),
            frameRate: 1,
            repeat: 0
        });

        localStorage.setItem("test_mode", "0");

        this.blackBG = this.add.image(game.config.width*0.5,game.config.height*0.5, "titleBG");
        this.blackBG.scale  = 1;
        this.blackBG.alpha = 1;
        this.whiteScreen = this.add.image(game.config.width*0.5,game.config.height*0.5, "loadingBG");
        this.whiteScreen.depth = 100;
        //this.blackScreen.depth = 100;
        this.whiteScreen.scale  = 1;
        this.whiteScreen.alpha = 1;
        this.whiteAlphaTar = 0;

        this.hoverSprite = this.add.sprite(0,0,"tree_start");
        this.hoverSprite.scale = 0.2;
        //this.hoverSprite.x = game.config.width*0.25;
        this.hoverSprite.setOrigin(0.5, 0.7);
        this.hoverSprite.setVisible(false);

        this.titleImg = this.add.image(game.config.width*0.5, game.config.height*0.25, "titleImg");
        this.titleImg.scale = 0.5;
        this.startBtn = this.add.image(game.config.width*0.5, game.config.height*0.6, "startImg");
        this.startBtn.scale = 0.5;
        this.startBtn.setInteractive();
        this.startBtn.on("pointerover", ()=>{
            this.hoverSprite.setVisible(true);
            this.hoverSprite.play("click_tree");
            this.hoverSprite.x = this.startBtn.x - this.startBtn.width/2 - 60;
            this.hoverSprite.y = this.startBtn.y;
        })
        this.startBtn.on("pointerout", ()=>{
            this.hoverSprite.setVisible(false);
        })
        this.startBtn.on("pointerup", ()=>{
            //reset localstorage
            localStorage.setItem("save_level", 1);
            localStorage.setItem("save_checkpoint", 1);
            localStorage.setItem("collected_wings", 0);
            //this.scene.start("load1");
            this.whiteAlphaTar = 1;
            this.time.delayedCall(1000, ()=>{ this.scene.start("load1")}, []);
        })

        this.continueBtn = this.add.image(game.config.width*0.5, game.config.height*0.7, "continueImg");
        this.continueBtn.scale = 0.5;
        this.continueBtn.setInteractive();
        this.continueBtn.on("pointerover", ()=>{
            this.hoverSprite.setVisible(true);
            this.hoverSprite.play("click_tree");
            this.hoverSprite.x = this.continueBtn.x - this.continueBtn.width/2 - 20;
            this.hoverSprite.y = this.continueBtn.y;
        })
        this.continueBtn.on("pointerout", ()=>{
            this.hoverSprite.setVisible(false);
        })
        this.continueBtn.on("pointerup", ()=>{
            this.whiteAlphaTar = 1;
            let savedLevel = localStorage.getItem("save_level");
            if(savedLevel == "1")
                this.time.delayedCall(1000, ()=>{ this.scene.start("load1")}, []);
            if(savedLevel == "2")
                this.time.delayedCall(1000, ()=>{ this.scene.start("load2")}, []);
            if(savedLevel == "3")
                this.time.delayedCall(1000, ()=>{ this.scene.start("load3")}, []);

        })

        // this.testBtn = this.add.image(game.config.width*0.5, game.config.height*0.8, "testImg");
        // this.testBtn.scale = 0.5;
        // this.testBtn.setInteractive();
        // this.testBtn.on("pointerover", ()=>{
        //     this.hoverSprite.setVisible(true);
        //     this.hoverSprite.play("click_tree");
        //     this.hoverSprite.x = this.testBtn.x - this.testBtn.width/2 - 20;
        //     this.hoverSprite.y = this.testBtn.y;
        // })
        // this.testBtn.on("pointerout", ()=>{
        //     this.hoverSprite.setVisible(false);
        // })
        // this.testBtn.on("pointerup", ()=>{
        //     this.whiteAlphaTar = 1;
        //     this.time.delayedCall(1000, ()=>{ this.scene.start("ending_good")}, []);
        // })

        let num_key = this.input.keyboard.addKey("ZERO");
        if(num_key.isDown){
            console.log("test mode on");
            localStorage.setItem("test_mode", "1");
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
    }
}
