// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import direction_crate from "./direction_crate";
import touch_move from "./touch-move";

const {ccclass, property} = cc._decorator;

@ccclass
export default class crate extends cc.Component {
    @property({
        type: touch_move
    })
    touch_move: touch_move = null;

    stepMove = 64;

    ismove_top = false;
    ismove_bottom = false;
    ismove_left = false;
    ismove_right = false;

    protected start(): void {
        this.node.color = cc.Color.WHITE;
    }

    onCollisionEnter(other, self){
        if(other.node.name == 'player'){
            if(this.touch_move.accMove.x < 0){
                this.node.x -= this.stepMove;
            } else if(this.touch_move.accMove.x > 0){
                this.node.x += this.stepMove;
            } else if(this.touch_move.accMove.y < 0){
                this.node.y -= this.stepMove; 
            } else if(this.touch_move.accMove.y > 0){
                this.node.y += this.stepMove;
            }
        }
        if (other.tag == 4){
            this.node.color = cc.Color.RED;
            this.touch_move.crateCr++;
        }
    }

    onCollisionStay(other, self){
        if (other.tag == 4){
            this.node.color = cc.Color.RED;
        }
    }

    onCollisionExit(other, self){
        if (other.tag == 4){
            this.node.color = cc.Color.WHITE;
            this.touch_move.crateCr--;
        }
    }

    protected update(dt: number): void {
        if (this.node.getChildByName('top').getComponent(direction_crate).isTop_block){
            this.ismove_top = false;
        }else{
            this.ismove_top = true;
        }
        if (this.node.getChildByName('bottom').getComponent(direction_crate).isBottom_block){
            this.ismove_bottom = false;
        }else{
            this.ismove_bottom = true;
        }
        if (this.node.getChildByName('right').getComponent(direction_crate).isRight_block){
            this.ismove_right = false;
        }else{
            this.ismove_right = true;
        }
        if (this.node.getChildByName('left').getComponent(direction_crate).isLeft_block){
            this.ismove_left = false;
        }else{
            this.ismove_left = true;
        }
    }

    // update (dt) {}
}
