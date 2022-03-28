// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
@ccclass
export default class NewClass extends cc.Component {
    @property({
        type: cc.Prefab
    })
    player: cc.Prefab = null;

    @property({
        type: cc.Prefab
    })
    title: cc.Prefab = null;
    @property({
        type: cc.Prefab
    })
    crate: cc.Prefab = null;
    @property({
        type: cc.Prefab
    })
    coin: cc.Prefab = null;
    @property({
        type: cc.Prefab
    })
    ground: cc.Prefab = null;

    PLAYER = {
        col: 0,
        row: 0
    }
    NON = 0
    TITLE = 1;
    WALL = 2;
    CRATE = 4;
    COIN = 3;

    stepMove = 64;
    totalLevel = 0;
    levelArr = [];
    levelCrr = {};
    rowMatrix = 0;
    colMatrix = 0;
    MatrixCrr = [];
    boxMatrix = null;
    nodeArr = [];

    getMatrixFromJson(){
        this.rowMatrix = this.levelCrr['allRow'];
        this.colMatrix = this.levelCrr['allCol'];
        this.MatrixCrr = this.levelCrr['content'];

        this.boxMatrix = new cc.Node('box');
        this.boxMatrix.setContentSize(this.rowMatrix*this.stepMove,this.colMatrix*this.stepMove);
        this.node.addChild(this.boxMatrix);
        // this.boxMatrix.
        // this.boxMatrix.contentSize.width = 50;
        cc.log(this.rowMatrix);
        cc.log(this.MatrixCrr);
        cc.log(this.boxMatrix.getContentSize());

    }

    checkBlock(){
        for (var key_row = 0; key_row < this.rowMatrix; key_row++) {
            for(var key_col = 0; key_col < this.colMatrix; key_col++){
                if(this.MatrixCrr[key_col] == this.NON){
                    let node = new cc.Node('non');
                    cc.log('node: ',node);
                    node.setContentSize(this.stepMove,this.stepMove);
                    return node;
                } else if(this.MatrixCrr[key_col] == this.COIN){
                    return cc.instantiate(this.coin);
                } else if(this.MatrixCrr[key_col] == this.CRATE){
                    return cc.instantiate(this.crate);
                } else if(this.MatrixCrr[key_col] == this.TITLE){
                    return cc.instantiate(this.title);
                } else if(this.MatrixCrr[key_col] == this.WALL){
                    return cc.instantiate(this.ground);
                }
            }
        }
    }

    setFirstPosition(){
        // let node = this.checkBlock();
        // cc.log(node);
        this.nodeArr.push(cc.instantiate(this.crate));
        cc.log(this.nodeArr[0]);
        this.nodeArr[0].setPosition(-(this.boxMatrix.getContentSize().width/2 - this.nodeArr[0].getContentSize().width/2),
                        this.boxMatrix.getContentSize().height/2 - this.nodeArr[0].getContentSize().height/2);
        this.boxMatrix.addChild(this.nodeArr[0]);
        cc.log('node: ', this.nodeArr[0].name);
        cc.log('node position: ', this.nodeArr[0].getPosition());

    }

    setMap(){
        this.setFirstPosition();
    }

    protected onLoad(): void {
        cc.resources.load('levelConfig', cc.JsonAsset, (err, asset: cc.JsonAsset) =>{
            if(err){
                cc.log(err);
                return;
            }

            this.levelArr = Object.keys(asset.json.level);
            this.totalLevel = asset.json.level;
            this.levelCrr = this.totalLevel['1'];
            cc.log(this.levelArr);
            cc.log(this.totalLevel['1']);
            this.getMatrixFromJson();
            this.setMap();
        })
    }

    // update (dt) {}
}
