"use strict"

class Trigger extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, width, height) {

        super(scene, x, y);
        this.trigger = this.scene.physics.add.existing(this, 1);
        this.trigger.setOrigin(0.5, 0.5);
        this.trigger.body.setSize(width, height);
        //this.trigger.body.offset.y = -200;
        this.trigger.triggered = false;
    }
}