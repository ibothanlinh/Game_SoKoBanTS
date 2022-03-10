// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import player from "./player";
import crate from "./crate";
import crate_mng from "./crate_mng";
import direction_player from "./direction_player";

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
    @property({
        type: cc.Node
    })
    crate_mng: cc.Node = null;
    // @property({
    //     type: crate
    // })
    // crate: crate = null;

    stepMove = 64;
    accMove = cc.v2(0,0);

    ismove_top = false;
    ismove_bottom = false;
    ismove_left = false;
    ismove_right = false;

    isCrate = false;
    keyCrate = '';

    protected onLoad(): void {
        // this.node.getComponent(player).touch_move = this;
    }


    protected start(): void {

        // this.ismove_bottom = true;
        // this.ismove_top = true;
        // this.ismove_left = true;
        // this.ismove_right = true;

        this.node.on('touchmove', (move) =>{
            let delta = move.getDelta();
            this.accMove = delta;
            // cc.log('start pos: ', delta.x, delta.y);

            if(this.accMove.y > 0){
                this.player_class.nameCrate = this.player_class.top.getComponent(direction_player).nameCrate;
            } else if(this.accMove.y < 0){
                this.player_class.nameCrate = this.player_class.bottom.getComponent(direction_player).nameCrate;
            } else if(this.accMove.x > 0){
                this.player_class.nameCrate = this.player_class.right.getComponent(direction_player).nameCrate;
            } else if(this.accMove.x < 0){
                this.player_class.nameCrate = this.player_class.left.getComponent(direction_player).nameCrate;
            }

            for (const key in this.crate_mng.children) {
                // cc.log(key);
                // cc.log(this.player_class.nameCrate );
                if (this.player_class.nameCrate == this.crate_mng.children[key].name){
                    // this.crate_mng.children[key].getComponent(crate).isAction = true;
                    this.keyCrate = key;
                    this.isCrate = true;
                    break;
                    // cc.log(' ',this.crate_mng.children[key].name);
                    // cc.log('21', this.player_class.nameCrate)
                }
                // 
                    // this.crate_mng.children[key].getComponent(crate).isAction = false;
                    this.isCrate = false;
                    // this.ismove_top = true;
                    // this.ismove_bottom = true;
                    // this.ismove_left = true;
                    // this.ismove_right = true;
                    // cc.log('ko dung');
            }

        }, this)
        this.node.on('touchend', (e) => {
            let delta = e.getDelta();

            if (Math.abs(this.accMove.x) > Math.abs(this.accMove.y)){
                this.accMove.y = 0;
            }
            else {
                this.accMove.x = 0;
            }
            // cc.log('end pos: ',delta.x, delta.y);
            // cc.log(this.player.x)
            // cc.log(this.ismove_bottom);
            // cc.log(this.ismove_top);
            // cc.log(this.ismove_left);
            // cc.log(this.ismove_right);
            // cc.log(this.crate_mng.children);
           
            if (this.isCrate){
                if(this.accMove.x < 0 && this.player_class.ismove_left &&
                    this.crate_mng.children[this.keyCrate].getComponent(crate).ismove_left){
                    this.player.x -= this.stepMove;
                } else if(this.accMove.x > 0 && this.player_class.ismove_right &&
                    this.crate_mng.children[this.keyCrate].getComponent(crate).ismove_right){
                    this.player.x += this.stepMove;
                } else if(this.accMove.y < 0 && this.player_class.ismove_bottom &&
                    this.crate_mng.children[this.keyCrate].getComponent(crate).ismove_bottom){
                    this.player.y -= this.stepMove;
                } else if(this.accMove.y > 0 && this.player_class.ismove_top &&
                    this.crate_mng.children[this.keyCrate].getComponent(crate).ismove_top){
                    this.player.y += this.stepMove
                }
            }
            else {
                if(this.accMove.x < 0 && this.player_class.ismove_left){
                    this.player.x -= this.stepMove;
                } else if(this.accMove.x > 0 && this.player_class.ismove_right){
                    this.player.x += this.stepMove;
                } else if(this.accMove.y < 0 && this.player_class.ismove_bottom){
                    this.player.y -= this.stepMove;
                } else if(this.accMove.y > 0 && this.player_class.ismove_top){
                    this.player.y += this.stepMove
                }
            }
        }, this)
        
    }

    update (dt) {
        
    }
}
