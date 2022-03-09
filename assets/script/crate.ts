// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import touch_move from "./touch-move";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property({
        type: touch_move
    })
    touch_move: touch_move = null;

    stepMove = 64;

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
    }

    // update (dt) {}
}
