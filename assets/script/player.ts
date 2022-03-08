// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import direction from "./direction";

const {ccclass, property} = cc._decorator;

@ccclass
export default class player extends cc.Component {
    ismove_top = false;
    ismove_bottom = false;
    ismove_left = false;
    ismove_right = false;
    @property
    distanceToTitle = 10;

    protected start(): void {
        this.ismove_bottom = true;
        this.ismove_top = true;
        this.ismove_left = true;
        this.ismove_right = true;
    }

    protected onLoad(): void {
        cc.director.getCollisionManager().enabled = true;
    }
    onCollisionEnter(other, self){
          cc.log(other.node.name);
          cc.log(self.node.name);
        // if(other.node.name == 'block'){
        //     this.ismove = false;
        // }
    }

    protected update(dt: number): void {
        if (this.node.getChildByName('top').getComponent(direction).isTop_block){
            this.ismove_top = false;
        }else{
            this.ismove_top = true;
        }
        if (this.node.getChildByName('bottom').getComponent(direction).isBottom_block){
            this.ismove_bottom = false;
        }else{
            this.ismove_bottom = true;
        }
        if (this.node.getChildByName('right').getComponent(direction).isRight_block){
            this.ismove_right = false;
        }else{
            this.ismove_right = true;
        }
        if (this.node.getChildByName('left').getComponent(direction).isLeft_block){
            this.ismove_left = false;
        }else{
            this.ismove_left = true;
        }
    }
}


