// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import direction_player from "./direction_player";
import touch_move from "./touch-move";

const {ccclass, property} = cc._decorator;

@ccclass
export default class player extends cc.Component {
    
    ismove_top = false;
    ismove_bottom = false;
    ismove_left = false;
    ismove_right = false;

    top = null;
    bottom = null;
    left = null;
    right = null;
    // @property
    // distanceToTitle = 10;
    nameCrate = '';

    protected start(): void {
        this.ismove_bottom = true;
        this.ismove_top = true;
        this.ismove_left = true;
        this.ismove_right = true;

        this.top = this.node.getChildByName('top');
        this.bottom = this.node.getChildByName('bottom');
        this.left = this.node.getChildByName('left');
        this.right = this.node.getChildByName('right');
    }

    protected onLoad(): void {
        cc.director.getCollisionManager().enabled = true;
    }

    protected update(dt: number): void {
        // cc.log(dt);
        if (this.top.getComponent(direction_player).isTop_block){
            this.ismove_top = false;
        }else{
            this.ismove_top = true;
        }
        if (this.bottom.getComponent(direction_player).isBottom_block){
            this.ismove_bottom = false;
        }else{
            this.ismove_bottom = true;
        }
        if (this.right.getComponent(direction_player).isRight_block){
            this.ismove_right = false;
        }else{
            this.ismove_right = true;
        }
        if (this.left.getComponent(direction_player).isLeft_block){
            this.ismove_left = false;
        }else{
            this.ismove_left = true;
        }        
    }
}


