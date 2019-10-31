class Left2 extends Platform{

    constructor(scene, x, y){
        super(scene, x, y, 'left2');
        this.create();
    }

    create(){
        this.platform.body.setSize(this.platform.body.width-10,50);
        this.platform.body.offset.y = 65;
        this.platform.body.offset.x = -20;
    }
}
