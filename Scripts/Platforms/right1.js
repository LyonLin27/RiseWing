class Right1 extends Platform{

    constructor(scene, x, y){
        super(scene, x, y, 'right1');
        this.create();
    }

    create(){
        this.platform.body.setSize(this.platform.body.width,60);
        this.platform.body.offset.y = 15;
        this.platform.body.offset.x = 5;
    }
}
