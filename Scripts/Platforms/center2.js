class Center2 extends Platform{

    constructor(scene, x, y){
        super(scene, x, y, 'center2');
        this.create();
    }

    create(){
        this.platform.body.setSize(this.platform.body.width-90,70);
        this.platform.body.offset.y = 4;
        this.platform.body.offset.x = 20;
    }
}
