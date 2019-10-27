import { Explotion } from "../display/effects/Explotion";
import { EffectType } from "../factories/EffectFactory";
import { Pooler } from "../utils/Pooler";
import { Container, DisplayObject } from "pixi.js";


class EffectManager {
    private effectList: Explotion[] = [];
    constructor(private readonly pooler: Pooler, private stage: Container) {

    }

    createEffectAt(x: number, y: number, type: EffectType) {
        let effect: Explotion = this.pooler.getNext(type) as Explotion;
        effect.x = x;
        effect.y = y;
        this.stage.addChild(effect.getChildView() as any);
        effect.reset();
        this.effectList.push(effect);
    }

    removeEffect(explotion: Explotion) {
        this.stage.removeChild(explotion.getChildView() as any);
        this.pooler.release(EffectType.EXPLOTION, explotion);
        let index = this.effectList.indexOf(explotion);
        this.effectList.splice(index, 1);
    }

    update(_deltaTime: number) {

        const effectList = this.effectList;
        for (let i = 0; i < effectList.length; i++) {
            const explotion = effectList[i];
            if (explotion.needsToClean) {
                this.removeEffect(explotion);
                i--;
            }
        }
    }
}

export { EffectManager }