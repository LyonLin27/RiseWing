"use strict"

class LevelEnd extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y) {

        super(scene, x, y);
        this.levelEnd = this.scene.physics.add.sprite(x, y, "levelEnd");
        this.levelEnd.setOrigin(0.5, 0.0);
        this.levelEnd.body.setSize(game.config.width, 500);
        this.levelEnd.body.setAllowGravity(false);
        this.levelEnd.body.setImmovable(true);
        this.levelEnd.body.offset.y = -200;
        this.levelEnd.triggered = false;
    }
}