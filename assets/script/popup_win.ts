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
    audioWin= null;
    @property({
        type: cc.AudioClip
    })
    audioClick = null;
    @property({
        type: cc.Node
    })
    nextButton: cc.Node = null;
    @property({
        type: cc.Node
    })
    restartButton: cc.Node = null;

    actionRotationWin = null;
    actionScalePopup = null;

    actionScaleRestart = null;
    actionScaleNext = null;

    protected start(): void {
        // this.node.setScale(0.1);
        // cc.log(this.node.parent.);
        cc.audioEngine.playEffect(this.audioWin, false);
        this.actionScalePopup = cc.scaleTo(0.4, 1)
        this.node.getChildByName('background2').runAction(this.actionScalePopup);
        this.actionRotationWin = cc.repeatForever(
            cc.sequence(
                cc.rotateBy(0.5,3),
                cc.rotateBy(0.5, -3)
            )
        );
        this.node.getChildByName('background2').getChildByName('winner').runAction(this.actionRotationWin);
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

    onButtonNext(){
        this.actionScaleNext = cc.sequence(
            cc.scaleTo(0.1,1.2),
            cc.scaleTo(0.1,0.9)
        );
        this.nextButton.runAction(this.actionScaleNext);
        cc.audioEngine.playEffect(this.audioClick,false);
        cc.director.loadScene('game');
    }

    // update (dt) {}
}
