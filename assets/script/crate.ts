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

    isCol_top = false;
    isCol_bottom = false;
    isCol_right = false;
    isCol_left = false;

    ismove_top = false;
    ismove_bottom = false;
    ismove_left = false;
    ismove_right = false;

    isAction = false;


    protected start(): void {
        this.node.color = cc.Color.WHITE;
    }

    onCollisionEnter(other, self){
        // if (other.tag == 3){
        //     // this.isAction = true;
        //     if (other.node.name == 'bottom'){
        //         this.isCol_bottom = true;
        //     }
        //     if (other.node.name == 'top'){
        //         this.isCol_top = true;
        //     }
        //     if (other.node.name == 'left'){
        //         this.isCol_left = true;
        //     }
        //     if (other.node.name == 'right'){
        //         this.isCol_right = true;
        //     }
        // }

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
        // cc.log(other.tag);
        // cc.log(other.node.name);
        
    }

    onCollisionStay(other, self){
        if (other.tag == 4){
            this.node.color = cc.Color.RED;
        }
    }

    onCollisionExit(other, self){
        // if (other.tag == 3){
        //     // this.isAction = false;
        //     if (other.node.name == 'bottom'){
        //         this.isCol_bottom = false;
        //     }
        //     if (other.node.name == 'top'){
        //         this.isCol_top = false;
        //     }
        //     if (other.node.name == 'left'){
        //         this.isCol_left = false;
        //     }
        //     if (other.node.name == 'right'){
        //         this.isCol_right = false;
        //     }
        // }

        if (other.tag == 4){
            this.node.color = cc.Color.WHITE;
            this.touch_move.crateCr--;
        }
    }

    protected update(dt: number): void {
        // if(this.isAction){
            if (this.node.getChildByName('top').getComponent(direction_crate).isTop_block){
                this.ismove_top = false;
                // cc.log('false');
            }else{
                this.ismove_top = true;
                // cc.log('true');
            }
            if (this.node.getChildByName('bottom').getComponent(direction_crate).isBottom_block){
                this.ismove_bottom = false;
                // cc.log('false');
            }else{
                this.ismove_bottom = true;
                // cc.log('true');
            }
            if (this.node.getChildByName('right').getComponent(direction_crate).isRight_block){
                this.ismove_right = false;
                // cc.log('false');
            }else{
                this.ismove_right = true;
                // cc.log('true');
            }
            if (this.node.getChildByName('left').getComponent(direction_crate).isLeft_block){
                this.ismove_left = false;
                // cc.log('false');
            }else{
                this.ismove_left = true;
                // cc.log('true');
        //     }
        // }
        // else {
        //     // this.touch_move.ismove_top = true;
  
            // this.touch_move.ismove_bottom = true;
            // this.touch_move.ismove_right = true;

            // this.touch_move.ismove_left = true;
 
        }
    }

    // update (dt) {}
}
