// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class direction extends cc.Component {
    isTop_block = false;
    isBottom_block = false;
    isLeft_block = false;
    isRight_block = false;

    onCollisionEnter(other, self){
        // cc.log(other.node.name);
        // cc.log(self.node.name);
      if (other.node.name == 'block'){
            if (self.node.name == 'top'){
                this.isTop_block = true;
                cc.log('on top');
            }
            if (self.node.name == 'bottom'){
                this.isBottom_block = true;
                cc.log('on bottom');
            }
            if (self.node.name == 'right'){
                this.isRight_block = true;
                cc.log('on right');
            }
            if (self.node.name == 'left'){
                this.isLeft_block = true;
                cc.log('on left');
            }
        }
    }

    onCollisionExit(other, self){
        // cc.log('exit');
        // cc.log(other.node.name);
        // cc.log(self.node.name);
        if (other.node.name == 'block'){
            if (self.node.name == 'top'){
                this.isTop_block = false;
                cc.log('off top');
            }
            if (self.node.name == 'bottom'){
                this.isBottom_block = false;
                cc.log('off bottom');
            }
            if (self.node.name == 'right'){
                this.isRight_block = false;
                cc.log('off right');
            }
            if (self.node.name == 'left'){
                this.isLeft_block = false;
                cc.log('off left');
            }
        }
    }

    // update (dt) {}
}
