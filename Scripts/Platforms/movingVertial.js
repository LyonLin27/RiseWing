class MovingV extends Platform{

    constructor(scene, x, y, imgName = "center5", speed = 100, anchorOffsetUp, anchorOffsetDn, firstUp){
        super(scene, x, y, imgName);
        this.imgName = imgName;
        this.speed = speed;
        if(!anchorOffsetUp) anchorOffsetUp = 200;
        if(!anchorOffsetDn) anchorOffsetDn = 200;
        this.anchorUp = y - anchorOffsetUp;
        this.anchorDn = y + anchorOffsetDn;

        if(firstUp)
            this.firstUp = true;
        else
            this.firstUp  = false;

        this.acc = 0.1;
        this.create();
    }

    update(time, delta){
        //move until collide with something, then switch direction
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

    create(){
        switch(this.imgName){
            case "center1":
                this.platform.body.setSize(this.platform.body.width*0.8,70);
                this.platform.body.offset.y = 0;
                this.platform.body.offset.x = 20;
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
        }
        // start moving
        if(this.firstUp)
            this.platform.setVelocityY(-this.speed);
        else
            this.platform.setVelocityY(this.speed);
    }

}
