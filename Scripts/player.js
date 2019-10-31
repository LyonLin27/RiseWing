"use strict"

class Player extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, imageName) {

        super(scene, x, y, imageName);
        this.player = this.scene.physics.add.sprite(x, y, "player");
        this.player.onGround = false;

        this.capSpdYUp = 800;         // cap vertical spd, used for positive and negative
        this.capSpdYDn = 600;
        this.initSpdX = 200;        // set when jumped
        this.thrustSpdY = 800;     // set when jumped
        this.gravity = 500;

        this.maxJump = 1;
        this.remainJump = this.maxJump;

        this.ok2click = true;
        this.clickTimer = 0;

        this.scene = scene;
        this.mouse = this.scene.input.mousePointer;
        this.mouseDownPrev = false;
        this.chargeTime=0;
        this.inAir = true;
        this.airVelX = 0;

        this.player.dead = false;
        this.player.controllable = true;

        this.player.onColl = function(player, platform){
            switch(platform.type){
                case "crumbling":
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
                break;
            }
        }
        this.create();
    }

    create(){
        // just to save some "this..."
        let player = this.player;

        this.CreateAnims();
        this.CreateSounds();

        // event setting
        player.on('animationcomplete', animComplete, this);


        player.play("p_idle0");

        //physics setting
        player.setCollideWorldBounds(true);
        player.body.bounce.set(0);
        //player.body.setFriction(1, 0);
        player.body.gravity.set(0, this.gravity);
        player.body.setSize(player.body.width*7, player.body.height*12);
        //player.body.offset.x = 0;
        player.scale = 0.2;

        this.rect = new Phaser.Geom.Rectangle(player.x-player.width/2, player.y - player.height/2, player.width/8, player.height/8);
        var particlesConfig = {
            x: {min: -100, max: 100},
            y: {min: -100, max: 100},
            emitZone:{
                type: 'random',
                source: this.rect,
            },
            speedX: {min: -100, max: 100, end: 0},
            speedY: {min: -0, max: 100, end: 0},
            gravityY: 100,
            follow: this.player,
            lifespan: 4000,
            blendMode: 'ADD',
            //maxParticles: 100,
            scale: {start: 0.01, end: 0},
            alpha: {start: 1, end: 0},
            on: false,

        };
        var particles = this.scene.add.particles("star");
        this.emitter = particles.createEmitter(particlesConfig);
    }

    update(time, delta){

        // just to save some "this..."
        let ok2release = this.mouseDownPrev;
        let player = this.player;
        player.maxJump = this.maxJump;
        // player input signal
        let movRight = this.mouse.x > this.player.x;
        let release = !this.mouse.isDown;

        let animKey = "";
        let animWingCount = this.maxJump-1;
        if(this.maxJump > 3){
            animWingCount = 3;
        }

        if(this.player.controllable){
            // move the player when the mouse released
            if (release && ok2release && this.remainJump>0) {
                if(this.inAir){
                    this.rect.x = player.x/2;
                    this.rect.y = player.y/2;
                    this.emitter.explode(5*this.remainJump, this.rect.x-this.rect.width/2, this.rect.y-this.rect.height/2);
                    this.jumpSFX.play();
                }
                animKey = "p_jumpS";

                this.inAir = true;

                // decrement jump
                this.remainJump -= 1;

                //X
                if(movRight){
                    player.setVelocityX(this.initSpdX);
                    player.flipX = true;
                }else{
                    player.setVelocityX(-this.initSpdX);
                    player.flipX = false;
                }
                this.airVelX = player.body.velocity.x;

                //Y
                let currVelY = player.body.velocity.y;
                player.setVelocityY(/**currVelY**/-this.thrustSpdY*this.chargeTime/500);

                // reset chargeTIme
                this.chargeTime = 0;

            }else{
                // when on ground x = 0
                if(player.onGround && (player.body.blocked.down || player.body.touching.down)){
                    animKey = "p_idle";
                    if(this.inAir){
                        player.body.velocity.x = 0;
                        this.inAir = false;
                        this.airVelX = 0;
                        this.landSFX.play();
                    }
                    this.remainJump = this.maxJump;
                }else{
                    this.inAir = true;
                    this.player.onGround = false;
                    player.body.velocity.x = this.airVelX;

                    // if rising
                    if(player.body.velocity.y < 0){
                        if(!this.player.anims.currentAnim.key.includes("p_jumpL")){
                            animKey = "p_jumpS";
                        }else{
                            animKey = "p_jumpL";
                        }
                    }else if (player.body.velocity.y > 0){
                        if(!this.player.anims.currentAnim.key.includes("p_fallL")){
                            animKey = "p_fallS";
                        }else{
                            animKey = "p_fallL";
                        }
                    }
                }

                // when mouse down, charge
                if(this.mouse.isDown){
                    if(!this.player.anims.currentAnim.key.includes("p_chargeL")){
                        if(player.body.blocked.down || player.body.touching.down){
                            animKey = "p_chargeS";
                        }else{
                            if(this.remainJump > 0)
                                animKey = "p_airChargeS";
                        }
                    }else{
                        if(player.body.blocked.down || player.body.touching.down){
                            animKey = "p_chargeL";
                        }else{
                            animKey = "p_airChargeL";
                        }
                    }

                    this.chargeTime+=delta;

                    if(this.remainJump > 0){
                        if(movRight){
                            player.flipX = true;
                        }else{
                            player.flipX = false;
                        }
                    }
                }else{
                    this.chargeTime = 0;
                }
            }
        }

        if(!player.dead){
            // cap y spd
            if(player.body.velocity.y > this.capSpdYDn){
                player.setVelocityY(this.capSpdYDn);
            }
            if(player.body.velocity.y < -this.capSpdYUp){
                player.setVelocityY(-this.capSpdYUp);
            }
        }


        this.mouseDownPrev = this.mouse.isDown;

        // update anim
        if(player.anims.currentAnim.key != animKey+animWingCount){
            if(animKey != "")
                player.play(animKey+animWingCount);
        }

        // CHEAT
        // let cheat = this.scene.input.keyboard.addKey("C");
        // if(cheat.isDown){
        //     this.remainJump = this.maxJump;
        // }

        // let reportPos = this.scene.input.keyboard.addKey("R");
        // if(reportPos.isDown){
        //     console.log("Player X: " + player.x + " Player Y: " + this.scene.denormalize(player.y));
        // }

    }

    getBody(){
        return this.player;
    }

    // callback function when player is on platform, sync spd
    SyncSpd(player, platform){
        if(player.body.touching.down && platform.body.touching.up){
            player.body.velocity.x = platform.body.velocity.x;
            player.body.velocity.y = platform.body.velocity.y;
            player.onGround = true;
        }
        player.onColl(player, platform);
    }

    // onCollision(player, platform){
    //
    // }

    // callback function when player touches checkpoint
    SaveProgress(player, checkPoint){
        console.log("Progress Saved !");
        // logic that needs to be done here...
    }

    // callback function when player touches trap
    Death(player, trap){
        console.log("You Died !");
        // play death anim
        // change player position to last checkpoint
        // other logics...
        player.dead = true;
        player.controllable = false;
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;
        player.gravity = 1500;
        player.play("p_death"+(player.maxJump-1));
        player.deathSFX.play();
    }

    Revive(player){
        player.dead = false;
        player.controllable = true;
        player.gravity = 500;
    }

    CreateAnims(){
        // create an animation for the player
        this.scene.anims.create({
            key: "p_idle0",
            frames: this.scene.anims.generateFrameNumbers("player_idle_0"),
            frameRate: 6,
            repeat: -1
        });
        this.scene.anims.create({
            key: "p_chargeS0",
            frames: this.scene.anims.generateFrameNumbers("player_chargeStart_0"),
            frameRate: 6,
            repeat: 0
        });
        this.scene.anims.create({
            key: "p_chargeL0",
            frames: this.scene.anims.generateFrameNumbers("player_chargeLoop_0"),
            frameRate: 6,
            repeat: -1
        });
        this.scene.anims.create({
            key: "p_jumpS0",
            frames: this.scene.anims.generateFrameNumbers("player_jumpStart_0"),
            frameRate: 12,
            repeat: 0
        });
        this.scene.anims.create({
            key: "p_jumpL0",
            frames: this.scene.anims.generateFrameNumbers("player_jumpLoop_0"),
            frameRate: 12,
            repeat: -1
        });
        this.scene.anims.create({
            key: "p_fallS0",
            frames: this.scene.anims.generateFrameNumbers("player_fallStart_0"),
            frameRate: 6,
            repeat: 0
        });
        this.scene.anims.create({
            key: "p_fallL0",
            frames: this.scene.anims.generateFrameNumbers("player_fallLoop_0"),
            frameRate: 6,
            repeat: -1
        });

        // wing 1
        this.scene.anims.create({
            key: "p_idle1",
            frames: this.scene.anims.generateFrameNumbers("player_idle_1"),
            frameRate: 6,
            repeat: -1
        });
        this.scene.anims.create({
            key: "p_chargeS1",
            frames: this.scene.anims.generateFrameNumbers("player_chargeStart_1"),
            frameRate: 6,
            repeat: 0
        });
        this.scene.anims.create({
            key: "p_chargeL1",
            frames: this.scene.anims.generateFrameNumbers("player_chargeLoop_1"),
            frameRate: 6,
            repeat: -1
        });
        this.scene.anims.create({
            key: "p_jumpS1",
            frames: this.scene.anims.generateFrameNumbers("player_jumpStart_1"),
            frameRate: 12,
            repeat: 0
        });
        this.scene.anims.create({
            key: "p_jumpL1",
            frames: this.scene.anims.generateFrameNumbers("player_jumpLoop_1"),
            frameRate: 12,
            repeat: -1
        });
        this.scene.anims.create({
            key: "p_fallS1",
            frames: this.scene.anims.generateFrameNumbers("player_fallStart_1"),
            frameRate: 6,
            repeat: 0
        });
        this.scene.anims.create({
            key: "p_fallL1",
            frames: this.scene.anims.generateFrameNumbers("player_fallLoop_1"),
            frameRate: 6,
            repeat: -1
        });
        this.scene.anims.create({
            key: "p_airChargeS1",
            frames: this.scene.anims.generateFrameNumbers("player_airCharge_1"),
            frameRate: 6,
            repeat: 0
        });
        this.scene.anims.create({
            key: "p_airChargeL1",
            frames: this.scene.anims.generateFrameNumbers("player_airChargeLoop_1"),
            frameRate: 6,
            repeat: 0
        });
        this.scene.anims.create({
            key: "p_death1",
            frames: this.scene.anims.generateFrameNumbers("player_death_1"),
            frameRate: 12,
            repeat: 0
        });

        // wing 2
        this.scene.anims.create({
            key: "p_idle2",
            frames: this.scene.anims.generateFrameNumbers("player_idle_2"),
            frameRate: 6,
            repeat: -1
        });
        this.scene.anims.create({
            key: "p_chargeS2",
            frames: this.scene.anims.generateFrameNumbers("player_chargeStart_2"),
            frameRate: 6,
            repeat: 0
        });
        this.scene.anims.create({
            key: "p_chargeL2",
            frames: this.scene.anims.generateFrameNumbers("player_chargeLoop_2"),
            frameRate: 6,
            repeat: -1
        });
        this.scene.anims.create({
            key: "p_jumpS2",
            frames: this.scene.anims.generateFrameNumbers("player_jumpStart_2"),
            frameRate: 12,
            repeat: 0
        });
        this.scene.anims.create({
            key: "p_jumpL2",
            frames: this.scene.anims.generateFrameNumbers("player_jumpLoop_2"),
            frameRate: 12,
            repeat: -1
        });
        this.scene.anims.create({
            key: "p_fallS2",
            frames: this.scene.anims.generateFrameNumbers("player_fallStart_2"),
            frameRate: 6,
            repeat: 0
        });
        this.scene.anims.create({
            key: "p_fallL2",
            frames: this.scene.anims.generateFrameNumbers("player_fallLoop_2"),
            frameRate: 6,
            repeat: -1
        });
        this.scene.anims.create({
            key: "p_airChargeS2",
            frames: this.scene.anims.generateFrameNumbers("player_airCharge_2"),
            frameRate: 6,
            repeat: 0
        });
        this.scene.anims.create({
            key: "p_airChargeL2",
            frames: this.scene.anims.generateFrameNumbers("player_airChargeLoop_2"),
            frameRate: 6,
            repeat: 0
        });
        this.scene.anims.create({
            key: "p_death2",
            frames: this.scene.anims.generateFrameNumbers("player_death_2"),
            frameRate: 12,
            repeat: 0
        });
        // wing 3
        this.scene.anims.create({
            key: "p_idle3",
            frames: this.scene.anims.generateFrameNumbers("player_idle_3"),
            frameRate: 6,
            repeat: -1
        });
        this.scene.anims.create({
            key: "p_chargeS3",
            frames: this.scene.anims.generateFrameNumbers("player_chargeStart_3"),
            frameRate: 6,
            repeat: 0
        });
        this.scene.anims.create({
            key: "p_chargeL3",
            frames: this.scene.anims.generateFrameNumbers("player_chargeLoop_3"),
            frameRate: 6,
            repeat: -1
        });
        this.scene.anims.create({
            key: "p_jumpS3",
            frames: this.scene.anims.generateFrameNumbers("player_jumpStart_3"),
            frameRate: 12,
            repeat: 0
        });
        this.scene.anims.create({
            key: "p_jumpL3",
            frames: this.scene.anims.generateFrameNumbers("player_jumpLoop_3"),
            frameRate: 12,
            repeat: -1
        });
        this.scene.anims.create({
            key: "p_fallS3",
            frames: this.scene.anims.generateFrameNumbers("player_fallStart_3"),
            frameRate: 6,
            repeat: 0
        });
        this.scene.anims.create({
            key: "p_fallL3",
            frames: this.scene.anims.generateFrameNumbers("player_fallLoop_3"),
            frameRate: 6,
            repeat: -1
        });
        this.scene.anims.create({
            key: "p_airChargeS3",
            frames: this.scene.anims.generateFrameNumbers("player_airCharge_3"),
            frameRate: 6,
            repeat: 0
        });
        this.scene.anims.create({
            key: "p_airChargeL3",
            frames: this.scene.anims.generateFrameNumbers("player_airChargeLoop_3"),
            frameRate: 6,
            repeat: 0
        });
        this.scene.anims.create({
            key: "p_death3",
            frames: this.scene.anims.generateFrameNumbers("player_death_3"),
            frameRate: 12,
            repeat: 0
        });
    }

    CreateSounds(){
        this.deathSFX = this.scene.sound.add("deathSFX");
        this.jumpSFX = this.scene.sound.add("jumpSFX");
        this.landSFX = this.scene.sound.add("landSFX");
        this.player.deathSFX = this.scene.sound.add("deathSFX");
        this.player.jumpSFX = this.scene.sound.add("jumpSFX");
        this.player.landSFX = this.scene.sound.add("landSFX");
    }
}



function animComplete (animation, frame)
{
    let animKey = animation.key;
    let wingCount = animKey.charAt(animKey.length-1);


    if(animKey.includes("p_jumpS")){
        this.player.play("p_jumpL" + wingCount);
    }
    if(animKey.includes("p_chargeS")){
        this.player.play("p_chargeL" + wingCount);
    }
    if(animKey.includes("p_fallS")){
        this.player.play("p_fallL" + wingCount);
    }
}
