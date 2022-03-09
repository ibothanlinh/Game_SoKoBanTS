// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class direction_crate extends cc.Component {

    isTop_crate = false;
    isBottom_crate = false;
    isLeft_crate = false;
    isRight_crate = false;

    onCollisionEnter(){

    }
}
