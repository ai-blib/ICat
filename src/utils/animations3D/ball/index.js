import { resource, RESOURCE_TYPE, Component, Game, GameObject } from '@eva/eva.js';
import { Img, ImgSystem } from '@eva/plugin-renderer-img'; // 引入渲染图片所需要的组件和系统
import { Text, TextSystem } from '@eva/plugin-renderer-text';
import { Transition, TransitionSystem } from '@eva/plugin-transition';
import { SpriteAnimation, SpriteAnimationSystem } from '@eva/plugin-renderer-sprite-animation';
import { Event, EventSystem, HIT_AREA_TYPE } from '@eva/plugin-renderer-event';
import RenderAni from '../render';
// 资源
export const Source = [{
    name: 'Ball',
    type: RESOURCE_TYPE.IMAGE,
    src: {
        image: {
            type: 'png',
            url: '././public/resource3d/ball.png'
        }
    },
    preload: true,
}];
class Ball {
    width =69;
    height = 25;
    instanceBall = null;
    ballEvent = null;
    constructor() {
        this.initResource();
        this.goldGame();
    }
    static get instance() {
        this.instanceBall = this.instanceBall || new Ball();
        return this.instanceBall;
    }
    initResource() {
        RenderAni.addResource(Source).addSystem([new TextSystem(), new TransitionSystem(), new SpriteAnimationSystem(), new ImgSystem(), new EventSystem()]);
    }
    goldGame() {
        // 创建 game object
        this.Ball = new GameObject('Ball', {
            size: { width: this.width, height: this.height },
            origin: { x: 0, y: 0 },
            position: {
                x: 82,
                y: 253
            },
            anchor: {
                x: 0,
                y: 0
            }
        });
        this.Ball.addComponent(new Event()).on('tap', () => {

        });
        this.Ball.addComponent(new Img({
            resource: 'Ball'
        }));

    }
    load() {
        RenderAni.renderGame(this.Ball, 11);
        // this.coinSpriteAnimation.play();
        return Promise.resolve(true);
    }
    remove() {
        RenderAni.game.removeGameObject(this.Ball);
    }
    destroy() {
        RenderAni.game.scene.destroy();
    }
}
export default Ball.instance;
