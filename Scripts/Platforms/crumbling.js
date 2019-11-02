class Crumbling extends Platform{

    constructor(scene, x, y, imgName = "crumbling_platform", timeTillBreak = 3000, timeTillRespawn = 7000){
        super(scene, x, y, imgName);
        this.platform.scene = scene;
        this.imgName = imgName;
        this.platform.timeTillBreak = timeTillBreak;
        this.platform.timeTillRespawn = timeTillRespawn;
        this.platform.tarAlpha = 1;
        this.acc = 0.1;
        this.breaking = false;
        this.platform.type = "crumbling";
        this.platform.breaking = false;

        this.platform.onColl = function(platform, player){
            if(player.isPlayer){
                if(!platform.breaking && platform.body.position.y > player.body.position.y){
                    platform.breaking = true;
                    platform.play("shaking");
                    setTimeout(() => {
                        //remove platform, do animation
                        //platform.disableBody(true, false);
                        platform.body.enable = false;
                        platform.play("breaking");
                        setTimeout(() => {
                            platform.play("respawning");
                            platform.enableBody(true, platform.x, platform.y, true, true);
                            platform.breaking = false;
                        }, platform.timeTillRespawn); // platform respawn time
                    }, platform.timeTillBreak);
                }
            }
        }

        this.create();
    }

    update(time, delta){
        // if(tarAlpha > this.platform.alpha){
        //     this.platform.alpha
        // }
    }

    create(){
        this.createAnims();

        switch(this.imgName){
            case "center1":
                this.platform.body.setSize(this.platform.body.width,70);
                this.platform.body.offset.y = 0;
                break;
            case "center2":
                this.platform.body.setSize(this.platform.body.width-70,70);
                this.platform.body.offset.y = 0;
                this.platform.body.offset.x = 15;
                break;
            case "center3":
                this.platform.body.setSize(this.platform.body.width,70);
                this.platform.body.offset.y = 0;
                break;
            case "center4":
                this.platform.body.setSize(this.platform.body.width,70);
                this.platform.body.offset.y = 0;
                break;
            case "center5":
                this.platform.body.setSize(this.platform.body.width,70);
                this.platform.body.offset.y = 20;
                break;
            case "center6":
                this.platform.body.setSize(this.platform.body.width-90,70);
                this.platform.body.offset.y = 0;
                this.platform.body.offset.x = 0;
                break;
            case "crumbling_platform":
                this.platform.body.setSize(this.platform.body.width-580, 70);
                this.platform.body.offset.y = 100;
                this.platform.body.offset.x = 250;
                break;
        }
    }

    createAnims(){
        this.platform.scene.anims.create({
            key: "shaking",
            frames: this.platform.scene.anims.generateFrameNumbers("crumbling_shake"),
            frameRate: 12,
            repeat: -1
        });

        this.platform.scene.anims.create({
            key: "breaking",
            frames: this.platform.scene.anims.generateFrameNumbers("crumbling_break"),
            frameRate: 12,
            repeat: 0
        });

        this.platform.scene.anims.create({
            key: "respawning",
            frames: this.platform.scene.anims.generateFrameNumbers("crumbling_respawn"),
            frameRate: 6,
            repeat: 0
        });

    }

}
