class Center1 extends Platform{

    constructor(scene, x, y){
        super(scene, x, y, 'center1');
        this.create();
    }

    create(){
        //reset body size if needed here
        this.platform.body.setSize(this.platform.body.width*0.8,70);
        this.platform.body.offset.y = 0;
        this.platform.body.offset.x = 20;
    }
}
