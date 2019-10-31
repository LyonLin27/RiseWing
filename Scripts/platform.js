class Platform {

    constructor(scene, x, y, image){
        if(this.constructor === Platform){
            throw new TypeError('Abstract class "Platform" cannot be instantiated directly')
        }
        this.platform = scene.physics.add.sprite(x, y, image);
        this.platform.body.setAllowGravity(false);
        this.platform.body.setImmovable(true);
        this.platform.body.setFriction(0, 0);
        this.platform.type = "platform";
        this.type = "platform";
    }

    update(time, delta){
        //empty normally
        //some platforms may need an update though
    }

    onCollision(){
        //nothing happens by defaults

    }

    getPlatform(){
        return this.platform;
    }
}
