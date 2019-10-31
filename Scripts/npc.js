"use strict"

class NPC extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, imageName, npcGroup, dialogData, personality, faceLeft=true, scalex = 1, scaley = 1, dialogOffsetX = 200) {

        super(scene, x, y, imageName);
        this.npc = this.scene.physics.add.sprite(x, y, imageName);
        this.imageName = imageName;
        this.animKey = imageName+"_anim";
        this.faceLeft = faceLeft;

        this.dialogOffsetY = 300;
        this.dialogOffsetX = dialogOffsetX;
        this.personality = personality;

        // dialog container
        this.dialogContainer = this.scene.add.container(this.npc.x, this.npc.y-this.dialogOffsetY);
        
        // dialog box
        this.dialogBubble = this.scene.add.image(0,0, "dialogbox1");
        this.dialogBubble.scale = 1.5;
        this.dialogBubble.alpha = 0.0;
        this.dialogContainer.add(this.dialogBubble);

        this.actionBubble = this.scene.add.image(0,0,"actionbox1");
        this.actionBubble.scale = 1.5;
        this.actionBubble.alpha = 0.0;
        this.dialogContainer.add(this.actionBubble);

        this.bubblePointer = this.dialogBubble;
        this.isDialog = true;

        this.dialogStyle = { 
            font: "40px MyBolton", fill: "#000000", 
            align: "left", // the alignment of the text is independent of the bounds, try changing to 'center' or 'right'
            boundsAlignH: "center", 
            boundsAlignV: "center", 
            //wordWrap: true, 
            wordWrap: { width: 460 }
        };

        this.dialogData = dialogData;
        //let wrappedStr = advancedWordWrap(dialogStr, context, 200)
        if(this.imageName.includes("moth"))
            this.dialogType = "MothDialog";
        else
            this.dialogType = "ButterflyDialog";
        
        this.dialogTalk = this.dialogData[this.dialogType].Wings0["talk"][personality];
        this.dialog = this.scene.add.text(0,0, this.dialogTalk, this.dialogStyle);
        
        if(this.faceLeft)
            this.dialog.setOrigin(0.4, 1);
        else
            this.dialog.setOrigin(0.6, 1);
        
        this.dialog.alpha = 0;
        this.dialogContainer.add(this.dialog);
        
        this.gravity = 500;
        this.sceneNPCGroup = npcGroup;

        this.npc.body.setSize(this.npc.body.width*scalex,this.npc.body.height*scaley);
        this.create();
    }

    create(){

        this.npc.body.gravity.set(0, this.gravity);
        //this.npc.body.setSize(20,20);
        this.npc.scale = 0.2;
        this.sceneNPCGroup.add(this);

        this.previousTouchingPlayer = false;

        this.scene.anims.create({
            key: this.animKey,
            frames: this.scene.anims.generateFrameNumbers(this.imageName),
            frameRate: 6,
            repeat: -1
        });

        this.npc.play(this.animKey);
        this.npc.flipX = !this.faceLeft;
    }

    triggerDialog(delta){

        // position bubble
        if(this.x > game.config.width*0.5){
            this.dialogContainer.x = this.npc.x-this.dialogOffsetX;
            this.actionBubble.flipX = true;
            this.dialogBubble.flipX = true;
            this.dialog.setOrigin(0.4, 1);
        }else{
            this.dialogContainer.x = this.npc.x+this.dialogOffsetX;
            this.actionBubble.flipX = false;
            this.dialogBubble.flipX = false;
            this.dialog.setOrigin(0.6, 1);
        }
        this.dialogContainer.y = this.npc.y - this.dialogOffsetY;
        
        // increase alpha
        this.bubblePointer.alpha += delta/500;
        if(this.bubblePointer.alpha >= 0.75){
            this.dialog.alpha += delta/500;
        }

        if(this.bubblePointer.alpha > 1){
            this.bubblePointer.alpha = 1;
        }
        if(this.dialog.alpha > 1){
            this.dialog.alpha = 1;
        }
    }

    updateDialog(playerWings, isDialog){
        // update dialog
        let wingCount = "Wings" + (playerWings-1)*2;
        let dialogOrText = "text";
        if(isDialog){
            dialogOrText = "talk";
        }
        let newtext = this.dialogData[this.dialogType][wingCount][dialogOrText][this.personality];
        if(newtext == "\"\"" || newtext == ""){
            // reverse dialog or talk
            if(dialogOrText == "talk"){
                dialogOrText = "text";
                isDialog = false;
            }else{
                dialogOrText = "talk";
                isDialog = true;
            }
            newtext = this.dialogData[this.dialogType][wingCount][dialogOrText][this.personality];
        }
        this.dialog.text = newtext;
        this.dialog.setStyle(this.dialogStyle);
        this.dialog.setLineSpacing(10);

        if(isDialog){
            this.bubblePointer = this.dialogBubble;
        }else{
            this.bubblePointer = this.actionBubble;
        }
    }

    update(time, delta){
        if(this.scene.physics.overlap(this.npc, this.scene.player.getBody())){
            if(!this.previousTouchingPlayer){
                this.updateDialog(this.scene.player.maxJump, this.isDialog);
                this.isDialog = !this.isDialog;
            }
            this.triggerDialog(delta);
            this.previousTouchingPlayer = true;
        }else{
            this.dialogBubble.alpha -= delta/100;
            this.actionBubble.alpha -= delta/100;
            this.dialog.alpha -= delta/100;
            this.previousTouchingPlayer = false;
        }
    }

    
}

