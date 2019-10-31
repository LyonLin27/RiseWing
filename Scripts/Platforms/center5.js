class Center5 extends Platform{

    constructor(scene, x, y){
        super(scene, x, y, 'center5');
        this.create();
    }

    create(){
        this.platform.body.setSize(this.platform.body.width*0.9,70);
        this.platform.body.offset.y = 20;
        this.platform.body.offset.x = 10;
    }
}
