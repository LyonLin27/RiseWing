class Left1 extends Platform{

    constructor(scene, x, y){
        super(scene, x, y, 'left1');
        this.create();
    }

    create(){
        this.platform.body.setSize(this.platform.body.width,70);
        this.platform.body.offset.y = 30;
        this.platform.body.offset.x = -20;
    }
}
