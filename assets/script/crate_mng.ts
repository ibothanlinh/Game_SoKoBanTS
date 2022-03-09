// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class crate_mng extends cc.Component {

    // crateArr = [];
    // lenghtCrate = 0;

    // protected onLoad(): void {
    //     this.crateArr = this.node.children;
    //     this.lenghtCrate = this.crateArr.length;
    //     // let a = this.node.getChildByName('crate0').getComponent(cc.BoxCollider).tag;
    //     // cc.log('tag', a);
    // }

    // protected start(): void {
    //     cc.log(this.crateArr);
    //     cc.log(this.lenghtCrate);
    // }

    // update (dt) {}
}
