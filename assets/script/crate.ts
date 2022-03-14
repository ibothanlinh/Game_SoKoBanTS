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
    touch_move: touch_move;

    stepMove = 64;

    ismove_top = false;
    ismove_bottom = false;
    ismove_left = false;
    ismove_right = false;

    isColTop = false;
    isColBottom = false;
    isColLeft = false;
    isColRight = false;

    game = null;

    init(game){
        // cc.log(this.node.name);
        this.game = game;
    }

    protected start(): void {
        this.node.color = cc.Color.WHITE;
    }

    onCollisionEnter(other, self){
        
        
       if(self.node.name == this.node.name){
        if(other.node.name == 'player'){
            // cc.log(self.node.name);
            if(this.touch_move.accMove.x < 0 && this.ismove_left){
                this.node.x -= this.stepMove;
            } else if(this.touch_move.accMove.x > 0 && this.ismove_right){
                this.node.x += this.stepMove;
            } else if(this.touch_move.accMove.y < 0 && this.ismove_bottom){
                this.node.y -= this.stepMove; 
            } else if(this.touch_move.accMove.y > 0 && this.ismove_top){
                this.node.y += this.stepMove;
            }
        }
        if (other.tag == 3){
            // this.game.nameCrateCol.push(self.node.name);
            if(other.node.name == 'top'){
                this.isColTop = true;
            } else if(other.node.name == 'bottom'){
                this.isColBottom = true;
            } else if(other.node.name == 'left'){
                this.isColLeft = true;
            } else if(other.node.name == 'right'){
                this.isColRight = true;
            }
        }
        
        if (other.tag == 4){
            this.node.color = cc.Color.RED;
            this.touch_move.crateCr++;
        }
       }
    }

    onCollisionStay(other, self){
        if(self.node.name == this.node.name){
            if (other.tag == 4){
                this.node.color = cc.Color.RED;
            }
            if(other.node.name == 'top' && other.tag == 3){
                this.isColTop = true;
            } else if(other.node.name == 'bottom' && other.tag == 3){
                this.isColBottom = true;
            } else if(other.node.name == 'left' && other.tag == 3){
                this.isColLeft = true;
            } else if(other.node.name == 'right' && other.tag == 3){
                this.isColRight = true;
            }
        }
       
    }

    onCollisionExit(other, self){
        if(self.node.name == this.node.name){
            if (other.tag == 4){
                this.node.color = cc.Color.WHITE;
                this.touch_move.crateCr--;
            }
            if(other.node.name == 'top' && other.tag == 3){
                this.isColTop = false;
            } else if(other.node.name == 'bottom' && other.tag == 3){
                this.isColBottom = false;
            } else if(other.node.name == 'left' && other.tag == 3){
                this.isColLeft = false;
            } else if(other.node.name == 'right' && other.tag == 3){
                this.isColRight = false;
            }
    
        }
       
    }

    protected update(dt: number): void {
        if (this.node.getChildByName('top').getComponent(direction_crate).isTop_block ){
            this.ismove_top = false;
            // this.game.isMoveTop = false;
        }else{
            this.ismove_top = true;
            // this.game.isMoveTop = true;
        }
        if (this.node.getChildByName('bottom').getComponent(direction_crate).isBottom_block){
            this.ismove_bottom = false;
            // this.game.isMoveBottom = false;
        }else{
            this.ismove_bottom = true;
            // this.game.isMoveBottom = true;
        }
        if (this.node.getChildByName('right').getComponent(direction_crate).isRight_block ){
            this.ismove_right = false;
            // this.game.isMoveRight = false;
        }else{
            this.ismove_right = true;
            // this.game.isMoveRight = true;
        }
        if (this.node.getChildByName('left').getComponent(direction_crate).isLeft_block){
            this.ismove_left = false;
            // this.game.isMoveLeft = false;
        }else{
            this.ismove_left = true;
            // this.game.isMoveLeft = true;
        }
    }

    // update (dt) {}
}
