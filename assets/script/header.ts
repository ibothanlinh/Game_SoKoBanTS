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
        type: cc.AudioClip
    })
    audioClick = null;
    @property({
        type: cc.Node
    })
    restartButton: cc.Node = null;
    @property({
        type: cc.Node
    })
    hometButton: cc.Node = null;

    actionScaleRestart = null;
    actionScaleHome = null;

    onButtonHome(){
        this.actionScaleHome = cc.sequence(
            cc.scaleTo(0.1,1.2),
            cc.scaleTo(0.1,0.9)
        );
        this.hometButton.runAction(this.actionScaleHome);
        cc.audioEngine.playEffect(this.audioClick,false);
        cc.director.loadScene('home');
    }
    onButtonRestart(){
        this.actionScaleRestart = cc.sequence(
            cc.scaleTo(0.1,1.2),
            cc.scaleTo(0.1,0.9)
        );
        this.restartButton.runAction(this.actionScaleRestart);
        cc.audioEngine.playEffect(this.audioClick,false);
        cc.director.loadScene(this.node.parent.parent.name);
    }

    // update (dt) {}
}
