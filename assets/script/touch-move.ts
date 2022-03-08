// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import player from "./player";

const {ccclass, property} = cc._decorator;

@ccclass
export default class touch_move extends cc.Component {
    @property({
        type: cc.Node
    })
    player: cc.Node = null;
    @property({
        type: player
    })
    player_class: player = null;


    stepMove = 64;
    accMove = cc.v2(0,0);


    protected start(): void {
        this.node.on('touchmove', (move) =>{
            let delta = move.getDelta();
            this.accMove = delta;
            // cc.log('start pos: ', delta.x, delta.y);
        }, this)
        this.node.on('touchend', (e) => {
            let delta = e.getDelta();
            // cc.log('end pos: ',delta.x, delta.y);
            // cc.log(this.player.x)
            if(this.accMove.x < 0 && this.player_class.ismove_left){
                this.player.x -= this.stepMove;
            } else if(this.accMove.x > 0 && this.player_class.ismove_right){
                this.player.x += this.stepMove;
            } else if(this.accMove.y < 0 && this.player_class.ismove_bottom){
                this.player.y -= this.stepMove;
            } else if(this.accMove.y > 0 && this.player_class.ismove_top){
                this.player.y += this.stepMove
            }
        }, this)
        
    }

    // update (dt) {}
}
