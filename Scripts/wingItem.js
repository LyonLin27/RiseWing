"use strict"

class WingItem extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, imageName, itemGroup) {

        super(scene, x, y, imageName);
        this.item = this.scene.physics.add.sprite(x, y, imageName);
        this.item.setOrigin(0.5, 0.5);

        this.create();
        itemGroup.add(this);
    }

    create(){
        this.item.body.setSize(this.item.width*0.5,this.item.height*0.6);
        this.item.scale = 0.8;
        // this.item.body.offset.x = 300;
        // this.item.body.offset.y = 300;
        this.item.body.gravity.set(0, -200);
        this.item.play("wingItemLoop");

    }

    collected(delta){
        this.scene.player.maxJump += 1;
        this.item.disableBody(true, true);
    }

    update(time, delta){
        if(this.scene.physics.overlap(this.item, this.scene.player.getBody())){
            this.collected();
            console.log(this.scene.name);
            if(this.scene.name == "scene3"){
                localStorage.setItem("collected_wings", 1);
            }
        }
    }
}
