class Right2 extends Platform{

    constructor(scene, x, y){
        super(scene, x, y, 'right2');
        this.create();
    }

    create(){
        this.platform.body.setSize(this.platform.body.width,50);
        this.platform.body.offset.y = 28;
        this.platform.body.offset.x = 10;
    }
}
