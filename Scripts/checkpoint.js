"use strict"

class Checkpoint extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, imageName, checkPointGroup, checkpointData, index) {

        super(scene, x, y, imageName);
        this.checkPoint = this.scene.physics.add.sprite(x, y, imageName);
        this.checkPoint.scene = scene;
        this.checkPoint.index = index;
        this.checkPoint.checkpointData = checkpointData;
        this.checkPoint.checked = false;
        this.checkPoint.setOrigin(0.5, 1);
        this.type = "checkpoint";

        this.create();
        checkPointGroup.add(this.checkPoint);
    }

    create(){
        //this.item.body.setSize(20,20);
        this.checkPoint.scale = 0.6;
        this.checkPoint.body.gravity.set(0, 1000);
    }

    update(){
        // test 2
    }
}
