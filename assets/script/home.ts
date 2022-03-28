// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
import touch_move from "./touch-move";

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
    @property({
        type: cc.Prefab
    })
    tutorialPrefab: cc.Prefab = null;
    @property({
        type: cc.AudioClip
    })
    audioClick = null;

    play = null;
    tutorial = null;

    // onSceneLaunched = 0;


    rotation = 3;
    actionRotationPlay = null;
    actionRotationTutorial = null;
    actionScalePlay = null;
    actionScaleTutorial = null;
    sceneArr = [];
    // global;


    protected start(): void {
        // cc.log('global: ',window.globalThis.Array);
        // this.sceneArr.push(this.node.parent);
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

        cc.resources.load('levelConfig', cc.JsonAsset, (err, asset: cc.JsonAsset)=>{
            if(err){
                cc.log(err)
                return;
            }

            cc.log('total level ',Object.keys(asset.json.level).length)
            cc.log(' level 1 ',asset.json.level['1'])
            cc.log(asset.json)
            cc.log(asset.json)
            cc.log(asset.json)
        })
    }


   onButtonPlay(){
       this.actionScalePlay = cc.sequence(
           cc.scaleTo(0.1,1.2),
           cc.scaleTo(0.1,0.9)
       );
       this.playButton.runAction(this.actionScalePlay);
       cc.audioEngine.playEffect(this.audioClick,false);
        cc.director.loadScene('game');
   }
   onButtonTutorial(){
    this.actionScaleTutorial = cc.sequence(
        cc.scaleTo(0.1,1.2),
        cc.scaleTo(0.1,0.9)
    );
    this.tutorialButton.runAction(this.actionScaleTutorial);
    cc.audioEngine.playEffect(this.audioClick,false);
        let tuto = cc.instantiate(this.tutorialPrefab);
        this.node.addChild(tuto);
   }

   protected update(dt: number): void {
       
   }

    // update (dt) {}
}
