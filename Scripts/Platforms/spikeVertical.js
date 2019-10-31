class SpikePlatform extends Platform{

    constructor(scene, x, y, imgName = "spike1", movDir="", spikeGroup, speed = 100, anchorOffsetA, anchorOffsetB){
        super(scene, x, y, imgName);
        this.scene = scene;
        this.imgName = imgName;
        this.speed = speed;
        this.spikeGroup = spikeGroup;

        this.movDir = movDir;
        if(movDir.includes('H')){
            if(!anchorOffsetA) anchorOffsetA = 200;
            if(!anchorOffsetB) anchorOffsetB = 200;
            this.anchorLf = x - anchorOffsetA;
            this.anchorRt = x + anchorOffsetB;
        }
        if(movDir.includes('V')){
            if(!anchorOffsetA) anchorOffsetA = 200;
            if(!anchorOffsetB) anchorOffsetB = 200;
            this.anchorUp = y - anchorOffsetA;
            this.anchorDn = y + anchorOffsetB;
        }

        this.spikes = new Array();
        this.acc = 0.1;
        this.create();
    }

    update(time, delta){
        // sync spd of spikes
        if(this.spikeT){
            this.spikeT.body.position.x = this.platform.body.position.x;
            this.spikeT.body.position.y = this.platform.body.position.y + this.spikeT.body.offset.y;
            this.spikeT.body.velocity.x = this.platform.body.velocity.x;
            this.spikeT.body.velocity.y = this.platform.body.velocity.y;
        }
        if(this.spikeB){
            this.spikeB.body.position.x = this.platform.body.position.x + this.spikeB.body.offset.x;
            this.spikeB.body.position.y = this.platform.body.position.y + this.spikeB.body.offset.y;
            this.spikeB.body.velocity.x = this.platform.body.velocity.x;
            this.spikeB.body.velocity.y = this.platform.body.velocity.y;
        }
        if(this.spikeL){
            this.spikeL.body.position.x = this.platform.body.position.x;
            this.spikeL.body.position.y = this.platform.body.position.y + this.spikeT.body.offset.y;
            this.spikeL.body.velocity.x = this.platform.body.velocity.x;
            this.spikeL.body.velocity.y = this.platform.body.velocity.y;
        }
        if(this.spikeR){
            this.spikeR.body.position.x = this.platform.body.position.x + this.spikeB.body.offset.x;
            this.spikeR.body.position.y = this.platform.body.position.y + this.spikeB.body.offset.y;
            this.spikeR.body.velocity.x = this.platform.body.velocity.x;
            this.spikeR.body.velocity.y = this.platform.body.velocity.y;
        }

        if(this.movDir.includes('H')){
            if(this.platform.body.position.x <= this.anchorLf){
                this.platform.setVelocityX(this.speed);
            } else if(this.platform.body.position.x + this.platform.body.width >= this.anchorRt){
                this.platform.setVelocityX(-this.speed);
            }
        }
        if(this.movDir.includes('V')){
            
            if(this.platform.body.position.y <= this.anchorUp){
                let newVel = this.platform.body.velocity.y;
                newVel += delta*this.acc;
                if(newVel > this.speed) newVel = this.speed;
                this.platform.setVelocityY(newVel);
            } else if(this.platform.body.position.y + this.platform.body.height >= this.anchorDn){
                let newVel = this.platform.body.velocity.y;
                newVel -= delta*this.acc;
                if(newVel < -this.speed) newVel = -this.speed;
                this.platform.setVelocityY(newVel);
            }
        }
    }

    create(){
        console.log(this.imgName);
        switch(this.imgName){
            case "spike1TB":
                this.platform.body.setSize(this.platform.body.width*0.6,70);
                this.platform.body.offset.y = 120;
                break;
            case "spike1T":
                this.platform.body.setSize(this.platform.body.width*0.6,90);
                this.platform.body.offset.y = 140;
                break;
            case "spike1B":
                this.platform.body.setSize(this.platform.body.width*0.6,90);
                this.platform.body.offset.y = 100;
                break;

            case "spike2TB":
                this.platform.body.setSize(this.platform.body.width*0.7,70);
                this.platform.body.offset.y = 120;
                break;
            case "spike2T":
                this.platform.body.setSize(this.platform.body.width*0.7,90);
                this.platform.body.offset.y = 110;
                break;
            case "spike2B":
                this.platform.body.setSize(this.platform.body.width*0.75,90);
                this.platform.body.offset.y = 80;
                break;

            case "spike1LR":
                console.log("hey");
                this.platform.body.setSize(70,this.platform.body.height);
                break;
            case "spike1L":
                this.platform.body.setSize(70,this.platform.body.height);
                break;
            case "spike1R":
                this.platform.body.setSize(70,this.platform.body.height);
                break;

            case "spike2LR":
                this.platform.body.setSize(70,this.platform.body.height);
                break;
            case "spike2L":
                this.platform.body.setSize(70,this.platform.body.height);
                break;
            case "spike2R":
                this.platform.body.setSize(70,this.platform.body.height);
                break;
        }

        // spikes
        if(this.imgName.includes("T")){
            this.spikeT = this.scene.physics.add.sprite(this.platform.body.position.x, this.platform.body.position.y);
            this.spikeT.setOrigin(0.5, 1.0);
            this.spikeT.body.setSize(this.platform.body.width, 50);
            this.spikeT.body.offset.y = -30;
            this.spikeT.body.setAllowGravity(false);
            this.spikeT.body.setImmovable(true);
            this.spikeGroup.add(this.spikeT);
        }

        if(this.imgName.includes("B")){
            let widthRatio = 0.8;
            this.spikeB = this.scene.physics.add.sprite(this.platform.body.position.x, this.platform.body.position.y);
            this.spikeB.setOrigin(0.5, 0.0);
            this.spikeB.body.setSize(this.platform.body.width*widthRatio, 50);
            this.spikeB.body.offset.x = this.platform.body.width*(1-widthRatio)/2;
            this.spikeB.body.offset.y = 60;
            this.spikeT.body.setAllowGravity(false);
            this.spikeT.body.setImmovable(true);
            this.spikeGroup.add(this.spikeB);
        }

        if(this.imgName.includes("L")){
            let heightRatio = 0.8;
            this.spikeL = this.scene.physics.add.sprite(this.platform.body.position.x, this.platform.body.position.y);
            this.spikeL.setOrigin(1.0, 0.5);
            this.spikeL.body.setSize(50, this.platform.body.height*heightRatio);
            this.spikeL.body.offset.x = 0;
            this.spikeL.body.offset.y = this.platform.body.height*(1-heightRatio)/2;
            this.spikeL.body.setAllowGravity(false);
            this.spikeL.body.setImmovable(true);
            this.spikeGroup.add(this.spikeL);
        }

        if(this.imgName.includes("R")){
            let heightRatio = 0.8;
            this.spikeR = this.scene.physics.add.sprite(this.platform.body.position.x, this.platform.body.position.y);
            this.spikeR.setOrigin(0.0, 0.5);
            this.spikeR.body.setSize(50, this.platform.body.height*heightRatio);
            this.spikeR.body.offset.x = 0;
            this.spikeR.body.offset.y = this.platform.body.height*(1-heightRatio)/2;
            this.spikeR.body.setAllowGravity(false);
            this.spikeR.body.setImmovable(true);
            this.spikeGroup.add(this.spikeR);
        }



        // start moving
        if(this.movDir.includes('H')){
            this.platform.setVelocityX(this.speed);
        }
        if(this.movDir.includes('V')){
            this.platform.setVelocityY(this.speed);
        }
    }

}
