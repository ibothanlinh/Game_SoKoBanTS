// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import crate_mng from "./crate_mng";

const {ccclass, property} = cc._decorator;

@ccclass
export default class direction_player extends cc.Component {
    @property({
        type: cc.Node
    })
    player: cc.Node = null;

    // crate_mng: crate_mng = null;
    // stepMove = 64;

    isTop_block = false;
    isBottom_block = false;
    isLeft_block = false;
    isRight_block = false;

    isTop_crate = false;
    isBottom_crate = false;
    isLeft_crate = false;
    isRight_crate = false;

    // ArrMovableCrate = [];
    onCollisionEnter(other, self){
        // cc.log('other',other);
        // cc.log('seft',self);
        if (other.node.name == 'block'){
            if (self.node.name == 'top'){
                this.isTop_block = true;
                // cc.log('on top');
            }
            if (self.node.name == 'bottom'){
                this.isBottom_block = true;
                // cc.log('on bottom');
            }
            if (self.node.name == 'right'){
                this.isRight_block = true;
                // cc.log('on right');
            }
            if (self.node.name == 'left'){
                this.isLeft_block = true;
                // cc.log('on left');
            }
        }
        // if (other.tag == 2){
        //     // let posCrate = other.node.parent.getChildByName(other.node.name).position;
        //     // let posWorld = other.node.parent.convertToWorldSpaceAR(posCrate);

        //     // cc.log(posCrate);
        //     // cc.log(posWorld);
            
        //     // this.ArrMovableCrate.push(other.node);
        //     // cc.log(other);
        //     if (self.node.name == 'top'){
        //         // other.node.position.y += this.stepMove;
        //         this.isTop_crate = true;
        //         // cc.log('on top');
        //     }
        //     if (self.node.name == 'bottom'){
        //         // other.node.position.y -= this.stepMove;
        //         this.isBottom_crate = true;
        //         // cc.log('on bottom');
        //     }
        //     if (self.node.name == 'right'){
        //         // other.node.setPosition(other.node.position.x + this.stepMove,0) += this.stepMove;
        //         this.isRight_crate = true;
        //         // cc.log('on right');
        //     }
        //     if (self.node.name == 'left'){
        //         // other.node.position.x -= this.stepMove;
        //         this.isLeft_crate = true;
        //         // cc.log('on left');
        //     }
        // }
    }

    onCollisionExit(other, self){
        // cc.log('exit');
        // cc.log(other.node.name);
        // cc.log(self.node.name);
        if (other.node.name == 'block'){
            if (self.node.name == 'top'){
                this.isTop_block = false;
                // cc.log('off top');
            }
            if (self.node.name == 'bottom'){
                this.isBottom_block = false;
                // cc.log('off bottom');
            }
            if (self.node.name == 'right'){
                this.isRight_block = false;
                // cc.log('off right');
            }
            if (self.node.name == 'left'){
                this.isLeft_block = false;
                // cc.log('off left');
            }
        }
        // if (other.node.tag == 2){
        //     this.ArrMovableCrate = null;
        // }
    }

    // update (dt) {}
}
