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
    @property({
        type: cc.Node
    })
    Score: cc.Node = null;
    @property({
        type: cc.Prefab
    })
    popup_win: cc.Prefab = null;

    stepMove = 64;
    accMove = cc.v2(0,0);

    isCrate = false;
    keyCrate = '';
    crateLenght = 0;
    crateMax = 0;
    crateCr = 0;

    moveArr = [];


    protected start(): void {
        this.crateLenght = this.crate_mng.children.length;
        this.crateMax = this.crateLenght;

        this.node.on('touchmove', (move) =>{
            let delta = move.getDelta();
            // this.accMove = delta;
            this.moveArr.push(delta);
            cc.log('start pos: ', delta.x, delta.y);

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
                if (this.player_class.nameCrate == this.crate_mng.children[key].name){
                    this.keyCrate = key;
                    this.isCrate = true;
                    break;
                }
                this.isCrate = false;
            }

        }, this)

        this.node.on('touchend', (e) => {
            cc.log(this.moveArr);
            // cc.log('max x: ',Math.max(...this.moveArrX));
            // cc.log('y: ', this.moveArrY);
            // cc.log('max y: ',Math.max(...this.moveArrY));

            this.accMove = this.moveArr[Math.floor((this.moveArr.length-1)/2)];
            this.moveArr.splice(0,this.moveArr.length-1);

            if (Math.abs(this.accMove.x) > Math.abs(this.accMove.y)){
                this.accMove.y = 0;
            }
            else {
                this.accMove.x = 0;
            }
            cc.log(this.accMove.x, this.accMove.y);
        
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
        this.Score.getChildByName("score_cr").getComponent(cc.Label).string = `${this.crateMax}/${this.crateCr}`;
        if(this.crateMax == this.crateCr){
            let popup = cc.instantiate(this.popup_win);
            this.node.addChild(popup);
        }
    }
    
}
