import { resource, RESOURCE_TYPE, Component, Game, GameObject } from '@eva/eva.js';
import { Img, ImgSystem } from '@eva/plugin-renderer-img'; // 引入渲染图片所需要的组件和系统
import { Text, TextSystem } from '@eva/plugin-renderer-text';
import { Transition, TransitionSystem } from '@eva/plugin-transition';
import { SpriteAnimation, SpriteAnimationSystem } from '@eva/plugin-renderer-sprite-animation';
import { Event, EventSystem, HIT_AREA_TYPE } from '@eva/plugin-renderer-event';
import RenderAni from '../render';
// 资源
export const Source = [{
    name: 'Sofa',
    type: RESOURCE_TYPE.IMAGE,
    src: {
        image: {
            type: 'png',
            url: '././public/resource3d/sofa.png'
        }
    },
}];
class Sofa {
    width =210;
    height = 68;
    instanceSofa = null;
    constructor() {
        this.initResource();
        this.goldGame();
    }
    static get instance() {
        this.instanceSofa = this.instanceSofa || new Sofa();
        return this.instanceSofa;
    }
    initResource() {
        RenderAni.addResource(Source).addSystem([new TextSystem(), new TransitionSystem(), new SpriteAnimationSystem(), new ImgSystem(), new EventSystem()]);
    }
    goldGame() {
        // 创建 game object
        this.Sofa = new GameObject('Sofa', {
            size: { width: this.width, height: this.height },
            origin: { x: 0, y: 0 },
            position: {
                x: 14,
                y: 198
            },
            anchor: {
                x: 0,
                y: 0
            }
        });
        this.Sofa.addComponent(new Img({
            resource: 'Sofa'
        }));
        this.Sofa.addComponent(new Event()).on('tap', () => {

        });

    }
    load() {
        RenderAni.renderGame(this.Sofa);
        // this.coinSpriteAnimation.play();
        return Promise.resolve(true);
    }
    remove() {
        RenderAni.game.removeGameObject(this.Sofa);
    }
    destroy() {
        RenderAni.game.scene.destroy();
    }
}
export default Sofa.instance;
