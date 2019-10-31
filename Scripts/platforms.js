"use strict";
/*
Manaeges all the platform objects that are created, adds them to the group
as they get constructed,removes as destructed
*/
class Platforms{
    //build/add all static platforms to the level
    //level is just some number indicating what level to spawn.

    constructor(scene, level){
        this.scene = scene;
        this.level = level;


        switch(level){
            case 1:
                this.createLevel1();
                break;
        }
    }

    createLevel1(){
        //spawn in level 1
        let test = this.platforms.create(600, 2400, 'center1').setScale(.25).refreshBody();
        test.body.setSize(100, 500);
        test.refreshBody();
        this.platforms.create(900, 2000, 'ground');
        this.platforms.create(50, 1800, 'ground');
        this.platforms.create(750, 1400, 'ground');
        this.platforms = this.scene.physics.add.staticGroup();
    }

    getPlatforms(){
        return this.platforms;
    }
}
