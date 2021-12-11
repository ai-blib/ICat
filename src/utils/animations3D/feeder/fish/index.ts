import { GameObject, resource, RESOURCE_TYPE } from '@eva/eva.js';
import { ImgSystem } from '@eva/plugin-renderer-img'; // 引入渲染图片所需要的组件和系统
import { TextSystem } from '@eva/plugin-renderer-text';
import { TransitionSystem } from '@eva/plugin-transition';
import { SpriteAnimation, SpriteAnimationSystem } from '@eva/plugin-renderer-sprite-animation';
import { EventSystem } from '@eva/plugin-renderer-event';
import RenderAni from '../../render';
import Cat from '../../cat';
// 资源
export const Source = [{
    name: 'fish',
    type: RESOURCE_TYPE.SPRITE_ANIMATION,
    src: {
        image: {
            type: 'png',
            url: '././public/resource3d/fish_coin/full.png'
        },
        json: {
            type: 'json',
            url: '././public/resource3d/fish_coin/full.json'
        }
    },
    preload: true
}, {
    name: 'empty',
    type: RESOURCE_TYPE.SPRITE_ANIMATION,
    src: {
        image: {
            type: 'png',
            url: '././public/resource3d/fish_coin/empty.png'
        },
        json: {
            type: 'json',
            url: '././public/resource3d/fish_coin/empty.json'
        }
    },
    preload: true
}, {
    name: 'fish3',
    type: RESOURCE_TYPE.SPRITE_ANIMATION,
    src: {
        image: {
            type: 'png',
            url: '././public/resource3d/fish/003.png'
        },
        json: {
            type: 'json',
            url: '././public/resource3d/fish/003.json'
        }
    },
    preload: true
}, {
    name: 'fall',
    type: RESOURCE_TYPE.SPRITE_ANIMATION,
    src: {
        image: {
            type: 'png',
            url: '././public/resource3d/fish/fall.png'
        },
        json: {
            type: 'json',
            url: '././public/resource3d/fish/fall.json'
        }
    },
    position: {},
    preload: true
}];

let timer: any = null;

class SmallFish {
    private frames: number = 0;
    private fishSpriteAnimation: SpriteAnimation | any;
    private fallSpriteAnimation: SpriteAnimation | any;
    private fish: any;
    private totalFrames: number | any;
    public eatFishStartOver:boolean=false;
    constructor() {
        this.initResource();
    }

    private initResource() {
        RenderAni.addResource(Source).addSystem([new TextSystem(), new TransitionSystem(), new SpriteAnimationSystem(), new ImgSystem(), new EventSystem()]);
    }

    // 初始化鱼动画容器
    public initFishGame() {
        this.goldGame();
    }

    private goldGame() {
        for (const i of ['fish', 'fall']) {
            let position = {
                x: 0,
                y: 43
            };
            let size = {
                width: 69,
                height: 80
            };
            if (i === 'fall') {
                position = {
                    x: 10,
                    y: 40
                };
                size = {
                    width: 50,
                    height: 70
                };
            }
            this[i] = new GameObject(i, {
                size,
                origin: { x: 0, y: 0 },
                position,
                anchor: {
                    x: 0,
                    y: 0
                },
                scale: {
                    x: 0.8,
                    y: 0.8
                }
            });
            this[i + 'SpriteAnimation'] = this[i].addComponent(
                new SpriteAnimation({
                    resource: i,
                    autoPlay: false,
                    speed: 40
                })
            );
        }
        this.addListenterAnimation();
    }

    // 添加动画监听
    private async addListenterAnimation() {
        this.frames = 0;
        this.fishSpriteAnimation.on('frameChange', async (a) => {
            if (this.frames >= 13) {
                this.frames = 0;
                this.fishSpriteAnimation.stop();
                if (this.fishSpriteAnimation.resource === 'fish') {
                    this.startEatFish();
                }else if (this.fishSpriteAnimation.resource === 'empty'){
                    this.eatFishStartOver = false;
                }
            }
            this.frames++;
        });
        // 小鱼堆满
        this.fishSpriteAnimation.on('complete', async () => {
            this.startEatFish();
        });
        // 掉落效果结束
        this.fallSpriteAnimation.on('complete', () => {
        });
    }

    //开始吃鱼   吃鱼有两种情况1、待机动画时唤醒去吃鱼 2、坐下来继续吃鱼
    startEatFish() {
        this.eatFishStartOver =true;
        Cat.fishFallOverStartEat(() => {
           this.fishHide();
        });

    }

    // 猫咪主动吃鱼的时候调用：即cat内调用

    public fishStartEmpty(){
        this.emptyFish();
    }
    // 猫咪主动吃鱼的时候调用：即cat内调用
    public fishHide(){
        this.fish.transform.scale = {
            x: 0,
            y: 0
        };
    }

    // @ts-ignore
    get getFish() {
        return this;
    }

    // 切换动画
    private async changeAnimation(name: string, time = 1) {
        this.frames = 0;
        this.fishSpriteAnimation.resource = name;
        this.fishSpriteAnimation.play(time);
        if (name === 'empty') {
            this.fishSpriteAnimation.speed = 300;
        } else {
            this.fishSpriteAnimation.speed = 40;
        }
        this.totalFrames = (await resource.getResource(name)).instance.length - 2;

    }

    // 掉鱼
    public fallFish() {
        this.fallSpriteAnimation.stop();
        this.fishSpriteAnimation.stop();
        this.fish.transform.scale = {
            x: 0.8,
            y: 0.8
        };

        this.changeAnimation('fish');
        this.fallSpriteAnimation.play(1);
    }

    public emptyFish() {
        this.changeAnimation('empty', 1);
    }

    public load(name) {
        RenderAni.renderGame(this[name]);
        return Promise.resolve(true);
    }
}

export const Fish = new SmallFish();
