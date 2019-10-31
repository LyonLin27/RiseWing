"use strict"

class SpiderWeb{

    constructor(scene, x, y, group, scaleX = 1, scaleY = 1){
        this.web = scene.physics.add.image(x, y, "spiderWeb");
        this.web.setOrigin(0.5, 0.5);
        this.web.body.setAllowGravity(false);
        this.web.body.setImmovable(true);
        this.web.body.setCircle(this.web.body.width*0.3, this.web.body.width*0.2, this.web.body.width*0.15);
        this.web.setScale(scaleX, scaleY);
        this.type = "death";
        group.add(this.web);
    }

    update(){
        
    }


}
