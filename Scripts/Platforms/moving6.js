class Moving6 extends Platform{

    constructor(scene, x, y, speed, anchorLeft, anchorRight){
        super(scene, x, y, 'center6');
        this.speed = speed;
        this.anchorLeft = anchorLeft;
        this.anchorRight = anchorRight;
        this.create();
    }

    update(time, delta){
        //move until collide with something, then switch direction
        if(this.platform.body.velocity.x == 0){
            this.platform.setVelocityX(this.speed);
        }
        if(this.platform.body.position.x <= this.anchorLeft){
            this.platform.setVelocityX(this.speed);
        } else if(this.platform.body.position.x + this.platform.body.width >= this.anchorRight){
            this.platform.setVelocityX(-this.speed);
        }
    }

    create(){
        this.platform.body.setSize(this.platform.body.width-90,70);
        this.platform.body.offset.y = 0;
        this.platform.body.offset.x = 0;
    }
}
