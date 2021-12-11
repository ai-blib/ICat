import { resource, Game, RESOURCE_TYPE, GameObject } from '@eva/eva.js';
import { RendererSystem } from '@eva/plugin-renderer';
import { Img, ImgSystem } from '@eva/plugin-renderer-img';
import { Render, RenderSystem } from '@eva/plugin-renderer-render';

let INSTANCE = null;
let liuHuiScreen = window.screen.height >= 812;
// 资源
export const Source = [{
    name: 'BG',
    type: RESOURCE_TYPE.IMAGE,
    src: {
        image: {
            type: 'jpg',
            url: '././public/resource3d/BG_Large.png'
        }
    }
}];
class RenderAni {
    game=null;
    resumeTime = 0;
    constructor() {
        console.time();
        this.init();
        console.timeStamp();
    }
    static get instance() {
        INSTANCE = INSTANCE || new RenderAni();
        return INSTANCE;
    }
    init() { // 创建 game，添加渲染器
        this.initGame();
    }
    initGame() {
        this.game = new Game({
            systems: [
                new RendererSystem({
                    canvas: document.querySelector('#canvas'),
                    width: 375,
                    height: 358,
                    resolution: window.devicePixelRatio, // Optional, if it is 2 times the image design, it can be divided by 2
                    enableScroll: true, // Enable page scrolling
                    renderType: 0, // 0: automatic judgment, 1: WebGL, 2: Canvas, it is recommended to use Canvas below android6.1 ios9, business judgment is required.
                    transparent: true
                }),
                new ImgSystem(),
                new RenderSystem(),
            ]
        });
        this.addResource([{
            name: 'BG',
            type: RESOURCE_TYPE.IMAGE,
            src: {
                image: {
                    type: 'png',
                    url: '././public/resource3d/BG_Large.png'
                }
            },
            preload: true
        },
        {
            name: 'home-title',
            type: RESOURCE_TYPE.IMAGE,
            src: {
                image: {
                    type: 'png',
                    url: '././public/resource3d/home-title.png'
                }
            },
            preload: true
        }]);

        this.container = new GameObject('container', {
            size: { width: 375, height: 350 },
            origin: { x: 0, y: 0 },
            position: {
                x: 0,
                y: 0
            },
            anchor: {
                x: 0,
                y: 0
            }
        });
        this.container.addComponent(
            new Render({
                sortableChildren: true,
            }),
        );

        this.BG = new GameObject('BG', {
            size: { width: 375, height: 368 },
            origin: { x: 0, y: 0 },
            position: {
                x: 0,
                y: 0
            },
            anchor: {
                x: 0,
                y: 0
            }
        });
        this.BG.addComponent(new Img({
            resource: 'BG'
        }));
        this.title = new GameObject('home-title', {
            size: { width: 90, height: 22 },
            origin: { x: 0, y: 0 },
            position: {
                x: 142,
                y: 45 + (liuHuiScreen ? 0 : -11)
            },
            anchor: {
                x: 0,
                y: 0
            }
        });
        this.title.addComponent(new Img({
            resource: 'home-title'
        }));
        this.container.addComponent(
            new Render({
                sortableChildren: true,
            }),
        );
        this.BG.addComponent(
            new Render({
                zIndex: 1,
            }),
        );
        this.BG.addChild(this.title);
        this.renderGame(this.BG);
        this.game.scene.addChild(this.container);
    }
    // 添加资源
    addResource(source = []) {
        const setResource = async () => {
            for (const i of source) {
                const name =  (await resource.getResource(i.name)).name;
                source = source.filter((_item) => _item.name !== name);
            }
            resource.addResource([
                ...source
            ]);
        };
        setResource();
        return INSTANCE;
    }
    addSystem(system) {
        if (Array.isArray(system)) {
            for (const i of system) {
                this.game.addSystem(i);
            }

        } else {
            this.game.addSystem(system);
        }

        return INSTANCE;
    }
    renderGame(game, zIndex) {
        // this.container.addChild(game);
        const gameRender = game.addComponent(
            new Render({
                zIndex: zIndex || 10,
            }),
        );
        this.container.addChild(game);

        return gameRender;
    }
    addContainer(_i) {
        this.container.addChild(_i);
    }
    removeComponent(game) {
        // game.addComponent(new Render({
        //     zIndex: 10,
        // }));
        this.game.scene.removeChild(game);
        return INSTANCE;
    }
    onResume(fn) {
        if (window.PPDWebUI.os.inApp) {
            window.PPDWebUI.ListenerService.resumeListener(async () => {
                fn(this.resumeTime++);
            });
        } else {
            fn();
        }
    }
}
export default RenderAni.instance;
