"use strict"

class JumpUI extends Phaser.GameObjects.Image {
    
    constructor(scene, x, y, imageNameTop, imageNameBot) {
        
        super(scene, x, y, imageNameBot);
        
        this.groupUI = this.scene.add.group();
        
        this.x = x;
        this.y = y;
        this.imageNameBot = imageNameBot;
        this.imageNameTop = imageNameTop;
        this.entriesTop = [];
        this.entriesBot = [];

        this.scene = scene;
        this.scale = 0.6;
        this.jumpCount = 3;
        this.posInterval = 150;

        this.maxJump = 3;

        this.create();
    }
    
    create(){
        // create entries
        for(let i = 0; i<5; i+=1){
            let tempx = this.x - this.posInterval*i;
            let tempy = this.y;// - this.posInterval*i;

            let newEntryBot = this.scene.add.image(tempx, tempy, this.imageNameBot);
            newEntryBot.scale = this.scale;
            newEntryBot.alpha = 0.0;
            newEntryBot.setScrollFactor(0);
            this.groupUI.add(newEntryBot);
            this.entriesBot.push(newEntryBot);

            let newEntryTop = this.scene.add.image(tempx, tempy, this.imageNameTop);
            newEntryTop.scale = this.scale;
            newEntryTop.alpha = 0.0;
            newEntryTop.setScrollFactor(0);
            this.groupUI.add(newEntryTop);
            this.entriesTop.push(newEntryTop);
        }
        //this.entries = this.groupUI.getChildren();
        //this.groupUI.setScrollFactor(1);
    }
    
    update(time, delta, remainJump, maxJump){

        // modify alpha of each enrry
        for(let i = 0; i<this.entriesTop.length; i+=1){
            //update bot
            if(i >= maxJump){
                this.entriesBot[i].alpha -= delta/500;
                if(this.entriesBot[i].alpha < 0){
                    this.entriesBot[i].alpha = 0;
                }
            }else{
                this.entriesBot[i].alpha += delta/500;
                if(this.entriesBot[i].alpha > 1){
                    this.entriesBot[i].alpha = 1;
                }
            }

            // update top
            if(i >= remainJump){
                this.entriesTop[i].alpha -= delta/500;
                if(this.entriesTop[i].alpha < 0){
                    this.entriesTop[i].alpha = 0;
                }
            }else{
                this.entriesTop[i].alpha += delta/500;
                if(this.entriesTop[i].alpha > 1){
                    this.entriesTop[i].alpha = 1;
                }
            }
        }
    }
}