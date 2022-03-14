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
    isTop_block = false;
    isBottom_block = false;
    isLeft_block = false;
    isRight_block = false;

    nameCrate = '';
    nameDir = '';
    tag = undefined;
    onCollisionEnter(other, self){
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
        if (other.tag == 2){
            this.nameCrate = other.node.name;
            this.nameDir = self.node.name;
            this.tag = 2;

        }
    }

    onCollisionStay(other, self){
        if (other.tag == 2){
            this.nameCrate = other.node.name;
            this.nameDir = self.node.name;
            this.tag = 2;

        }
    }

    onCollisionExit(other, self){
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
        if (other.tag == 2){ 
            this.nameCrate = '';
            this.tag = 2;
        }
    }

    // update (dt) {}
}
