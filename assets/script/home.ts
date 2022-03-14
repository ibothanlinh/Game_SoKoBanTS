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
    tutorialButton: cc.Node = null;

    play = null;
    tutorial = null;


    rotation = 3;
    actionRotationPlay = null;
    actionRotationTutorial = null;

    protected start(): void {
        this.actionRotationPlay = cc.repeatForever(
            cc.sequence(
                cc.rotateBy(0.5,this.rotation),
                cc.rotateBy(0.5, -this.rotation)
            )
        );
        this.actionRotationTutorial = cc.repeatForever(
            cc.sequence(
                cc.rotateBy(0.5,this.rotation),
                cc.rotateBy(0.5, -this.rotation)
            )
        );
        this.playButton.runAction(this.actionRotationPlay);
        this.tutorialButton.runAction(this.actionRotationTutorial);
    }

    protected onLoad(): void {
        this.play = this.playButton.getChildByName('Background');
        this.tutorial = this.tutorialButton.getChildByName('Background');

    }

   onButtonPlay(){
        cc.director.loadScene('game');
   }
   onButtonTutorial(){
        cc.director.loadScene('tutorial');
   }

   protected update(dt: number): void {
       
   }

    // update (dt) {}
}
