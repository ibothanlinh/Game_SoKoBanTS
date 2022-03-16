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
        type: cc.Node
    })
    playButton: cc.Node = null;
    @property({
        type: cc.Node
    })
    backButton: cc.Node = null;
    @property({
        type: cc.AudioClip
    })
    audioClick = null;

    actionScalePlay = null;
    actionScaleBack = null;

    onButtonBack(){
        this.actionScaleBack = cc.sequence(
            cc.scaleTo(0.1,1.2),
            cc.scaleTo(0.1,0.9)
        );
        cc.audioEngine.playEffect(this.audioClick,false);
        this.backButton.runAction(this.actionScaleBack);
        this.node.destroy();
    }

    onButtonPlay(){
        this.actionScalePlay = cc.sequence(
            cc.scaleTo(0.1,1.2),
            cc.scaleTo(0.1,0.9)
        );
        cc.audioEngine.playEffect(this.audioClick,false);
        this.playButton.runAction(this.actionScalePlay);
        cc.director.loadScene('gameLV1');
    }

    // update (dt) {}
}
